<script lang="ts">
  import { onMount } from 'svelte'

  import Connections from '$lib/molecule/connection/Connections.svelte'
  // import Connection from '$lib/molecule/connection/Connection.svelte'
  import { draggable } from '$lib/utils/draggable'

  let connections: Connections
  let containerFrom: HTMLDivElement
  let containerTo: HTMLDivElement
  let containerFrom2: HTMLDivElement
  let containerTo2: HTMLDivElement

  onMount(() => {
    const handleMove = () => connections.draw()

    containerFrom.addEventListener('move', handleMove)
    containerTo.addEventListener('move', handleMove)
    containerFrom2.addEventListener('move', handleMove)
    containerTo2.addEventListener('move', handleMove)
    return () => {
      containerFrom.removeEventListener('move', handleMove)
      containerTo.removeEventListener('move', handleMove)
      containerFrom2.removeEventListener('move', handleMove)
      containerTo2.removeEventListener('move', handleMove)
    }
  })
</script>

<Connections
  bind:this={connections}
  from={[containerFrom, containerFrom2]}
  to={[containerTo, containerTo2]}
  fromPosition="bottom"
  toPosition="top"
/>

<!--
  <Connection from={containerFrom} to={containerTo} />
-->

<div class="grid place-content-center h-[1200px] gap-10">
  <div bind:this={containerFrom} use:draggable class="container drop-shadow" />
  <div bind:this={containerTo} use:draggable class="container drop-shadow" />

  <div bind:this={containerFrom2} use:draggable class="container drop-shadow" />
  <div bind:this={containerTo2} use:draggable class="container drop-shadow" />
</div>

<style>
  .container {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    border: solid 1px rgb(198 117 0);
    background-color: rgba(255, 164, 0, 0.5);
  }
</style>
