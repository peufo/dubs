<script lang="ts">
  import { onMount } from 'svelte'
  import { getPath, Position } from '$lib/connection/utils'

  export let connections: { from: HTMLElement; to: HTMLElement }[]
  export let fromPosition: Position = 'center'
  export let toPosition: Position = 'center'

  export let curveIntensity = 0.75
  export let strokeWidth = 2
  let klass = ''
  export { klass as class }

  let paths: string[] = []
  onMount(() => draw())
  export function draw() {
    paths = connections.map(({ from, to }) =>
      getPath(from, to, { fromPosition, toPosition, curveIntensity })
    )
  }
</script>

<svg width={1} height={1}>
  {#each paths as d}
    <path
      {d}
      fill="none"
      stroke="black"
      stroke-width={strokeWidth}
      class={klass}
      stroke-linecap="round"
    />
  {/each}
</svg>

<style>
  svg {
    top: 0;
    left: 0;
    position: absolute;
    overflow: visible;
  }
</style>
