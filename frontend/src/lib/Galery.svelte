<script lang="ts">
  import { fade } from 'svelte/transition'

  import logo from '$lib/assets/logo-borderless.png?w=400&h=400&webp'
  import Image from '$lib/Image.svelte'
  import type { Media } from 'types'

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
    bind:this={scrollContainer}
    class="flex gap-4 overflow-hidden snap-x relative"
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
  </div>

  {#key selectedIndex}
    <div
      in:fade|local={{ duration: 200 }}
      class="min-h-[520px] grid place-content-center"
    >
      <Image
        image={images[selectedIndex]}
        size="large"
        placeholder={logo}
        class="rounded-lg object-cover"
      />
    </div>
  {/key}
</div>
