import type { HttpError } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { useApi } from '$lib/api'

export const load = (async ({ fetch, cookies, parent }) => {
  const api = useApi(fetch, cookies)
  const { session } = await parent()
  if (!session.user) return { orders: [] }
  // Un admin peut lire toutes les commandes : le profil n'affiche que les siennes
  const { docs: orders } = await api.get('order', {
    // @ts-expect-error Where<Order> est trop profond pour TypeScript (relations produit/user)
    where: { client: { equals: session.user.id } },
    sort: '-createdAt',
    limit: 100,
  })
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
