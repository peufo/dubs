<svelte:options namespace="svg" />

<script lang="ts">
  import type { Dot } from './types'

  let klass = ''
  export { klass as class }
  export let label: string
  export let dots: Dot[]

  const getCenter = (a: number, b: number) => a + (b - a) / 2

  $: x = getCenter(dots[2].x, dots[1].x)
  $: y = getCenter(dots[1].y, dots[5].y)
</script>

<text
  {x}
  {y}
  style="font-size: 400px;"
  class="fill-primary-dark uppercase {klass}"
  dominant-baseline="central"
  text-anchor="middle"
>
  {label}
</text>
