<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  import Search from '$lib/Search.svelte'

  let search: Search

  onMount(() => {
    if ($page.route.id === '/process') search.openDialog()
  })
</script>

<div class="grid place-content-center">
  <Search bind:this={search} />
</div>

<slot />
