<svelte:options namespace="svg" />

<script lang="ts">
  let klass = ''
  export { klass as class }
  export let style = ''
  export let href = ''
</script>

{#if href}
  <a {href} {style} class={klass}><slot /></a>
{:else}
  <slot />
{/if}
