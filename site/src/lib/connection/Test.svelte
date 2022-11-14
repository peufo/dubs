<script lang="ts">
  import { draggable } from '$lib/utils/draggable'

  let containerFrom: HTMLDivElement
  let containerTo: HTMLDivElement
</script>

<div class="grid place-content-center h-screen gap-10">
  <div bind:this={containerFrom} use:draggable class="container drop-shadow" />
  <div bind:this={containerTo} use:draggable class="container drop-shadow" />
</div>

<style>
  .container {
    width: 60px;
    height: 60px;
    border: solid 1px rgb(198 117 0);
    border-radius: 4px;
    background-color: rgb(255 164 0);
  }
</style>
