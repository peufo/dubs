<script lang="ts">
  export let reverse = false
</script>

{#if !reverse}
  <slot name="a" />
  <slot name="b" />
  <slot name="c" />
{:else}
  <slot name="c" />
  <slot name="b" />
  <slot name="a" />
{/if}
