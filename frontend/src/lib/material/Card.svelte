<script lang="ts">
  import { slide } from 'svelte/transition'
  import IconButton from '$lib/material/IconButton.svelte'
  import { mdiChevronRight } from '@mdi/js'

  export let title = ''
  export let active = false

  let klass = ''
  export { klass as class }
</script>

<div
  class="{klass} p-4 border rounded shadow-md bg-white max-w-lg"
  on:click={() => (active = true)}
  on:keyup={() => (active = true)}
  class:cursor-pointer={!active}
>
  <div class="flex items-start gap-2">
    <slot name="header">
      <h3 class="text-xl grow">{title}</h3>
    </slot>
    <IconButton
      path={mdiChevronRight}
      secondary
      class="transition-transform {active ? 'rotate-90' : ''}"
      on:click={(event) => {
        event.stopPropagation()
        active = !active
      }}
    />
  </div>

  {#if active}
    <div class="py-4" transition:slide|local>
      <slot />
    </div>
  {/if}
</div>
