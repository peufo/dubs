// See https://kit.svelte.dev/docs/types#app

import type { AuthResponse } from 'types'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      getSession: () => Promise<AuthResponse>
    }
    // interface PageData {}
    // interface Platform {}
  }
}

declare module '*&webp'

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    //onscrollStateChange?: CustomEvent<{ isStart: boolean; isEnd: boolean }>
    'on:scrollStateChange'?: (
      event: CustomEvent<{ isStart: boolean; isEnd: boolean }>
    ) => unknown
  }
}
