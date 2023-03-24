<script lang="ts">
  import type { PageData } from './$types'
  import { serialize } from '$lib/utils/serializeSlate'
  import { getPathname } from '$lib/utils/getPathname'
  import logo from '$lib/assets/logo.png?w=500&h=500&webp'

  export let data: PageData

  const { sectionA, sectionB } = data.landing
</script>

<svelte:head>
  <meta
    name="description"
    content="La famille Dubey vous propose du miel de production artisanal ajoulote."
  />

  <title>Dubs Apiculture • Miel de Coeuve</title>
</svelte:head>

<div class="max-w-3xl mx-auto flex flex-col gap-10 text-lg sm:text-xl">
  <div class="flex gap-6 justify-between items-center pt-10 pr-4 md:gap-10">
    <img
      class="w-1/2 rotate-12 max-w-sm"
      src={logo}
      alt="Logo principal miel de Coeuve"
      width="500"
      height="500"
    />
    <div class="w-48 sm:w-72 font-semibold text-3xl sm:text-5xl">
      <h3>Dubs</h3>
      <h3>Apiculture</h3>
    </div>
  </div>

  <div class="flex gap-6 sm:gap-10 pl-4 sm:pr-4">
    <div class="grow w-max">
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
          sectionA.image.sizes.card_h.url
        )}')"
      />
    {/if}
  </div>

  <div class="flex gap-6 sm:gap-10 pr-4 sm:pl-4">
    {#if typeof sectionB.image === 'object'}
      <div
        title={sectionB.image.title}
        class="
            h-48 w-44 bg-cover shrink-0 rounded-r-2xl
            sm:h-72 sm:w-64 sm:rounded-2xl
          "
        style="background-image: url('{getPathname(
          sectionB.image.sizes.card_h.url
        )}')"
      />
    {/if}
    <div class="mr-4 sm:mr-0 grow">
      {#if sectionB.text}
        {@html serialize(sectionB.text)}
      {/if}
    </div>
  </div>
</div>
