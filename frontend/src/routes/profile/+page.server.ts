import type { HttpError } from '@sveltejs/kit'
import type { Actions } from './$types'
import { useApi } from '$lib/api'

export const actions = {
  profile: async ({ request, fetch, cookies }) => {
    try {
      const token = cookies.get('payload-token')
      const api = useApi(fetch, token)
      const data = Object.fromEntries(await request.formData())

      await api.update('user', data.id as string, data)
      return { profile: { success: true } }
    } catch (error) {
      return { profile: { error: (error as HttpError).body.message } }
    }
  },
} satisfies Actions
