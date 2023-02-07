<script lang="ts">
  import type { Media } from 'types'
  // import { getPathname } from '$lib/utils/getPathname'

  let klass = ''
  export { klass as class }
  export let image: string | Media | undefined
  export let size: keyof Media['sizes']
  /** default url */
  export let placeholder: string | undefined = undefined
  export let element: HTMLImageElement | undefined = undefined
</script>

{#if typeof image === 'object'}
  <img
    bind:this={element}
    on:click
    on:dblclick
    on:keyup
    title={image.title}
    alt={image.title}
    src={image.sizes[size].url}
    class={klass}
    width={image.sizes[size].width}
    height={image.sizes[size].height}
  />
{:else if placeholder}
  <img
    bind:this={element}
    on:click
    on:dblclick
    on:keyup
    src={placeholder}
    alt="Pas d'illustration"
    class={klass}
    height="300"
    width="400"
  />
{/if}
