<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { afterNavigate } from '$app/navigation'

  import type { Action as IAction, Port } from 'types'
  import Action from '$lib/molecule/Action.svelte'
  import Connections from '$lib/molecule/connection/Connections.svelte'
  import { isMobile } from '$lib/stores'

  export let actions: IAction[]
  export let direction: 'forward' | 'backward' | undefined = undefined
  export let previousScrollEl: HTMLElement | undefined = undefined
  export let previousPortsEl: HTMLElement[] = []

  $: isForward = direction === 'forward'

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
  // Prevent collision
  let fromStraight: number[] = []
  let toStraight: number[] = []

  afterNavigate(updatePorts)
  onMount(async () => {
    await tick()
    placeScrollCenter()
    if (!direction || !scrollEl || !previousScrollEl) return

    const containerFrom = isForward ? previousScrollEl : scrollEl
    const containerTo = isForward ? scrollEl : previousScrollEl

    if (!draw) return
    containerFrom.addEventListener('scroll', draw)
    containerTo.addEventListener('scroll', draw)
    return () => {
      containerFrom.removeEventListener('scroll', draw)
      containerTo.removeEventListener('scroll', draw)
    }
  })

  function updatePorts() {
    if (!previousScrollEl) return
    from = isForward ? previousPortsEl : outputsEl.flat()
    to = isForward ? inputsEl.flat() : previousPortsEl
    const rect = scrollEl.getBoundingClientRect()
    const previousRect = previousScrollEl.getBoundingClientRect()
    const { bottom } = isForward ? previousRect : rect
    const { top } = isForward ? rect : previousRect
    fromStraight = from.map((el) => bottom - el.getBoundingClientRect().bottom)
    toStraight = to.map((el) => el.getBoundingClientRect().top - top)
  }

  function placeScrollCenter() {
    if (!scrollEl) return
    const left = (scrollEl.scrollWidth - scrollEl.offsetWidth) / 2
    scrollEl.scrollTo({ left, behavior: 'smooth' })
  }
</script>

<Connections
  bind:draw
  {from}
  {to}
  fromPosition="bottom"
  toPosition="top"
  drawOnResize
  {fromStraight}
  {toStraight}
  curveIntensity={1}
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
    class="flex items-center gap-3 p-2 overflow-auto scrollbar-hide snap-mandatory md:snap-none"
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
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
