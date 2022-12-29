<svelte:options namespace="svg" />

<script lang="ts">
  import { tweened } from 'svelte/motion'
  import { backOut } from 'svelte/easing'
  import Line from '$lib/atom/svg/Line.svelte'

  export let open = false

  export let viewWidth = 1000
  export let viewHeight = 1000

  const width = 100
  const oy = viewHeight / 2
  const dy = viewHeight / 6
  const ox = viewWidth / 2
  const dx1 = viewWidth / 6
  const dx2 = viewWidth / 4

  let t = tweened(0, { easing: backOut, duration: 300 })

  $: t.set(open ? 1 : 0)
</script>

<Line
  from={{ x: ox - (1 - $t) * dx2, y: oy }}
  to={{ x: ox + (1 - $t) * dx2, y: oy }}
  {width}
/>
<Line
  from={{ x: ox - dx1, y: oy - dy }}
  to={{ x: ox + dx1, y: oy - dy + $t * 2 * dy }}
  {width}
/>
<Line
  from={{ x: ox - dx1, y: oy + dy }}
  to={{ x: ox + dx1, y: oy + dy - $t * 2 * dy }}
  {width}
/>
