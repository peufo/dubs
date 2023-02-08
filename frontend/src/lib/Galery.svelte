<script lang="ts">
  import type { Media } from 'types'
  import logo from '$lib/assets/logo-borderless.png?w=400&h=400&webp'
  import Image from '$lib/Image.svelte'
  import { scrollState } from '$lib/actions/scrollState'
  import { is_client } from 'svelte/internal'

  export let images: (string | Media)[]

  let selectedIndex = 0
  let scrollContainer: HTMLElement

  function handleClick(event: MouseEvent, index: number) {
    selectedIndex = index
    const target = event.target as HTMLImageElement
    const left = target.offsetLeft - scrollContainer.offsetWidth / 2
    scrollContainer.scrollTo({ left, behavior: 'smooth' })
  }

  let isStart = false
  let isEnd = false
</script>

<div class="flex flex-col gap-4 max-w-md">
  <div class="grid place-content-center h-[320px] md:h-[380px]">
    <Image
      image={images[selectedIndex]}
      size="large"
      placeholder={logo}
      class="rounded-lg object-scale-down max-h-[320px] md:max-h-[380px] w-fit"
    />
  </div>

  <div class="flex">
    <div
      class="w-1 rounded transition-opacity bg-secondary opacity-0"
      class:opacity-100={!isStart}
    />

    <div
      bind:this={scrollContainer}
      use:scrollState={(state) => ({ isStart, isEnd } = state)}
      class="flex gap-3 overflow-auto scrollbar-hides snap-x relative p-1"
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
            hover:outline outline-secondary 
            {index === selectedIndex ? 'outline' : ''}
          "
        />
      {/each}

      <div class="shrink-0 w-[48%]" />
    </div>

    <div
      class="w-1 rounded transition-opacity bg-secondary opacity-0"
      class:opacity-100={!isEnd}
    />
  </div>
</div>
