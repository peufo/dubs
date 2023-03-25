<script lang="ts">
  export let path: string
  export let size = 24

  let klass = ''
  export { klass as class }
  export let classSVG = ''
  const viewWidth = 24
  const viewHeight = 24
</script>

<i class="{klass} rounded-full grid place-content-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={`0 0 ${viewWidth} ${viewHeight}`}
    style="display: inline-block;"
    class={classSVG}
  >
    <path d={path} />
  </svg>
</i>
