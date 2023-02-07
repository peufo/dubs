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
    const left = target.offsetLeft - scrollContainer.offsetWidth / 2
    scrollContainer.scrollTo({ left, behavior: 'smooth' })
  }
</script>

<div class="flex flex-col gap-4 max-w-md">
  <div
    class="h-[380px] md:h-[540px] grid place-content-center overflow-hidden rounded-lg"
  >
    <Image
      image={images[selectedIndex]}
      size="large"
      placeholder={logo}
      class="rounded-lg object-cover"
    />
  </div>

  <div
    bind:this={scrollContainer}
    use:scrollState
    class="flex gap-4 overflow-auto scrollbar-hides snap-x relative"
  >
    {#each images as image, index}
      <Image
        on:click={(event) => handleClick(event, index)}
        {image}
        size="thumbnail"
        class="
        w-28 rounded-lg cursor-pointer snap-center hover:opacity-80
        {index === selectedIndex ? 'opacity-40' : ''}
      "
      />
    {/each}

    <div class="shrink-0 w-[48%]" />
  </div>
</div>
