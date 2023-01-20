<script lang="ts">
  import { onMount } from 'svelte'

  import { actionsPorts, connections } from '$lib/molecule/connection/store'
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

  let scrollContainer: HTMLElement
  let inputsEl: HTMLElement[][] = []
  let outputsEl: HTMLElement[][] = []

  onMount(() => {
    connections.update((v) => {
      const addElement = (key: 'from' | 'to') => (el: HTMLElement) => {
        const { id = '' } = el.dataset
        const prev = v.get(id) || {}
        v.set(id, { scrollContainer, ...prev, [key]: el })
      }
      inputsEl.flat().forEach(addElement('to'))
      outputsEl.flat().forEach(addElement('from'))
      return v
    })

    actionsPorts.update((v) =>
      v.set(scrollContainer, {
        inputs: inputsEl.flat(),
        outputs: outputsEl.flat(),
      })
    )
    return () => {
      connections.update((v) => {
        const removeElement = (el: HTMLElement) => v.delete(el.dataset.id || '')
        inputsEl.flat().forEach(removeElement)
        outputsEl.flat().forEach(removeElement)
        return v
      })

      actionsPorts.update((v) => {
        v.delete(scrollContainer)
        return v
      })
    }
  })
</script>

{#if inputs.length && (!direction || direction === 'backward')}
  <svelte:self actions={inputs} direction="backward" />
{/if}

{#if actions.length}
  <div
    bind:this={scrollContainer}
    class="flex items-center gap-2 p-2 snap-x overflow-auto"
  >
    <div class="shrink-0 w-[48%]" />

    {#each actions as action, index}
      <Action
        {action}
        bind:inputsEl={inputsEl[index]}
        bind:outputsEl={outputsEl[index]}
      />
    {/each}

    <div class="shrink-0 w-[48%]" />
  </div>
{/if}

{#if outputs.length && (!direction || direction === 'forward')}
  <svelte:self actions={outputs} direction="forward" />
{/if}
