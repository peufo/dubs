<script lang="ts">
  import { onMount, tick } from 'svelte'

  import type { Action as IAction, Port } from 'types'
  import Action from '$lib/molecule/Action.svelte'
  import Connections from '$lib/molecule/connection/Connections.svelte'
  import { isMobile } from '$lib/stores'

  export let actions: IAction[]
  export let direction: 'forward' | 'backward' | undefined = undefined
  export let previousScrollEl: HTMLElement | undefined = undefined
  export let previousPortsEl: HTMLElement[] = []

  let scrollEl: HTMLElement

  const isObject = (v: unknown) => v && typeof v === 'object'
  const getPorts = (port: Port) => (_actions: IAction[]) =>
    _actions
      .map((action) => action[port].map(({ action }) => action))
      .flat()
      .filter(isObject)

  $: inputs = getPorts('inputs')(actions)
  $: outputs = getPorts('outputs')(actions)

  // Recover in Action component
  let inputsEl: HTMLElement[][] = []
  let outputsEl: HTMLElement[][] = []

  // Connections props (from self to previous)
  let draw: Connections['draw']
  let from: HTMLElement[] = []
  let to: HTMLElement[] = []

  onMount(async () => {
    await tick()
    if (!direction || !scrollEl || !previousScrollEl) return
    const isForward = direction === 'forward'
    const containerFrom = isForward ? previousScrollEl : scrollEl
    const containerTo = isForward ? scrollEl : previousScrollEl
    from = isForward ? previousPortsEl : outputsEl.flat()
    to = isForward ? inputsEl.flat() : previousPortsEl

    if (!draw) return
    containerFrom.addEventListener('scroll', draw)
    containerTo.addEventListener('scroll', draw)
    return () => {
      containerFrom.removeEventListener('scroll', draw)
      containerTo.removeEventListener('scroll', draw)
    }
  })
</script>

<Connections
  bind:draw
  {from}
  {to}
  fromPosition="bottom"
  toPosition="top"
  drawOnResize
/>

{#if inputs.length && (!direction || direction === 'backward')}
  <svelte:self
    actions={inputs}
    direction="backward"
    previousScrollEl={scrollEl}
    previousPortsEl={inputsEl.flat()}
  />
{/if}

{#if actions.length}
  <div
    bind:this={scrollEl}
    class="flex items-center gap-2 p-2 overflow-auto scrollbar-hide"
    class:snap-x={$isMobile}
  >
    <div class="shrink-0 w-[45%]" />

    {#each actions as action, index}
      <Action
        {action}
        bind:inputsEl={inputsEl[index]}
        bind:outputsEl={outputsEl[index]}
        {scrollEl}
      />
    {/each}

    <div class="shrink-0 w-[45%]" />
  </div>
{/if}

{#if outputs.length && (!direction || direction === 'forward')}
  <svelte:self
    actions={outputs}
    direction="forward"
    previousScrollEl={scrollEl}
    previousPortsEl={outputsEl.flat()}
  />
{/if}

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* For IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
