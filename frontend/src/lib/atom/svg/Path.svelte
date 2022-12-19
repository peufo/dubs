<script lang="ts">
  import type { Dot } from './types'

  let klass = ''
  export { klass as class }
  export let lineWidth = 80
  export let dots: Dot[]

  $: d = [
    `M${dots[0].x} ${dots[0].y}`,
    ...dots.map((dot) => `L${dot.x} ${dot.y}`),
    'z',
  ].join(' ')
</script>

<path {d} class={klass} stroke-width={lineWidth} stroke-linejoin="round" />
