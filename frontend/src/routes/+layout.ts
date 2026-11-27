import { useApi } from '$lib/api'
import type { LayoutLoad } from './$types'

export const load = (async ({ fetch, parent, data }) => {
  const api = useApi(fetch)
  const [{ links }, shop] = await Promise.all([
    api.getGlobal('footer'),
    api.getGlobal('shop'),
  ])
  return { links, shop, ...data }
}) satisfies LayoutLoad
