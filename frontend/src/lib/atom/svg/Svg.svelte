<script lang="ts">
  export let width = 50
  export let height = 50
  export let viewWidth = 1000
  export let viewHeight = 1000
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {width}
  {height}
  viewBox="0 0 {viewWidth} {viewHeight}"
  class="overflow-visible fill-primary stroke-primary-dark"
>
  <slot />
</svg>
