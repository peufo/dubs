import { Action } from './collections'

/** Type Port interface real recursive */
export interface PortGroup extends Omit<Action['input'], 'groups'> {
  groups?: PortGroup[]
}

/** ActionRecusivePort overide Action with more generic type */
export interface ActionRecursivePort extends Omit<Action, 'input' | 'output'> {
  input: PortGroup
  output: PortGroup
}
