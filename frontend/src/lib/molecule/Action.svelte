<script lang="ts">
  import { mdiPencilOutline } from '@mdi/js'

  import type { Action } from 'types'
  import IconButton from '$lib/atom/IconButton.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import Relations from '$lib/molecule/Relations.svelte'
  import { isMobile } from '$lib/stores'

  export let action: Action
  export let inputsEl: HTMLElement[] = []
  export let outputsEl: HTMLElement[] = []
  export let scrollEl: HTMLElement

  let mouseDown = false

  function mousedownHandler(event: MouseEvent) {
    if ($isMobile) return
    mouseDown = true

    const mouseOrigin = event.clientX
    const scrollOrigin = scrollEl.scrollLeft

    const mouseMoveHandler = (_event: MouseEvent) => {
      const mouseDelta = _event.clientX - mouseOrigin
      _event.offsetX
      const left = scrollOrigin - mouseDelta
      scrollEl.scrollBy({ left: -_event.movementX })
    }

    const mouseUpHandler = (_event: MouseEvent) => {
      mouseDown = false
      document.removeEventListener('mousemove', mouseMoveHandler)
    }

    document.addEventListener('mousemove', mouseMoveHandler)

    document.addEventListener('mouseup', mouseUpHandler, { once: true })
  }
</script>

<div
  on:mousedown={mousedownHandler}
  class="
      border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark
      group shrink-0 select-none snap-center
    "
  class:cursor-grab={!mouseDown}
  class:cursor-grabbing={mouseDown}
>
  <Relations type="input" bind:elements={inputsEl} relations={action.inputs} />

  <div class="px-4 py-2">
    <header class="pb-2 flex gap-4">
      <h3 class="text-xl">{action.name}</h3>
      <IconButton
        class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
        path={mdiPencilOutline}
        href="/admin/collections/action/{action.id}"
        external
      />
    </header>
    {#if action.description}
      {@html serialize(action.description)}
    {/if}
  </div>

  <Relations
    type="output"
    bind:elements={outputsEl}
    relations={action.outputs}
  />
</div>
