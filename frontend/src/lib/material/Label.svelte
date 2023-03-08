<script lang="ts">
  let klass = ''
  export { klass as class }
</script>

<div class={klass}>
  <label class="block w-full">
    <slot />
  </label>
</div>
