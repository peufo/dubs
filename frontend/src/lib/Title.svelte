<script lang="ts">
  import logo from '$lib/assets/logo-borderless.png?w=80&h=80&webp'

  export let subtitle = ''
  export let subtitleUrl: string | null = null
</script>

<svelte:head>
  <title>Dubs Apiculture{subtitle ? ` · ${subtitle}` : ''}</title>
</svelte:head>

<div class="p-3 flex flex-wrap gap-4 pr-32">
  <a href="/" class="hidden sm:block">
    <img
      src={logo}
      alt="Logo Dubs-Apiculture"
      class="h-[80px] w-[80px] rotate-12 aspect-square"
      width="80"
      height="80"
    />
  </a>

  <div>
    <a href="/">
      <h3 class="text-4xl font-semibold">Dubs Apiculture</h3>
    </a>
    {#if subtitle}
      <a href={subtitleUrl || '/'}>
        <h4
          class="text-xl font-light uppercase tracking-[4px] pt-1 text-secondary-dark"
        >
          {subtitle}
        </h4>
      </a>
    {/if}
  </div>

  <div class="pt-1">
    <slot />
  </div>
</div>
