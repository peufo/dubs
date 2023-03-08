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
  RefreshResponse,
} from 'types'

type Collections = Config['collections']
type Globals = Config['globals']

type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null
}

const baseUrl = dev ? 'http://localhost:5002/api' : '/api'

export function useApi(_fetch: typeof fetch) {
  async function getData<Type = unknown>(res: Response): Promise<Type> {
    const data = (await res.json()) as Type & ErrorsResponse
    if (data.errors) throw error(res.status, data.errors[0].message)
    return data
  }

  const send =
    (method: 'POST' | 'PATCH' | 'DELETE') =>
    (path: string, data: object = {}) =>
      _fetch(`${baseUrl}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

  const _get = (path: string) => _fetch(`${baseUrl}/${path}`)
  const _post = send('POST')
  const _patch = send('PATCH')
  const _delete = send('DELETE')

  return {
    async get<Key extends keyof Collections>(
      slug: Key,
      query?: QueryGet<Collections[Key]>
    ): Promise<PaginatedDocs<Collections[Key]>> {
      const params = qs.stringify(query)
      const res = await _get(`${slug}?${params}`)
      return getData<PaginatedDocs<Collections[Key]>>(res)
    },
    async getById<Key extends keyof Collections>(
      slug: Key,
      id: string,
      query?: QueryBase
    ): Promise<Collections[Key]> {
      const params = qs.stringify(query)
      const res = await _get(`${slug}/${id}?${params}`)
      return getData<Collections[Key]>(res)
    },
    async getGlobal<Key extends keyof Globals>(
      slug: Key
    ): Promise<Globals[Key]> {
      const res = await _get(`globals/${slug}`)
      return getData<Globals[Key]>(res)
    },
    async create<Key extends keyof Collections>(
      slug: Key,
      data: PartialNullable<Omit<Collections[Key], 'id'>>
    ) {
      const res = await _post(`${slug}`, data)
      return getData<Collections[Key]>(res)
    },
    async update<Key extends keyof Collections>(
      slug: Key,
      id: string,
      data: PartialNullable<Collections[Key]>
    ) {
      const res = await _patch(`${slug}/${id}`, data)
      return getData<Collections[Key]>(res)
    },
    async delete<Key extends keyof Collections>(slug: Key, id: string) {
      const res = await _delete(`${slug}/${id}`)
      return getData(res)
    },

    /** Authentication methodes */
    async login(credentials: { email: string; password: string }) {
      const res = await _post('/user/login', credentials)
      return getData<LoginResponse>(res)
    },
    async logout() {
      const res = await _post('/user/logout')
      return getData(res)
    },
    async refresh() {
      const res = await _post('/user/refresh-token')
      return getData<RefreshResponse>(res)
    },
  }
}

export const api = useApi(fetch)
