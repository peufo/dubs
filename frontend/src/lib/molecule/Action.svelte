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
  export let element: HTMLElement

  let mouseDown = false

  function mousedownHandler() {
    if ($isMobile) return
    mouseDown = true

    const mouseMoveHandler = ({ movementX }: MouseEvent) => {
      scrollEl.scrollBy({ left: -movementX })
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener(
      'mouseup',
      () => {
        mouseDown = false
        document.removeEventListener('mousemove', mouseMoveHandler)
      },
      { once: true }
    )
  }
</script>

<div
  bind:this={element}
  on:mousedown={mousedownHandler}
  class="
      border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark
      group shrink-0 select-none snap-center
    "
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
