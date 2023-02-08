// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
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
