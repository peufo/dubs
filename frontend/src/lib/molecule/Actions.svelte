<script lang="ts">
  import type { Action as IAction, State, Port } from 'types'
  import Action from '$lib/molecule/Action.svelte'

  export let actions: IAction[]
  export let direction: 'forward' | 'backward'
  export let depth = 2

  const isObject = (v: unknown) => v && typeof v === 'object'
  const getPorts = (port: Port) => (_actions: IAction[]) =>
    _actions
      .map((action) => action[port].map(({ action }) => action))
      .flat()
      .filter(isObject)

  $: inputs = getPorts('inputs')(actions)
  $: outputs = getPorts('outputs')(actions)
</script>

{#if inputs.length && direction === 'backward'}
  <svelte:self actions={inputs} {direction} depth={--depth} />
{/if}

{#if actions.length}
  <div class="flex justify-center items-center gap-2">
    {#each actions as action}
      <Action {action} />
    {/each}
  </div>
{/if}

{#if outputs.length && direction === 'forward'}
  <svelte:self actions={outputs} {direction} />
{/if}
