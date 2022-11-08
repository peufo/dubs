import qs from 'qs'

import type { Slugs, PaginatedDocs, QueryGet } from '../api'

const baseUrl = 'http://localhost:5002/api'

export const api = {
  async get<key extends keyof Slugs>(
    slug: key,
    query?: QueryGet<Slugs[key]>
  ): Promise<PaginatedDocs<Slugs[key]>> {
    const params = qs.stringify(query)
    const res = await fetch(`${baseUrl}/${slug}?${params}`)
    const data = (await res.json()) as PaginatedDocs<Slugs[key]>
    return data
  },
}
