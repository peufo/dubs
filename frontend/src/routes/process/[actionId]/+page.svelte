<script lang="ts">
  import type { PageData } from './$types'
  import Action from '$lib/molecule/Action.svelte'

  export let data: PageData
</script>

<svelte:head>
  <meta name="description" content="Processus de fabrication" />
</svelte:head>

<div class="max-w-2xl m-auto flex flex-col gap-8 pt-8">
  <Action
    action={data.action}
    inputs={data.action.inputs}
    outputs={data.action.outputs}
  />
</div>
