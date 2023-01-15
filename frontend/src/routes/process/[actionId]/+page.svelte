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

<Actions actions={inputs} direction="backward" />

<div class="max-w-2xl m-auto flex flex-col gap-8 pt-8">
  <Action action={data.action} />
</div>

<Actions actions={outputs} direction="forward" />
