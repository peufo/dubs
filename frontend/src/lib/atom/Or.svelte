<script lang="ts">
  let isVisible = true
  export { isVisible as if }
</script>

{#if isVisible}
  <div class="w-1 h-3 rounded-full border border-primary-dark bg-white" />
{/if}
