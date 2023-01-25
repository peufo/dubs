<script lang="ts">
  import { mdiPencilOutline } from '@mdi/js'
  import { page } from '$app/stores'

  import type { Action } from 'types'
  import IconButton from '$lib/atom/IconButton.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import Relations from '$lib/molecule/Relations.svelte'
  import { isMobile } from '$lib/stores'

  export let action: Action
  export let inputsEl: HTMLElement[] = []
  export let outputsEl: HTMLElement[] = []
  export let scrollEl: HTMLElement

  function mousedownHandler() {
    if ($isMobile) return
    const mouseMoveHandler = ({ movementX }: MouseEvent) => {
      scrollEl.scrollBy({ left: -movementX })
    }
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener(
      'mouseup',
      () => document.removeEventListener('mousemove', mouseMoveHandler),
      { once: true }
    )
  }
</script>

<div
  on:mousedown={mousedownHandler}
  class="
    border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark
    group shrink-0 select-none snap-center max-w-[95%]
  "
  class:border-primary-dark={$page.params.actionId === action.id}
  class:border-2={$page.params.actionId === action.id}
>
  <Relations type="input" bind:elements={inputsEl} relations={action.inputs} />
  <div class="px-4 py-2">
    <header class="pb-2 flex gap-4">
      <a href="/process/{action.id}" class="text-xl">{action.name}</a>
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
