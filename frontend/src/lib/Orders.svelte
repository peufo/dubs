<script lang="ts">
  import type { Order } from 'types'
  import Card from '$lib/material/Card.svelte'

  export let orders: Order[]
  //
</script>

<Card title="Mes commandes" active>
  {#each orders as order}
    <div>{order.createdAt}</div>
  {:else}
    <span>Aucune commande effectuée</span>
  {/each}
</Card>
