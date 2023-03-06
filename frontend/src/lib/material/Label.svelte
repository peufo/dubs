<script lang="ts">
  let klass = ''
  export { klass as class }

  export let key: string
  export let label = ''

  const capitalise = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1)
</script>

<div class={klass}>
  <label class="block w-full" for={key}>
    {label || capitalise(key)}
  </label>
  <slot />
</div>
