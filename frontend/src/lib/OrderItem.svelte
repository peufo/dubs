<script lang="ts">
  import type { Order } from 'types'

  import Image from '$lib/Image.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'

  export let item: Order['items'][number]
  export let hover = false
  export let large = false
</script>

{#if typeof item.product !== 'string'}
  <div
    class="flex gap-2 p-1 group {hover ? 'hover:bg-secondary-light/25' : ''}"
    class:text-xs={!large}
    class:text-sm={large}
  >
    <Image
      image={item.product.images && item.product.images[0]?.image}
      size="mini"
      class="rounded mt-1 {large ? 'w-16 h-16' : 'w-10 h-10 '}"
    />
    <div class="flex-grow" class:text-xs={!large} class:text-sm={large}>
      <h4 class:text-base={!large} class:text-lg={large}>
        {item.product.name}
      </h4>
      <ul>
        {#each item.options as { name, value }}
          <li>
            {name}
            <b>{value}</b>
          </li>
        {/each}
      </ul>
    </div>
    <div class="text-right">
      <b class="block">{formatAmount(item.price)}</b>

      <slot>
        {item.quantity} pièce{item.quantity > 1 ? 's' : ''}
      </slot>
    </div>
  </div>
{/if}
