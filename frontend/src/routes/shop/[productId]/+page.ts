import type { PageLoad } from './$types'
import { useApi } from '$lib/api'

export const load = (async ({ params, fetch }) => {
  const api = useApi(fetch)
  const product = await api.getById('product', params.productId, { depth: 6 })
  return { product }
}) satisfies PageLoad
