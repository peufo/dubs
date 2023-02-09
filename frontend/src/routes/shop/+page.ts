import type { PageLoad } from './$types'
import { useApi } from '$lib/api'

export const load = (async ({ fetch }) => {
  const api = useApi(fetch)
  const products = await api.get('product', {
    sort: '-updatedAt',
    where: {
      state: { not_in: ['draft', 'archived', 'notAvailable'] },
    },
  })
  return { products }
}) satisfies PageLoad
