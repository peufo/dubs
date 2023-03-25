<script lang="ts">
  import { order } from '$lib/stores'
  import { mdiCartOutline, mdiClose } from '@mdi/js'
  import Icon from '$lib/material/Icon.svelte'
  import Button from '$lib/material/Button.svelte'
  import IconButton from './material/IconButton.svelte'
</script>

{#if $order}
  <section
    class="fixed right-4 bottom-4 w-60 h-72 border border-secondary-light bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
  >
    <div
      class="flex items-center gap-2 py-2 px-3 border-b border-secondary-light text-secondary-dark fill-secondary-dark"
    >
      <Icon path={mdiCartOutline} />
      <h2 class="text-xl">Panier</h2>
      <IconButton
        path={mdiClose}
        class="ml-auto border border-secondary"
        on:click={() => ($order = null)}
      />
    </div>
    <div class="flex-grow">
      {#each $order.cart || [] as row}
        {#if typeof row.product !== 'string'}
          <div>
            {row.quantity}
            {row.product.name}
          </div>
        {/if}
      {/each}
    </div>

    <div class="text-center p-2">
      <Button primary>Valider la commande</Button>
    </div>
  </section>
{/if}
