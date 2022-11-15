<script lang="ts">
  import { onMount } from 'svelte'

  import { draggable } from '$lib/utils/draggable'
  import Connection from '$lib/connection/Connection.svelte'

  let connection: Connection
  let containerFrom: HTMLDivElement
  let containerTo: HTMLDivElement
  onMount(() => {
    const handleMove = () => connection.draw()
    containerFrom.addEventListener('move', handleMove)
    containerTo.addEventListener('move', handleMove)
    return () => {
      containerFrom.removeEventListener('move', handleMove)
      containerTo.removeEventListener('move', handleMove)
    }
  })
</script>

{#if containerTo && containerTo}
  <Connection
    bind:this={connection}
    from={containerFrom}
    to={containerTo}
    fromPosition="bottom"
    toPosition="top"
  />
{/if}

<div class="grid place-content-center h-screen gap-10">
  <div bind:this={containerFrom} use:draggable class="container drop-shadow" />
  <div bind:this={containerTo} use:draggable class="container drop-shadow" />
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
