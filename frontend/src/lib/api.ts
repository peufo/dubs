import { error } from '@sveltejs/kit'
import qs from 'qs'

import type {
  Slugs,
  PaginatedDocs,
  QueryGet,
  QueryBase,
  ErrorsResponse,
} from 'types'

const baseUrl = 'http://localhost:5002/api'

export const useApi = (_fetch: typeof fetch) => ({
  async get<Key extends keyof Slugs>(
    slug: Key,
    query?: QueryGet<Slugs[Key]>
  ): Promise<PaginatedDocs<Slugs[Key]>> {
    const params = qs.stringify(query)
    const res = await _fetch(`${baseUrl}/${slug}?${params}`)
    const data = (await res.json()) as PaginatedDocs<Slugs[Key]>
    return data
  },

  async getById<Key extends keyof Slugs>(
    slug: Key,
    id: string,
    query?: QueryBase
  ): Promise<Slugs[Key]> {
    const params = qs.stringify(query)
    const res = await _fetch(`${baseUrl}/${slug}/${id}?${params}`)
    const data = (await res.json()) as Slugs[Key] & ErrorsResponse
    if (data.errors) throw error(res.status, data.errors[0].message)
    return data
  },
})

export const api = useApi(fetch)
