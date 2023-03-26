import type { PageLoad } from './$types'
import { useApi } from '$lib/api'

export const load = (async ({ params, fetch }) => {
  const api = useApi(fetch)
  const action = await api.getById('action', params.actionId, { depth: 6 })
  return { action }
}) satisfies PageLoad
