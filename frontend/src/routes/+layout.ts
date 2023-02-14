import { useApi } from '$lib/api'
import type { LayoutLoad } from './$types'

export const load = (async ({ fetch, parent, data }) => {
  const api = useApi(fetch)
  const { links } = await api.getGlobal('footer')
  return { links, ...data }
}) satisfies LayoutLoad
