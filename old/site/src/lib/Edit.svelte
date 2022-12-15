<script lang="ts">
  import { onMount } from 'svelte'
  import qs from 'qs'

  import Search from '$lib/Search.svelte'
  import Action from '$lib/Action.svelte'

  let slug = ''
  let id = ''

  onMount(() => {
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    if (typeof params.slug === 'string') slug = params.slug
    if (typeof params.id === 'string') id = params.id
  })

  function searchSelect(detail: { slug: string; id: string }) {
    slug = detail.slug
    id = detail.id
    const url = new URL(window.location.origin + window.location.pathname)
    url.searchParams.set('slug', slug)
    url.searchParams.set('id', id)
    window.history.pushState({}, '', url)
  }
</script>

<div class="p-2 h-screen">
  <Search on:select={({ detail }) => searchSelect(detail)} class="fixed" />
  <div class="h-full grid items-center max-w-2xl m-auto">
    <div>
      {#if slug === 'action'}
        <Action {id} />
      {/if}
    </div>
  </div>
</div>
