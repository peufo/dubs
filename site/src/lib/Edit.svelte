<script lang="ts">
  import Search from '$lib/Search.svelte'

  function searchSelect(detail: { slug: string; id: string }) {
    console.log('GOTO', detail.slug, detail.id)
  }
</script>

<div class="p-4">
  <Search on:select={({ detail }) => searchSelect(detail)} />
</div>
