<svelte:options namespace="svg" />

<script lang="ts">
  let klass = ''
  export { klass as class }
  export let style = ''
  export let href = ''
  export let external = false
</script>

{#if href}
  <a {href} {style} class={klass} data-sveltekit-reload={external ? '' : 'off'}>
    <slot />
  </a>
{:else}
  <slot />
{/if}
