import { error } from '@sveltejs/kit'
import { dev } from '$app/environment'
import qs from 'qs'

import type {
  Config,
  PaginatedDocs,
  QueryGet,
  QueryBase,
  ErrorsResponse,
  LoginResponse,
} from 'types'

type Collections = Config['collections']
type Globals = Config['globals']

const baseUrl = dev ? 'http://localhost:5002/api' : '/api'

export function useApi(_fetch: typeof fetch) {
  async function getData<Type = unknown>(res: Response): Promise<Type> {
    const data = (await res.json()) as Type & ErrorsResponse
    if (data.errors) throw error(res.status, data.errors[0].message)
    return data
  }

  const post = (path: string, data: object) =>
    _fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

  return {
    async get<Key extends keyof Collections>(
      slug: Key,
      query?: QueryGet<Collections[Key]>
    ): Promise<PaginatedDocs<Collections[Key]>> {
      const params = qs.stringify(query)
      const res = await _fetch(`${baseUrl}/${slug}?${params}`)
      return getData<PaginatedDocs<Collections[Key]>>(res)
    },

    async getById<Key extends keyof Collections>(
      slug: Key,
      id: string,
      query?: QueryBase
    ): Promise<Collections[Key]> {
      const params = qs.stringify(query)
      const res = await _fetch(`${baseUrl}/${slug}/${id}?${params}`)
      return getData<Collections[Key]>(res)
    },

    async getGlobal<Key extends keyof Globals>(
      slug: Key
    ): Promise<Globals[Key]> {
      const res = await _fetch(`${baseUrl}/globals/${slug}`)
      return getData<Globals[Key]>(res)
    },

    async login(credentials: { email: string; password: string }) {
      const res = await post('/users/login', credentials)
      return getData<LoginResponse>(res)
    },
  }
}

export const api = useApi(fetch)
