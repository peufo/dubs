<script lang="ts">
  export let subtitle = ''
</script>

<svelte:head>
  <title>Dubs Apiculture{subtitle ? ` · ${subtitle}` : ''}</title>
</svelte:head>

<div class="p-3 flex flex-wrap gap-4 pr-32">
  <a href="/" class="hidden sm:block">
    <img
      src="/logo-256.png"
      alt="Logo Dubs-Apiculture"
      class="max-h-20 rotate-12"
    />
  </a>

  <div>
    <a href="/">
      <h3 class="text-4xl font-semibold">Dubs Apiculture</h3>
    </a>
    {#if subtitle}
      <h5
        class="text-xl font-light uppercase tracking-[4px] pt-1 text-secondary-dark"
      >
        {subtitle}
      </h5>
    {/if}
  </div>

  <div class="pt-1">
    <slot />
  </div>
</div>
