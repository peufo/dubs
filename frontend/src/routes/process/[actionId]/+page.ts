import type { PageLoad } from './$types'
import { api } from '$lib/api'

export const load = (async ({ params }) => {
  const action = await api.getById('action', params.actionId)
  return { action }
}) satisfies PageLoad
