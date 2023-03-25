<script lang="ts">
  import type { Order } from 'types'
  import Card from '$lib/material/Card.svelte'
  import OrderState from '$lib/OrderState.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import Icon from '$lib/material/Icon.svelte'
  import { mdiCheck, mdiClockTimeTenOutline } from '@mdi/js'

  export let orders: Order[]

  const formatDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format
  //
</script>

<Card title="Mes commandes" active>
  <div class="flex flex-col gap-2">
    {#each orders as order}
      <Card
        class="border rounded px-4 py-2"
        title="{order.cart.length} article{order.cart.length > 1
          ? 's'
          : ''} le {formatDate(new Date(order.createdAt))}"
        active
      >
        <div slot="header" class="grow flex gap-2">
          <h3 class="text-lg">
            {order.cart.length} article{order.cart.length > 1 ? 's' : ''}
            le {formatDate(new Date(order.createdAt))}
          </h3>
          <div class="ml-auto">
            <OrderState state={order.stateOrder} />
          </div>
        </div>
        <div class="flex gap-2">
          <b>{formatAmount(order.amountDue)}</b>
          <div class="border rounded px-2 flex gap-2">
            {#if order.paymentOk}
              Paiement effectué <Icon path={mdiCheck} size={20} />
            {:else}
              Paiement dû <Icon path={mdiClockTimeTenOutline} size={20} />
            {/if}
          </div>
        </div>
      </Card>
    {:else}
      <span>Aucune commande effectuée</span>
    {/each}
  </div>
</Card>
