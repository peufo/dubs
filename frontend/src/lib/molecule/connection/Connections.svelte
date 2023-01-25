<script lang="ts">
  import { onMount } from 'svelte'
  import { getPath } from '$lib/molecule/connection/utils'
  import type { Position } from '$lib/molecule/connection/utils'

  export let from: HTMLElement[]
  export let to: HTMLElement[]
  export let fromPosition: Position = 'center'
  export let toPosition: Position = 'center'
  export let fromStraight: number[] = []
  export let toStraight: number[] = []

  export let drawOnResize = false
  export let curveIntensity = 0.75
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
    paths = from.map((fromEl) => {
      const id = fromEl.dataset.relationId
      const index = to.findIndex((el) => el.dataset.relationId === id)
      if (index === -1) return ''
      return getPath(fromEl, to[index], {
        fromPosition,
        toPosition,
        curveIntensity,
        fromStraight: fromStraight[index],
        toStraight: toStraight[index],
      })
    })
  }
</script>

{#if paths.length}
  <svg width={10} height={10} class="stroke-primary-dark">
    {#each paths as d, index}
      <path
        {d}
        fill="none"
        class="stroke-2 hover:stroke-[4px] {klass}"
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
