import { useApi } from '$lib/api'
import type { LayoutLoad } from './$types'

export const load = (async ({ fetch }) => {
  const api = useApi(fetch)
  const { links } = await api.getGlobal('footer')
  return { links }
}) satisfies LayoutLoad
