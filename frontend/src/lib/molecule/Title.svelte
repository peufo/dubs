<script lang="ts">
  export let subtitle = ''
</script>

<svelte:head>
  <title>Dubs Apiculture{subtitle ? ` · ${subtitle}` : ''}</title>
</svelte:head>

<div class="flex gap-4">
  <img
    src="/logo-256.png"
    class="hidden md:block max-h-20 rotate-12"
    alt="Logo Dubs-Apiculture"
  />

  <div>
    <h3 class="text-4xl font-semibold">Dubs Apiculture</h3>

    {#if subtitle}
      <h5
        class="text-xl font-light uppercase tracking-[4px] pt-1 text-secondary-dark"
      >
        {subtitle}
      </h5>
    {/if}
  </div>
</div>
