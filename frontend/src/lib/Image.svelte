<script lang="ts">
  import type { Media } from 'types'
  import logo from '$lib/assets/logo-borderless.png?w=400&h=400&webp'

  let klass = ''
  export { klass as class }
  export let image: string | Media | undefined
  export let size: keyof Required<Media>['sizes']
  /** default url */
  export let placeholder: string | undefined = logo
  export let element: HTMLImageElement | undefined = undefined

  $: selectedSize = (typeof image === 'object' && image.sizes?.[size]) || {
    url: placeholder,
    width: 300,
    height: 300,
  }
</script>

{#if typeof image === 'object'}
  <img
    bind:this={element}
    on:click
    on:dblclick
    on:keyup
    title={image.title}
    alt={image.title}
    src={selectedSize.url}
    class={klass}
    width={selectedSize.width}
    height={selectedSize.height}
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
