<script lang="ts">
  import type { Media } from 'types'
  // import { getPathname } from '$lib/utils/getPathname'

  export let image: string | Media | undefined
  export let size: keyof Media['sizes']
  /** default url */
  export let placeholder: string

  let klass = ''
  export { klass as class }
</script>

{#if typeof image === 'object'}
  <img
    title={image.title}
    alt={image.title}
    src={image.sizes[size].url}
    class={klass}
    width={image.sizes[size].width}
    height={image.sizes[size].height}
  />
{:else}
  <img
    src={placeholder}
    alt="Pas d'illustration"
    class={klass}
    height="300"
    width="400"
  />
{/if}
