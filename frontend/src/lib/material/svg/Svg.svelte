<script lang="ts">
  let klass = ''
  export { klass as class }

  const ref = 1000
  export let size = 50

  export let expandWith = 4
  export let expandHeight = 2

  $: width = size * expandWith
  $: height = size * expandHeight
</script>

<svg
  {width}
  {height}
  viewBox="-{ref * (expandWith - 1)} 0 {ref * expandWith} {ref * expandHeight}"
  class="overflow-visible fill-primary stroke-primary-dark {klass}"
>
  <slot />
</svg>
