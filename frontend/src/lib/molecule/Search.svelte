<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { goto } from '$app/navigation'
  import debounce from 'debounce'
  import {
    mdiAlertCircleOutline,
    mdiDiamondStone,
    mdiEmoticonConfusedOutline,
    mdiLightningBolt,
    mdiLoading,
    mdiMagnify,
    mdiTools,
  } from '@mdi/js'

  import type { Slugs, Action, Resource, Product } from 'types'
  import { api } from '$lib/api'
  import Icon from '$lib/atom/Icon.svelte'
  import ClickOutside from '$lib/atom/ClickOutside.svelte'

  let klass = ''
  export { klass as class }

  let dialogElement: HTMLDialogElement
  let wrapper: HTMLDivElement
  let searchValue = ''
  let actions: Action[] = []
  let resources: Resource[] = []
  let products: Product[] = []
  let selectedIndex = -1
  let resultCount = 0
  let isLoading = false
  let isError = false

  type Events = {
    select: { slug: keyof Slugs; id: string }
  }
  const dispatch = createEventDispatcher<Events>()

  onMount(() => {
    document.addEventListener('keydown', handleShortcut)
    return () => {
      document.removeEventListener('keydown', handleShortcut)
    }
  })

  const handleSearch = debounce(search, 200)

  async function search() {
    isLoading = true
    isError = false
    try {
      ;[actions, resources, products] = await Promise.all([
        api
          .get('action', {
            where: { name: { like: searchValue } },
            depth: 1,
            limit: 5,
          })
          .then((res) => res.docs),
        api
          .get('resource', {
            where: { name: { like: searchValue } },
            depth: 0,
            limit: 5,
          })
          .then((res) => res.docs),
        api
          .get('product', {
            where: { name: { like: searchValue } },
            depth: 0,
            limit: 5,
          })
          .then((res) => res.docs),
      ])

      resultCount = actions.length + resources.length + products.length
    } catch (err: any) {
      isError = true
      console.error(err)
    } finally {
      isLoading = false
      selectedIndex = 0
    }
  }

  function handleInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
      select(selectedIndex)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      selectedIndex--
      if (selectedIndex < 0) selectedIndex = resultCount - 1
      scrollToSelected()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      selectedIndex++
      if (selectedIndex > resultCount - 1) selectedIndex = 0
      scrollToSelected()
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

  export function toggleDialog() {
    if (dialogElement.open) dialogElement.close()
    else openDialog()
  }

  export function openDialog() {
    if (dialogElement.open) return
    searchValue = ''
    search()
    dialogElement.showModal()
  }

  function scrollToSelected() {
    const el = document.querySelector(
      `li[data-index="${selectedIndex}"]`
    ) as HTMLLIElement
    if (!el) return
    const top = el.offsetTop - 40
    if (top < wrapper.scrollTop) {
      wrapper.scrollTo({ top })
      return
    }
    const bottom = el.offsetTop + el.offsetHeight
    const delta = bottom - (wrapper.scrollTop + wrapper.offsetHeight) + 10
    if (delta > 0) {
      wrapper.scrollTo({ top: wrapper.scrollTop + delta })
      return
    }
  }

  function select(index: number) {
    dialogElement.close()

    if (index < actions.length) {
      dispatch('select', { slug: 'action', id: actions[index].id })
      goto(`/process/${actions[index].id}`)
      return
    }
    index -= actions.length
    if (index < resources.length) {
      dispatch('select', { slug: 'resource', id: resources[index].id })
      return
    }
    index -= resources.length
    dispatch('select', { slug: 'product', id: products[index].id })
  }

  function handleDialogClick(event: MouseEvent) {
    if (event.target === dialogElement) dialogElement.close()
  }
</script>

<button
  on:click={toggleDialog}
  aria-keyshortcuts="Ctrl+K"
  class="{klass} flex items-center w-52 bg-primary-light text-primary-dark border border-primary rounded py-1 px-3 hover:bg-primary cursor-pointer"
>
  <Icon path={mdiMagnify} class="pr-2 fill-primary-dark" />
  <span>Recherche</span>
  <div class="grow" />
  <kbd class="font-semibold text-xs">Ctrl K</kbd>
</button>

<dialog
  bind:this={dialogElement}
  on:click={handleDialogClick}
  on:keyup={() => {}}
  class="border border-primary-dark rounded-md p-0 w-11/12 sm:w-5/6 max-w-2xl"
>
  <div class="flex flex-col">
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

      <kbd class="bg-primary-light text-primary-dark text-xs px-1 rounded">
        ESC
      </kbd>
    </header>

    <div
      bind:this={wrapper}
      class="h-[460px] px-3 pb-2 overflow-y-auto relative"
    >
      <!-- Section Actions -->
      {#if actions.length}
        <section class="flex flex-col gap-2">
          <div
            class="sticky text-lg font-semibold mt-4 pb-2 top-0 bg-white/50 backdrop-blur-sm"
          >
            Actions
            <Icon
              path={mdiLightningBolt}
              class="opacity-60 ml-1"
              classSVG="rotate-12"
            />
          </div>

          <ul class="flex flex-col gap-2">
            {#each actions as action, index}
              <li data-index={index}>
                <a
                  href="/process/{action.id}"
                  on:mousemove={() => (selectedIndex = index)}
                  on:click={() => dialogElement.close()}
                  class="
                    flex items-center px-3 py-1 text-primary-dark cursor-pointer rounded
                    {selectedIndex === index
                    ? 'bg-primary-light'
                    : 'bg-primary/10'}
                  "
                >
                  <div>{action.name}</div>
                  {#if typeof action.resource === 'object'}
                    <div
                      class="ml-auto flex items-center text-xs fill-primary-dark"
                    >
                      <div class="bg-white border px-2 py-1">
                        {action.resource.name}
                      </div>
                    </div>
                  {/if}
                </a>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      <!-- Section Resources -->
      {#if resources.length}
        <section class="flex flex-col gap-2">
          <div
            class="sticky text-lg font-semibold mt-4 pb-2 top-0 bg-white/50 backdrop-blur-sm"
          >
            Resources
            <Icon path={mdiTools} class="opacity-60 ml-1" />
          </div>

          <ul class="flex flex-col gap-2">
            {#each resources as resource, index}
              <li
                on:mousemove={() => (selectedIndex = index + actions.length)}
                on:click={() => select(index + actions.length)}
                data-index={index + actions.length}
                class="
                    px-3 py-1 text-primary-dark cursor-pointer border
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
          <div
            class="sticky text-lg font-semibold mt-4 pb-2 top-0 bg-white/50 backdrop-blur-sm"
          >
            Produits
            <Icon path={mdiDiamondStone} class="opacity-60 ml-1" />
          </div>

          <ul class="flex flex-col gap-2">
            {#each products as product, index}
              <li
                on:mousemove={() =>
                  (selectedIndex = index + actions.length + resources.length)}
                on:click={() =>
                  select(index + actions.length + resources.length)}
                data-index={index + actions.length + resources.length}
                class="
                    px-3 py-1 text-primary-dark cursor-pointer rounded-full
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
          {:else if isError}
            Oups, il y a une erreur
            <Icon
              path={mdiAlertCircleOutline}
              size={46}
              class="fill-red-600 mt-2"
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
