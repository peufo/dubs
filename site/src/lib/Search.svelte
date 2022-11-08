<script lang="ts">
  import debounce from 'debounce'

  import type { Action } from 'types'
  import { api } from '$lib/api'
  import Icon from '$material/Icon.svelte'
  import { mdiMagnify } from '@mdi/js'

  export let actionId: string | undefined = undefined

  const handleSearch = debounce(search, 200)

  let searchValue = ''
  let actions: Action[] = []

  async function search() {
    const searchResult = await api.get('action', {
      where: { name: { contains: searchValue } },
      depth: 0,
    })
    actions = searchResult.docs
  }
</script>

<div class="p-4">
  <button
    class="flex items-center w-52 bg-primary-light text-primary-dark border border-primary rounded py-1 px-3 hover:bg-primary cursor-pointer"
  >
    <Icon path={mdiMagnify} class="pr-2 fill-primary-dark" />
    <span>Recherche</span>
    <div class="grow" />
    <kbd class="font-semibold text-xs">Ctrl K</kbd>
  </button>
  <input
    bind:value={searchValue}
    on:input={handleSearch}
    placeholder="Recherche Ctrl K"
    class="border-secondary-dark border-2 rounded p-2"
  />

  <p>{actionId}</p>
</div>
