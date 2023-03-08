/**
 * Adapater payload <-> auth.js
 * based on https://authjs.dev/guides/adapters/creating-a-database-adapter
 */

import type { Adapter, AdapterSession, AdapterUser } from '@auth/core/adapters'
import type { Session, User } from 'types'
import { api } from '$lib/api'

export const payloadAdapter: Adapter = {
  async createUser(user) {
    const res = await api.create('user', formatTo(user))
    return userFrom(res)
  },
  async getUser(userId) {
    const res = await api.getById('user', userId)
    return userFrom(res)
  },
  async getUserByEmail(email) {
    const res = await api.get('user', { where: { email: { equals: email } } })
    return userFrom(res.docs[0])
  },
  async getUserByAccount({ provider, providerAccountId }) {
    const {
      docs: [account],
    } = await api.get('account', {
      where: {
        and: [
          { provider: { equals: provider } },
          { providerAccountId: { equals: providerAccountId } },
        ],
      },
    })
    if (!account || !account.userId) return null
    const res = await api.getById('user', account.userId)
    return userFrom(res)
  },
  async updateUser(user) {
    const res = await api.update('user', user.id || '', formatTo(user))
    return userFrom(res)
  },
  async deleteUser(userId) {
    await api.delete('user', userId)
  },
  async linkAccount(account) {
    await api.create('account', account)
  },
  async unlinkAccount({ provider, providerAccountId }) {
    const {
      docs: [account],
    } = await api.get('account', {
      where: {
        and: [
          { provider: { equals: provider } },
          { providerAccountId: { equals: providerAccountId } },
        ],
      },
    })
    if (!account) return
    await api.delete('account', account.id)
  },
  async createSession(session) {
    const res = await api.create('session', sessionTo(session))
    return sessionFrom(res)
  },
  async getSessionAndUser(sessionToken) {
    const {
      docs: [session],
    } = await api.get('session', {
      where: { sessionToken: { equals: sessionToken } },
    })
    if (!session) return null
    const user = await api.getById('user', session.userId)
    if (!user) return null
    return {
      session: sessionFrom(session),
      user: userFrom(user),
    }
  },
  async updateSession(session) {
    const resSessions = await api.get('session', {
      where: { sessionToken: { equals: session.sessionToken } },
    })
    const { id } = resSessions.docs[0]
    const res = await api.update('session', id, sessionTo(session))
    return sessionFrom(res)
  },
  async deleteSession(sessionToken) {
    const resSessions = await api.get('session', {
      where: { sessionToken: { equals: sessionToken } },
    })
    const { id } = resSessions.docs[0]
    await api.delete('session', id)
  },
}

/** Types convertion */
function formatTo(user: Partial<AdapterUser>): Partial<User> {
  return {
    ...user,
    name: user.name || undefined,
    emailVerified: user.emailVerified?.toISOString() || undefined,
  }
}
function userFrom(user: User): AdapterUser {
  return {
    ...user,
    emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
  }
}
function sessionTo(session: Partial<AdapterSession>): Partial<Session> {
  return {
    ...session,
    expires: session.expires?.toISOString() || undefined,
  }
}
function sessionFrom(session: Session): AdapterSession {
  return {
    ...session,
    expires: new Date(session.expires),
  }
}
