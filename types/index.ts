import type { Action, State } from './collections'

export * from './collections'
export * from './payload'
export * from './api'

export interface ActionWithConnections extends Action {
  inputs: State[]
  outputs: State[]
}
