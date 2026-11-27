<script lang="ts">
  import {
    mdiCartOutline,
    mdiClose,
    mdiChevronDown,
    mdiPlus,
    mdiMinus,
    mdiTrashCanOutline,
  } from "@mdi/js";
  import { fly, slide } from "svelte/transition";
  import type { HttpError } from "@sveltejs/kit";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import { api } from "$lib/api";
  import { order } from "$lib/stores";
  import Icon from "$lib/material/Icon.svelte";
  import Button from "$lib/material/Button.svelte";
  import IconButton from "$lib/material/IconButton.svelte";
  import OrderItem from "$lib/OrderItem.svelte";
  import { formatAmount } from "./utils/formatAmount";
  import { getDeliveryModes, getShippingFee } from "./shipping";
  import type { Order, Shop } from "types";

  export let shop: Shop;

  let active = true;
  let error = "";
  let isLoading = false;

  const deliveryLabels: Record<Order["delivery"], string> = {
    pickup: "Retrait sur place",
    shipping: "Livraison",
  };

  $: active = !!$order;
  $: modes = getDeliveryModes(shop);
  $: delivery =
    $order?.delivery && modes.includes($order.delivery)
      ? $order.delivery
      : modes[0] || "pickup";
  $: subtotal = ($order?.items || []).reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  $: shippingFee = getShippingFee(shop, delivery, subtotal);
  $: total = subtotal + shippingFee;
  $: freeFrom = shop.shipping?.freeFrom;
  $: missingForFree =
    delivery === "shipping" && typeof freeFrom === "number" && shippingFee
      ? freeFrom - subtotal
      : 0;

  $: user = $page.data.session?.user;
  $: hasAddress = !!(user?.street && user?.zipCode && user?.city);
  $: needsAddress = delivery === "shipping" && !hasAddress;

  function setDelivery(value: Order["delivery"]) {
    if ($order) $order = { ...$order, delivery: value };
  }

  async function handleSubmit() {
    try {
      if (!$order || isLoading || needsAddress) return;
      isLoading = true;
      const items = $order.items?.map((row) => ({
        ...row,
        product: typeof row.product === "string" ? row.product : row.product.id,
      }));
      await api.create("order", {
        ...$order,
        items,
        delivery,
        shippingFee,
        amountDue: total,
      });
      isLoading = false;
      $order = null;
      goto("/profile", { invalidateAll: true });
    } catch (err) {
      error = (err as HttpError).body.message;
    } finally {
      isLoading = false;
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
      <div class="grow" />
      <span class="ml-auto">{formatAmount(total)}</span>
      {#if active}
        <IconButton
          title="Cacher le panier"
          path={mdiChevronDown}
          secondary
          class="border border-secondary"
          on:click={(e) => {
            e.stopPropagation();
            active = false;
          }}
        />
      {/if}
    </div>
    {#if active}
      <div
        class="flex-grow flex flex-col py-1 overflow-auto border-t border-secondary-light"
        transition:slide|local
      >
        {#each $order.items || [] as item, itemIndex}
          <OrderItem {item} hover>
            <div
              class="
                flex items-center justify-end gap-x-1
                border border-secondary-light rounded-full
                mt-1
                "
            >
              <IconButton
                on:click={() => order.setQuantity(itemIndex, item.quantity - 1)}
                size={16}
                title="Retirer"
                secondary
                path={item.quantity > 1 ? mdiMinus : mdiTrashCanOutline}
                class=""
              />

              <input
                type="number"
                bind:value={item.quantity}
                on:input={() => order.refresh()}
                max="9999"
                min="0"
                class="bg-transparent font-bold w-6 text-center"
              />

              <IconButton
                on:click={() => order.setQuantity(itemIndex, item.quantity + 1)}
                size={16}
                title="Ajouter"
                secondary
                path={mdiPlus}
                class=""
              />
            </div>
          </OrderItem>
        {:else}
          <div class="text-center p-4">Panier vide</div>
        {/each}
      </div>

      {#if $order.items && $order.items.length}
        <div
          class="flex flex-col gap-1 px-3 py-2 text-sm border-t border-secondary-light"
        >
          {#if modes.length > 1}
            <div class="flex gap-3">
              {#each modes as mode}
                <label class="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value={mode}
                    checked={delivery === mode}
                    on:change={() => setDelivery(mode)}
                  />
                  {deliveryLabels[mode]}
                </label>
              {/each}
            </div>
          {:else}
            <span>{deliveryLabels[delivery]}</span>
          {/if}

          {#if delivery === "shipping"}
            <div class="flex">
              <span>Frais de livraison</span>
              <span class="ml-auto">
                {shippingFee ? formatAmount(shippingFee) : "Offerts"}
              </span>
            </div>
            {#if missingForFree > 0}
              <span class="text-xs text-secondary-dark">
                Plus que {formatAmount(missingForFree)} pour la livraison offerte
              </span>
            {/if}
            {#if needsAddress}
              <a
                href="/profile?address"
                class="text-xs text-red-600 underline"
              >
                Ajoutez votre adresse dans votre profil pour être livré
              </a>
            {:else if user}
              <span class="text-xs text-secondary-dark">
                Livraison à : {user.street}, {user.zipCode}
                {user.city}
              </span>
            {/if}
          {/if}
        </div>
      {/if}

      {#if error}
        <div class="text-red-500 text-center">
          {@html error}
        </div>
      {/if}

      <div class="text-center p-2" transition:slide|local>
        {#if $order.items && $order.items.length}
          <Button
            primary
            class="py-1 w-full {isLoading || needsAddress ? 'opacity-50' : ''}"
            disabled={isLoading || needsAddress}
            on:click={handleSubmit}
          >
            Valider la commande
          </Button>
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

<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
