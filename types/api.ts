import type { User, Action, Landing } from './collections'

export type Slugs = {
  user: User
  action: Action
}

export type SlugsGlobal = {
  landing: Landing
}

export type ErrorsResponse = {
  errors: { message: string }[]
}

export type Operator =
  | 'equals'
  | 'contains'
  | 'not_equals'
  | 'in'
  | 'not_in'
  | 'exists'
  | 'greater_than'
  | 'greater_than_equal'
  | 'less_than'
  | 'less_than_equal'
  | 'like'
  | 'near'

type GenericObject = Record<PropertyKey, unknown>
type NestedPaths<T extends GenericObject> = {
  [K in keyof T]: T[K] extends GenericObject
    ? K | `${K & string}.${NestedPaths<T[K]> & string}`
    : K
}[keyof T]
interface Interface {}
type ToType<T extends Interface> = {
  [key in keyof T]: T[key]
}

export type WhereField = {
  [key in Operator]?: unknown
}

export type Where<T extends any> = {
  [key in NestedPaths<ToType<T>>]?: WhereField | Where<T>[]
} & {
  or?: Where<T>[]
  and?: Where<T>[]
}

export type PaginatedDocs<T = GenericObject> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export type Sort<T extends any> = keyof T | `-${string & keyof T}`

export type QueryBase = {
  depth?: number
}

export type QueryGet<T extends any> = QueryBase & {
  limit?: number
  page?: number
  where?: Where<T>
  sort?: Sort<T>
}
