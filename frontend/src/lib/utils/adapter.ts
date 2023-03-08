/**
 * Adapater payload <-> auth.js
 * based on https://authjs.dev/guides/adapters/creating-a-database-adapter
 */

import type { Adapter, AdapterSession, AdapterUser } from '@auth/core/adapters'
import type { Session, User } from 'types'
import { api } from '$lib/api'

export const payloadAdapter: Adapter = {
  async createUser(user) {
    console.log('createUser')
    const res = await api.create('user', formatTo(user))
    return userFrom(res)
  },
  async getUser(userId) {
    console.log('getUser')
    const res = await api.getById('user', userId)
    return userFrom(res)
  },
  async getUserByEmail(email) {
    console.log('getUserByEmail')
    const res = await api.get('user', { where: { email: { equals: email } } })
    return userFrom(res.docs[0])
  },
  async getUserByAccount({ provider, providerAccountId }) {
    console.log('getUserByAccount')
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
    console.log('updateUser')
    const res = await api.update('user', user.id || '', formatTo(user))
    return userFrom(res)
  },
  async deleteUser(userId) {
    console.log('deleteUser')
    await api.delete('user', userId)
  },
  async linkAccount(account) {
    console.log('linkAccount')
    await api.create('account', account)
  },
  async unlinkAccount({ provider, providerAccountId }) {
    console.log('unlinkAccount')
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
    console.log('createSession')
    const res = await api.create('session', sessionTo(session))
    return sessionFrom(res)
  },
  async getSessionAndUser(sessionToken) {
    console.log('getSessionAndUser', { sessionToken })
    const {
      docs: [session],
    } = await api.get('session', {
      where: { sessionToken: { equals: sessionToken } },
    })
    if (!session) throw Error('Session not found')
    const user = await api.getById('user', session.userId)
    if (!user) throw Error('User not found')
    return {
      session: sessionFrom(session),
      user: userFrom(user),
    }
  },
  async updateSession(session) {
    console.log('updateSession')
    const resSessions = await api.get('session', {
      where: { sessionToken: { equals: session.sessionToken } },
    })
    const { id } = resSessions.docs[0]
    const res = await api.update('session', id, sessionTo(session))
    return sessionFrom(res)
  },
  async deleteSession(sessionToken) {
    console.log('deleteSession')
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
