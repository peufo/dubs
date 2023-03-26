import type { Action } from './collections'

export * from './collections'
export * from './payload'
export * from './api'

export type Port = 'inputs' | 'outputs'
export type Relation = Required<Action>[Port][number]
