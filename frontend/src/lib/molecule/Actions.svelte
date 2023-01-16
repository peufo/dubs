<script lang="ts">
  import type { Action as IAction, Port } from 'types'
  import Action from '$lib/molecule/Action.svelte'

  export let actions: IAction[]
  export let direction: 'forward' | 'backward' | undefined = undefined

  const isObject = (v: unknown) => v && typeof v === 'object'
  const getPorts = (port: Port) => (_actions: IAction[]) =>
    _actions
      .map((action) => action[port].map(({ action }) => action))
      .flat()
      .filter(isObject)

  $: inputs = getPorts('inputs')(actions)
  $: outputs = getPorts('outputs')(actions)

  let inputsEl: HTMLElement[][] = []
  let outputsEl: HTMLElement[][] = []
</script>

{#if inputs.length && (!direction || direction === 'backward')}
  <svelte:self actions={inputs} direction="backward" />
{/if}

{#if actions.length}
  <div class="flex justify-center items-center gap-2">
    {#each actions as action, index}
      <Action
        {action}
        inputsEl={inputsEl[index]}
        outputsEl={outputsEl[index]}
      />
    {/each}
  </div>
{/if}

{#if outputs.length && (!direction || direction === 'forward')}
  <svelte:self actions={outputs} direction="forward" />
{/if}
