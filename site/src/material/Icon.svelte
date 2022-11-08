<script lang="ts">
  export let path: string
  export let size = 24

  let klass = ''
  export { klass as class }
  const viewWidth = 24
  const viewHeight = 24
</script>

<i class="rounded-full {klass}">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={`0 0 ${viewWidth} ${viewHeight}`}
  >
    <path d={path} />
  </svg>
</i>
