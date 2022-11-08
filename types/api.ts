import { User, Action, Resource, Product, Item } from './collections'

export interface Slugs {
  user: User
  action: Action
  resource: Resource
  product: Product
  item: Item
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
export type WhereField = {
  [key in Operator]?: unknown
}

export type Where<T = any> = {
  [key in keyof T]?: WhereField | Where<T>[]
} & {
  or?: Where<T>[]
  and?: Where<T>[]
}

export type PaginatedDocs<T = any> = {
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

export type Sort<T = any> = keyof T | `-${string & keyof T}`

export interface QueryBase {
  depth: number
}

export interface QueryGet<T = any> extends QueryBase {
  limit?: number
  page?: number
  where?: Where<T>
  sort?: Sort<T>
}
