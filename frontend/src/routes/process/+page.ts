import type { PageLoad } from './$types'
import { useApi } from '$lib/api'

export const load = (async ({ params, fetch }) => {
  const api = useApi(fetch)
  const { action } = await api.getGlobal('process', { depth: 10 })
  if (typeof action !== 'object') return {}
  return { action }
}) satisfies PageLoad
