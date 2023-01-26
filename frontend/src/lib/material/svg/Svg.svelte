<script lang="ts">
  let klass = ''
  export { klass as class }

  export let size = 50
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 1000 1000"
  class="overflow-visible fill-primary stroke-primary-dark {klass}"
>
  <slot />
</svg>
