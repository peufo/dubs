<script lang="ts">
  import { mdiPencilOutline, mdiSelect } from '@mdi/js'
  import { page } from '$app/stores'

  import type { Action } from 'types'
  import IconButton from '$lib/material/IconButton.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import Relations from '$lib/Relations.svelte'
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
>
  <Relations type="input" bind:elements={inputsEl} relations={action.inputs} />

  <div class="flex flex-col gap-1">
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

    {#each action.sections as { text, image, layout }}
      <section
        class="flex flex-wrap sm:flex-nowrap bg-white rounded gap-2 items-center"
        class:flex-col={layout === 'col'}
        class:flex-row-reverse={layout === 'row_reverse'}
        class:flex-col-reverse={layout === 'col_reverse'}
      >
        {#if text}
          <div class="section-text px-2">
            {@html serialize(text)}
          </div>
        {/if}

        {#if typeof image === 'object'}
          <img
            class="
          rounded w-full sm:w-96
          {!!layout?.match(/^col/) ? 'mx-auto sm:my-3' : ''}
          "
            src={image.sizes.card_h.url}
            alt={image.title}
          />
        {/if}
      </section>
    {/each}
  </div>

  <Relations
    type="output"
    bind:elements={outputsEl}
    relations={action.outputs}
  />
</div>

<style>
  :global(.section-text img) {
    max-width: 280px;
  }
</style>
