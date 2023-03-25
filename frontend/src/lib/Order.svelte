<script lang="ts">
  import { mdiCartOutline, mdiClose } from '@mdi/js'

  import { order } from '$lib/stores'
  import Icon from '$lib/material/Icon.svelte'
  import Button from '$lib/material/Button.svelte'
  import IconButton from '$lib/material/IconButton.svelte'
  import Image from '$lib/Image.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import { getVariablesValues } from '$lib/product'
</script>

{#if $order}
  <section
    class="fixed right-4 bottom-4 w-60 h-80 border border-secondary-light bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
  >
    <div
      class="flex items-center gap-2 py-2 px-3 border-b border-secondary-light text-secondary-dark fill-secondary-dark"
    >
      <Icon path={mdiCartOutline} />
      <h2 class="text-xl">Panier</h2>
      <IconButton
        title="Annuler le panier"
        path={mdiClose}
        secondary
        class="ml-auto border border-secondary"
        on:click={() => ($order = null)}
      />
    </div>
    <div class="flex-grow flex flex-col py-1 overflow-auto">
      {#each $order.cart || [] as { product, price, options }, rowIndex}
        {#if typeof product !== 'string'}
          <div class="flex gap-1 p-1 group hover:bg-secondary-light/25">
            <Image
              image={product.images[0].image}
              size="mini"
              class="w-10 h-10 rounded mt-1"
            />
            <div class="flex-grow">
              <div class="flex justify-between items-center">
                <h4 class="">{product.name}</h4>
                <span class="text-xs group-hover:hidden">
                  {formatAmount(price)}
                </span>
              </div>
              <ul class="text-xs">
                {#each [...getVariablesValues(product.variables, options)] as [name, option]}
                  <li>
                    {name}
                    <b>
                      {option.value}
                    </b>
                  </li>
                {/each}
              </ul>
            </div>
            <IconButton
              on:click={() => order.delete(rowIndex)}
              size={22}
              title="Supprimer l'article"
              secondary
              path={mdiClose}
              class="hidden group-hover:block"
            />
          </div>
        {/if}
      {:else}
        <div class="text-center p-4">Panier vide</div>
      {/each}
    </div>

    <div class="text-center p-2">
      <Button primary class="py-1">Valider la commande</Button>
    </div>
  </section>
{/if}
