<svelte:options namespace="svg" />

<script lang="ts">
  import type { Dot } from './types'

  let klass = ''
  export { klass as class }
  export let from: Dot
  export let to: Dot
  export let width = 50
</script>

<line
  x1={from.x}
  y1={from.y}
  x2={to.x}
  y2={to.y}
  stroke-width={width}
  class={klass}
  stroke-linecap="round"
/>
