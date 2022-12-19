<script lang="ts">
  import Hexagon from './Hexagon.svelte'
  import MenuLines from './MenuLines.svelte'

  export let open = false
  let menuLines: MenuLines
</script>

<Hexagon on:click={() => menuLines.toggleOpen()} class="cursor-pointer">
  <MenuLines bind:open bind:this={menuLines} />
</Hexagon>
