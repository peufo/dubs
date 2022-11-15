<script lang="ts">
  import { draggable } from '$lib/utils/draggable'
  import Connection from '$lib/connection/Connection.svelte'

  let connection: Connection
  let containerFrom: HTMLDivElement
  let containerTo: HTMLDivElement
</script>

{#if containerTo && containerTo}
  <Connection bind:this={connection} from={containerFrom} to={containerTo} />
{/if}

<div class="grid place-content-center h-screen gap-10">
  <div
    bind:this={containerFrom}
    use:draggable
    on:move={() => connection?.draw()}
    class="container drop-shadow"
  />
  <div
    bind:this={containerTo}
    use:draggable
    on:move={() => connection?.draw()}
    class="container drop-shadow"
  />
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
