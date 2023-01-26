import { error } from '@sveltejs/kit'
import { dev } from '$app/environment'
import qs from 'qs'

import type {
  Slugs,
  SlugsGlobal,
  PaginatedDocs,
  QueryGet,
  QueryBase,
  ErrorsResponse,
} from 'types'

const baseUrl = dev ? 'http://localhost:5002/api' : '/api'

export const useApi = (_fetch: typeof fetch) => ({
  async get<Key extends keyof Slugs>(
    slug: Key,
    query?: QueryGet<Slugs[Key]>
  ): Promise<PaginatedDocs<Slugs[Key]>> {
    const params = qs.stringify(query)
    const res = await _fetch(`${baseUrl}/${slug}?${params}`)
    const data = (await res.json()) as PaginatedDocs<Slugs[Key]> &
      ErrorsResponse
    if (data.errors) throw error(res.status, data.errors[0].message)
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

  async getGlobal<Key extends keyof SlugsGlobal>(
    slug: Key
  ): Promise<SlugsGlobal[Key]> {
    const res = await _fetch(`${baseUrl}/globals/${slug}`)
    const data = (await res.json()) as SlugsGlobal[Key] & ErrorsResponse
    if (data.errors) throw error(res.status, data.errors[0].message)
    return data
  },
})

export const api = useApi(fetch)
