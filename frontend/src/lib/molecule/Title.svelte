<script lang="ts">
  export let subtitle = ''
</script>

<svelte:head>
  <title>Dubs Apiculture{subtitle ? ` · ${subtitle}` : ''}</title>
</svelte:head>

<h3 class="text-4xl font-semibold">Dubs Apiculture</h3>

{#if subtitle}
  <h5 class="text-xl font-light uppercase tracking-[4px] pt-1">
    {subtitle}
  </h5>
{/if}
