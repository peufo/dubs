<script lang="ts">
  import type { Dot } from './types'

  let klass = ''
  export { klass as class }
  export let dots: Dot[]

  $: d = [
    `M${dots[0].x} ${dots[0].y}`,
    ...dots.map((dot) => `L${dot.x} ${dot.y}`),
    'z',
  ].join(' ')
</script>

<path {d} class="stroke-[60px] {klass}" stroke-linejoin="round" />
