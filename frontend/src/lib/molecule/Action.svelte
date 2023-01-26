<script lang="ts">
  import { mdiPencilOutline, mdiSelect } from '@mdi/js'
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
  class="
    border rounded fill-primary-dark bg-primary-light
    group shrink-0 snap-center
    max-w-[95%] md:max-w-4xl
    drop-shadow
  "
  class:border-primary-dark={$page.params.actionId === action.id}
  class:border-primary-light={$page.params.actionId !== action.id}
  class:border-2={$page.params.actionId === action.id}
  class:rounded-b={action.description}
>
  <Relations type="input" bind:elements={inputsEl} relations={action.inputs} />

  <div>
    <header
      on:mousedown={mousedownHandler}
      class="p-2 flex gap-4 select-none border-primary text-primary-dark"
    >
      <h2 class="text-xl">{action.name}</h2>
      <div class="pl-2 ml-auto transition-opacity">
        <IconButton
          class="opacity-0 group-hover:opacity-100"
          path={mdiSelect}
          href="/process/{action.id}"
        />
        <IconButton
          class="opacity-0 group-hover:opacity-100"
          path={mdiPencilOutline}
          href="/admin/collections/action/{action.id}"
          external
        />
      </div>
    </header>

    <section
      class="flex bg-white rounded gap-2"
      class:flex-col={action.display === 'col'}
      class:flex-row-reverse={action.display === 'row_reverse'}
      class:flex-col-reverse={action.display === 'col_reverse'}
    >
      {#if action.description}
        <div class="action-description p-2 pb-6 ">
          {@html serialize(action.description)}
        </div>
      {/if}

      {#if typeof action.image === 'object'}
        <img
          class="
          rounded w-full sm:w-96
          {!!action.display?.match(/^col/) ? 'mx-auto sm:my-3' : ''}
          "
          src={action.image.sizes.card.url}
          alt={action.image.title}
        />
      {/if}
    </section>
  </div>

  <Relations
    type="output"
    bind:elements={outputsEl}
    relations={action.outputs}
  />
</div>

<style>
  :global(.action-description img) {
    max-width: 280px;
  }
</style>
