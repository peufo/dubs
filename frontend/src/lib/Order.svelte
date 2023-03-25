<script lang="ts">
  import { mdiCartOutline, mdiClose, mdiChevronDown } from '@mdi/js'
  import { fly, slide } from 'svelte/transition'

  import { order } from '$lib/stores'
  import Icon from '$lib/material/Icon.svelte'
  import Button from '$lib/material/Button.svelte'
  import IconButton from '$lib/material/IconButton.svelte'
  import Image from '$lib/Image.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import { getVariablesValues } from '$lib/product'

  let active = true

  $: active = !!$order
</script>

{#if $order}
  <section
    transition:fly|local={{ y: 300 }}
    class="
        fixed w-72 max-h-96 bottom-2 left-1/2 -translate-x-1/2
        border border-secondary-light bg-white
        rounded-lg shadow-lg overflow-hidden
        flex flex-col
      "
  >
    <div
      on:click={() => (active = true)}
      on:keyup={() => (active = true)}
      class="
        flex items-center gap-2 py-2 px-3
      text-secondary-dark fill-secondary-dark
        {active ? '' : 'cursor-pointer hover:bg-secondary-light/30'}
      "
    >
      <Icon path={mdiCartOutline} />
      <h2 class="text-xl">Panier</h2>
      {#if active}
        <IconButton
          title="Cacher le panier"
          path={mdiChevronDown}
          secondary
          class="ml-auto border border-secondary"
          on:click={(e) => {
            e.stopPropagation()
            active = false
          }}
        />
      {/if}
    </div>
    {#if active}
      <div
        class="flex-grow flex flex-col py-1 overflow-auto border-t border-secondary-light"
        transition:slide|local
      >
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

      <div class="text-center p-2" transition:slide|local>
        {#if $order.cart && $order.cart.length}
          <Button primary class="py-1 w-full">Valider la commande</Button>
        {:else}
          <Button
            secondary
            class="py-1 w-full"
            on:click={() => ($order = null)}
          >
            Fermer
          </Button>
        {/if}
      </div>
    {/if}
  </section>
{/if}
