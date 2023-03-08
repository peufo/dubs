/**
 * Adapater payload <-> auth.js
 * based on https://authjs.dev/guides/adapters/creating-a-database-adapter
 */

import type { Adapter } from '@auth/core/adapters'
import { api } from '$lib/api'

export const payloadAdapter: Adapter = {
  async createUser(user) {
    return api.create('user', { ...user, emailVerified: null })
  },
  async getUser(id) {
    return api.getById('user', id)
  },
  async getUserByEmail(email) {
    const res = await api.get('user', { where: { email: { equals: email } } })
    return res.docs[0]
  },
  async getUserByAccount({ provider, providerAccountId }) {
    const resAccounts = await api.get('')
  },
}
