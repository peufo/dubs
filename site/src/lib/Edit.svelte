<script lang="ts">
  import { onMount } from 'svelte'
  import qs from 'qs'
  import Search from '$lib/Search.svelte'

  let slug = ''
  let id = ''

  onMount(() => {
    console.log(window.location)
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

<div class="p-4">
  <Search on:select={({ detail }) => searchSelect(detail)} />

  <div>
    slug: {slug} <br />
    id: {id}
  </div>
</div>
