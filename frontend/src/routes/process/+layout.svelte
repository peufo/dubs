<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  import Title from '$lib/Title.svelte'
  import Search from '$lib/Search.svelte'

  let search: Search

  onMount(() => {
    if ($page.route.id === '/process') search.openDialog()
  })
</script>

<Title subtitle="Processus de fabrication">
  <Search bind:this={search} />
</Title>

<slot />
