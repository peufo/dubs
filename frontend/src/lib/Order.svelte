<script lang="ts">
  import { mdiCartOutline, mdiClose, mdiChevronDown } from '@mdi/js'
  import { fly, slide } from 'svelte/transition'
  import type { HttpError } from '@sveltejs/kit'
  import { goto } from '$app/navigation'

  import { api } from '$lib/api'
  import { order } from '$lib/stores'
  import Icon from '$lib/material/Icon.svelte'
  import Button from '$lib/material/Button.svelte'
  import IconButton from '$lib/material/IconButton.svelte'
  import OrderItem from '$lib/OrderItem.svelte'

  let active = true
  let error = ''

  $: active = !!$order

  async function handleSubmit() {
    try {
      if (!$order) return
      const cart = $order.cart?.map((row) => ({
        ...row,
        product: typeof row.product === 'string' ? row.product : row.product.id,
      }))
      await api.create('order', { ...$order, cart })
      $order = null
      goto('/profile')
    } catch (err) {
      error = (err as HttpError).body.message
    }
  }
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
        {#each $order.cart || [] as item, itemIndex}
          <OrderItem {item}>
            <IconButton
              on:click={() => order.delete(itemIndex)}
              size={22}
              title="Supprimer l'article"
              secondary
              path={mdiClose}
              class="hidden group-hover:block"
            />
          </OrderItem>
        {:else}
          <div class="text-center p-4">Panier vide</div>
        {/each}
      </div>

      {#if error}
        <div class="text-red-500 text-center">
          {@html error}
        </div>
      {/if}

      <div class="text-center p-2" transition:slide|local>
        {#if $order.cart && $order.cart.length}
          <Button primary class="py-1 w-full" on:click={handleSubmit}
            >Valider la commande</Button
          >
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
