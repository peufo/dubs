<script lang="ts">
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import debounce from 'debounce'

  import type { Action, Resource, Product } from 'types'
  import { api } from '$lib/api'
  import Icon from '$material/Icon.svelte'
  import {
    mdiDiamondStone,
    mdiEmoticonConfusedOutline,
    mdiLightningBolt,
    mdiLoading,
    mdiMagnify,
    mdiTools,
  } from '@mdi/js'

  let dialogElement: HTMLDialogElement
  let searchValue = ''
  let actions: Action[] = []
  let resources: Resource[] = []
  let products: Product[] = []
  let selectedIndex = -1
  let resultCount = 0
  let isLoading = false

  onMount(() => {
    dialogElement.showModal()
    search()

    document.addEventListener('keydown', handleShortcut)
    return () => {
      document.removeEventListener('keydown', handleShortcut)
    }
  })

  const handleSearch = (() => {
    return debounce(search, 200)
  })()
  async function search() {
    isLoading = true
    const [resActions, resResource, resProduct] = await Promise.all([
      api.get('action', {
        where: { name: { like: searchValue } },
        depth: 0,
        limit: 5,
      }),
      api.get('resource', {
        where: { name: { like: searchValue } },
        depth: 0,
        limit: 5,
      }),
      api.get('product', {
        where: { name: { like: searchValue } },
        depth: 0,
        limit: 5,
      }),
    ])

    actions = resActions.docs
    resources = resResource.docs
    products = resProduct.docs
    resultCount = actions.length + resources.length + products.length
    isLoading = false
    selectedIndex = 0
  }

  function handleInput(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      selectedIndex--
      if (selectedIndex < 0) selectedIndex = resultCount - 1
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      selectedIndex++
      if (selectedIndex > resultCount - 1) selectedIndex = 0
      return
    }
    handleSearch()
  }

  function handleShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault()
      toggleDialog()
    }
  }

  function toggleDialog() {
    if (dialogElement.open) dialogElement.close()
    else {
      searchValue = ''
      dialogElement.showModal()
    }
  }
</script>

<button
  on:click={toggleDialog}
  aria-keyshortcuts="Ctrl+K"
  class="flex items-center w-52 bg-primary-light text-primary-dark border border-primary rounded py-1 px-3 hover:bg-primary cursor-pointer"
>
  <Icon path={mdiMagnify} class="pr-2 fill-primary-dark" />
  <span>Recherche</span>
  <div class="grow" />
  <kbd class="font-semibold text-xs">Ctrl K</kbd>
</button>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialogElement}
  on:click={() => dialogElement.close()}
  class="border border-primary-dark rounded-md p-0 w-11/12 sm:w-5/6 max-w-2xl "
>
  <div on:click|stopPropagation class="flex flex-col">
    <header class="flex py-2 px-3 gap-2 items-center border-b">
      <label class="grow">
        <Icon path={mdiMagnify} class="fill-primary-dark" />
        <input
          type="text"
          placeholder="Recherche"
          class="px-2 py-1 focus:outline-none caret-primary-dark selection:bg-primary-light selection:text-primary-dark"
          on:keydown={handleInput}
          bind:value={searchValue}
        />
      </label>

      <kbd class="bg-primary-light text-primary text-xs px-1 rounded">ESC</kbd>
    </header>

    <div class="h-[460px] px-3 overflow-y-auto">
      <!-- Section Actions -->
      {#if actions.length}
        <section class="flex flex-col gap-2">
          <div class="text-lg font-semibold mt-4 pb-2 sticky top-0 bg-white">
            Actions
            <Icon
              path={mdiLightningBolt}
              class="opacity-60 ml-1"
              classSVG="rotate-12"
            />
          </div>

          <ul class="flex flex-col gap-2">
            {#each actions as action, index}
              <li
                on:mouseenter={() => (selectedIndex = index)}
                class="
                  px-3 data py-1 text-primary-dark cursor-pointer rounded
                  {selectedIndex === index
                  ? 'bg-primary-light'
                  : 'bg-primary/10'}
                "
              >
                {action.name}
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      <!-- Section Resources -->
      {#if resources.length}
        <section class="flex flex-col gap-2">
          <div class="text-lg font-semibold mt-4 pb-2 sticky top-0 bg-white">
            Resources
            <Icon path={mdiTools} class="opacity-60 ml-1" />
          </div>

          <ul class="flex flex-col gap-2">
            {#each resources as resource, index}
              <li
                on:mouseenter={() => (selectedIndex = index + actions.length)}
                class="
                  px-3 data py-1 text-primary-dark cursor-pointer rounded
                  {selectedIndex === index + actions.length
                  ? 'bg-primary-light'
                  : 'bg-primary/10'}
                "
              >
                {resource.name}
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      <!-- Section Product -->
      {#if products.length}
        <section class="flex flex-col gap-2">
          <div class="text-lg font-semibold mt-4 pb-2 sticky top-0 bg-white">
            Produits
            <Icon path={mdiDiamondStone} class="opacity-60 ml-1" />
          </div>

          <ul class="flex flex-col gap-2">
            {#each products as product, index}
              <li
                on:mouseenter={() =>
                  (selectedIndex = index + actions.length + resources.length)}
                class="
                  px-3 data py-1 text-primary-dark cursor-pointer rounded
                  {selectedIndex === index + actions.length + resources.length
                  ? 'bg-primary-light'
                  : 'bg-primary/10'}
                "
              >
                {product.name}
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if !actions.length && !resources.length && !products.length}
        <div class="grid place-content-center h-full opacity-70 text-center">
          {#if isLoading}
            <Icon
              path={mdiLoading}
              size={46}
              class="animate-spin fill-primary"
            />
          {:else}
            Pas de résultat pour
            <b>{searchValue}</b>
            <Icon
              path={mdiEmoticonConfusedOutline}
              size={36}
              class="fill-primary mt-2"
            />
          {/if}
        </div>
      {/if}
    </div>
  </div>
</dialog>

<style>
  dialog::backdrop {
    filter: blur(19px);
  }
</style>
