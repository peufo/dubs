<script lang="ts">
  export let reverse = false
</script>

{#if !reverse}
  <slot name="a" />
  <slot name="b" />
{:else}
  <slot name="b" />
  <slot name="a" />
{/if}
