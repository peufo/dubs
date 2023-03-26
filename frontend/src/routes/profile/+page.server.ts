import type { HttpError } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { useApi } from '$lib/api'

export const load = (async ({ fetch, cookies }) => {
  const api = useApi(fetch, cookies)
  const { docs: orders } = await api.get('order')
  console.log({ orders })
  return { orders }
}) satisfies PageServerLoad

export const actions = {
  profile: async ({ request, fetch, cookies }) => {
    try {
      const api = useApi(fetch, cookies)
      const data = Object.fromEntries(await request.formData())

      await api.update('user', data.id as string, data)
      return { profile: { success: true } }
    } catch (error) {
      return { profile: { error: (error as HttpError).body.message } }
    }
  },
} satisfies Actions
