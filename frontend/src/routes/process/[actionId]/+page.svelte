<script lang="ts">
  import type { PageData } from './$types'
  import type { Action as IAction } from 'types'
  import Action from '$lib/molecule/Action.svelte'
  import Actions from '$lib/molecule/Actions.svelte'

  export let data: PageData

  const isObject = (v: any) => typeof v === 'object'

  $: inputs = data.action.inputs
    .map(({ action }) => action)
    .filter(isObject) as IAction[]
  $: outputs = data.action.outputs
    .map(({ action }) => action)
    .filter(isObject) as IAction[]
</script>

<svelte:head>
  <meta name="description" content="Processus de fabrication" />
</svelte:head>

<div class="flex flex-col gap-10 pt-6 max-w-xl m-auto">
  <Actions actions={[data.action]} />
</div>
