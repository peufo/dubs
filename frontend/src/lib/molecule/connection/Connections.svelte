<script lang="ts">
  import { onMount } from 'svelte'
  import { getPath } from '$lib/molecule/connection/utils'
  import type { Position } from '$lib/molecule/connection/utils'

  export let from: HTMLElement[]
  export let to: HTMLElement[]
  export let fromPosition: Position = 'center'
  export let toPosition: Position = 'center'

  export let drawOnResize = false
  export let curveIntensity = 0.75
  export let strokeWidth = 2
  let klass = ''
  export { klass as class }

  let paths: string[] = []
  onMount(() => {
    if (!window) return
    if (!drawOnResize) return
    window.addEventListener('resize', draw)
    return () => {
      window.removeEventListener('resize', draw)
    }
  })

  $: if (from || to) draw()

  export function draw() {
    paths = from.map((elFrom, index) => {
      if (!to[index]) return ''
      return getPath(elFrom, to[index], {
        fromPosition,
        toPosition,
        curveIntensity,
      })
    })
  }
</script>

{#if paths.length}
  <svg width={1} height={1} class="stroke-primary-dark">
    {#each paths as d}
      <path
        {d}
        fill="none"
        stroke-width={strokeWidth}
        class={klass}
        stroke-linecap="round"
      />
    {/each}
  </svg>
{/if}

<style>
  svg {
    top: 0;
    left: 0;
    position: absolute;
    overflow: visible;
  }
</style>
