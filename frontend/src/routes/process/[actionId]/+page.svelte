<script lang="ts">
  import type { PageData } from './$types'

  import Actions from '$lib/molecule/Actions.svelte'

  export let data: PageData
</script>

<svelte:head>
  <meta name="description" content="Processus de fabrication" />
</svelte:head>

<div class="flex flex-col gap-14 pt-6">
  <Actions actions={[data.action]} />
</div>
