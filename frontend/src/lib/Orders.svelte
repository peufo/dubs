<script lang="ts">
  import { mdiCheck } from '@mdi/js'

  import type { Order } from 'types'
  import Card from '$lib/material/Card.svelte'
  import OrderState from '$lib/OrderState.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import Icon from '$lib/material/Icon.svelte'
  import OrderItem from '$lib/OrderItem.svelte'

  export let orders: Order[]

  const formatDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format
  //
</script>

<Card title="Mes commandes" active>
  <div class="flex flex-col gap-2">
    {#each orders as order (order.id)}
      <Card class="border rounded px-4 py-2">
        <div slot="header" class="grow flex gap-2 items-start">
          <div>
            <h3 class="text-lg">
              {order.items.length} article{order.items.length > 1 ? 's' : ''}
            </h3>
            <span>{formatDate(new Date(order.createdAt))}</span>
          </div>
          <div class="ml-auto">
            <div class="flex">
              <OrderState state={order.stateOrder} class="ml-auto" />
            </div>
            <span
              class="flex gap-2"
              title={order.paymentOk ? 'Paiement enregistré' : 'Paiement du'}
            >
              {#if order.paymentOk}
                <Icon path={mdiCheck} size={20} />
              {/if}
              {formatAmount(order.amountDue)}
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          {#each order.items as item}
            <OrderItem {item} large />
          {/each}
        </div>
      </Card>
    {:else}
      <span>Aucune commande effectuée</span>
    {/each}
  </div>
</Card>
