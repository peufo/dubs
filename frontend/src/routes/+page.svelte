<script lang="ts">
  import type { PageData } from './$types'
  import { serialize } from '$lib/utils/serializeSlate'

  export let data: PageData

  const { sectionA, sectionB } = data.landing

  const getPathname = (url?: string) => new URL(url || '').pathname
</script>

<svelte:head>
  <meta
    name="description"
    content="La famille Dubey vous propose du miel de production artisanal"
  />
</svelte:head>

<div class="flex justify-center gap-6 md:gap-10 items-center pt-10">
  <img
    class="w-1/2 rotate-12 max-w-sm"
    src="/logo.png"
    alt="Logo principal miel de Coeuve"
  />
  <div class="font-semibold text-3xl sm:text-5xl">
    <h3>Dubs</h3>
    <h3>Apiculture</h3>
  </div>
</div>

<div
  class="flex flex-col mt-10 gap-12 text-lg sm:text-xl sm:gap-8 max-w-2xl m-auto"
>
  <div class="flex gap-6 sm:gap-10">
    <div class="ml-4 sm:ml-0">
      {#if sectionA.text}
        {@html serialize(sectionA.text)}
      {/if}
    </div>

    {#if typeof sectionA.image === 'object'}
      <div
        title={sectionA.image.title}
        class="
          h-48 w-48 sm:h-72 sm:w-72 sm:rounded-2xl
          bg-cover shrink-0 rounded-l-2xl
        "
        style="background-image: url('{getPathname(
          sectionA.image.sizes.card.url
        )}')"
      />
    {/if}
  </div>

  <div class="flex gap-6 sm:gap-10">
    {#if typeof sectionB.image === 'object'}
      <div
        title={sectionB.image.title}
        class="
          h-48 w-44 bg-cover shrink-0 rounded-r-2xl
          sm:h-72 sm:w-64 sm:rounded-2xl sm:-translate-y-1/4
        "
        style="background-image: url('{getPathname(
          sectionB.image.sizes.card.url
        )}')"
      />
    {/if}
    <div class="mr-4 sm:mr-0">
      {#if sectionB.text}
        {@html serialize(sectionB.text)}
      {/if}
    </div>
  </div>
</div>
