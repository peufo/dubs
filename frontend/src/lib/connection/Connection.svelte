<script lang="ts">
  import { getPath } from '$lib/connection/utils'
  import type { Position } from '$lib/connection/utils'

  export let from: HTMLElement
  export let to: HTMLElement
  export let fromPosition: Position = 'center'
  export let toPosition: Position = 'center'

  export let curveIntensity = 0.75
  export let strokeWidth = 2
  let klass = ''
  export { klass as class }

  let d = ''

  $: if (from || to) draw()

  export function draw() {
    d = getPath(from, to, { fromPosition, toPosition, curveIntensity })
  }
</script>

<svg width={1} height={1}>
  <path
    {d}
    fill="none"
    stroke="black"
    stroke-width={strokeWidth}
    class={klass}
    stroke-linecap="round"
  />
</svg>

<style>
  svg {
    top: 0;
    left: 0;
    position: absolute;
    overflow: visible;
  }
</style>
