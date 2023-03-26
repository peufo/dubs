<script lang="ts">
  import type { PageData } from './$types'

  import ActionsLayout from '$lib/ActionsLayout.svelte'
  import Actions from '$lib/Actions.svelte'

  export let data: PageData
  //
</script>

<svelte:head>
  <meta name="description" content="Processus de fabrication" />
</svelte:head>

<ActionsLayout>
  <Actions actions={[data.action]} adminMode />
</ActionsLayout>
