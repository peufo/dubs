<script lang="ts">
  export let size = 50
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 1000 1000"
  class="overflow-visible fill-primary stroke-primary-dark"
>
  <slot />
</svg>
