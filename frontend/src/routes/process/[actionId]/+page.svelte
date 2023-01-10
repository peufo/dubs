<script lang="ts">
  import type { PageData } from './$types'
  import Action from '$lib/molecule/Action.svelte'

  export let data: PageData
</script>

<svelte:head>
  <meta name="description" content="Processus de fabrication" />
</svelte:head>

<div class="pt-8 grid items-center max-w-2xl m-auto">
  <Action action={data.action} />
</div>
