import { writable } from 'svelte/store'

type ActionPortMap = Map<
  HTMLElement,
  { inputs: HTMLElement[]; outputs: HTMLElement[] }
>

type ConnectionMap = Map<
  string,
  { scrollContainer: HTMLElement; from?: HTMLElement; to?: HTMLElement }
>

export const actionsPorts = writable<ActionPortMap>(new Map())

export const connections = writable<ConnectionMap>(new Map())

connections.subscribe(console.log)
