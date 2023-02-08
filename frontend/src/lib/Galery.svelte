<script lang="ts">
  import type { Media } from 'types'
  import logo from '$lib/assets/logo-borderless.png?w=400&h=400&webp'
  import Image from '$lib/Image.svelte'
  import { scrollState } from '$lib/actions/scrollState'

  export let images: (string | Media)[]

  let selectedIndex = 0
  let scrollContainer: HTMLElement

  function handleClick(event: MouseEvent, index: number) {
    selectedIndex = index
    const target = event.target as HTMLImageElement
    const left =
      0.5 +
      target.offsetLeft +
      target.offsetWidth / 2 -
      scrollContainer.offsetWidth / 2
    scrollContainer.scrollTo({ left })
  }

  let isStart = false
  let isEnd = false
</script>

<div class="flex flex-col gap-4 max-w-md w-full">
  <div class="grid justify-center h-[320px] md:h-[380px]">
    <Image
      image={images[selectedIndex]}
      size="card_h"
      placeholder={logo}
      class="rounded-lg object-scale-down max-h-[320px] md:max-h-[380px] w-fit"
    />
  </div>

  {#if images.length > 1}
    <div class="flex">
      <div
        class="w-1 rounded transition-opacity bg-secondary-light/50 opacity-0 scale-105"
        class:opacity-100={!isStart}
      />

      <div
        bind:this={scrollContainer}
        use:scrollState={(state) => ({ isStart, isEnd } = state)}
        class="grow flex gap-3 overflow-auto scrollbar-hide snap-x relative p-1 scroll-smooth"
      >
        <div class="shrink-0 w-[48%]" />

        {#each images as image, index}
          <Image
            on:click={(event) => handleClick(event, index)}
            {image}
            size="mini"
            class="
            w-14 h-14 p-1 rounded-lg object-scale-down
            cursor-pointer snap-center
            outline-2
            hover:outline outline-secondary-light 
            {index === selectedIndex ? 'outline' : ''}
          "
          />
        {/each}

        <div class="shrink-0 w-[48%]" />
      </div>

      <div
        class="w-1 rounded transition-opacity bg-secondary-light/50 opacity-0 scale-105"
        class:opacity-100={!isEnd}
      />
    </div>
  {/if}
</div>
