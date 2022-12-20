<script lang="ts">
  import Hexagon from './Hexagon.svelte'
  import MenuLines from './MenuLines.svelte'

  export let open = false
</script>

<Hexagon
  on:click={() => (open = !open)}
  class="cursor-pointer hover:fill-primary-light"
>
  <MenuLines bind:open />
</Hexagon>
