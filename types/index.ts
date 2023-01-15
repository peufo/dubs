import type { Action, State } from './collections'

export * from './collections'
export * from './payload'
export * from './api'

export type Port = 'inputs' | 'outputs'
export type Relation = Action[Port][number]
