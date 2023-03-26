<script lang="ts">
  import type { Order } from 'types'
  import { mdiClose } from '@mdi/js'

  import Image from '$lib/Image.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import { getVariablesValues } from '$lib/product'

  export let item: Order['items'][number]
  export let hover = false
  export let large = false
</script>

{#if typeof item.product !== 'string'}
  <div
    class="flex gap-2 p-1 group {hover ? 'hover:bg-secondary-light/25' : ''} "
  >
    <Image
      image={item.product.images && item.product.images[0]?.image}
      size="mini"
      class="rounded mt-1 {large ? 'w-16 h-16' : 'w-10 h-10 '}"
    />
    <div class="flex-grow" class:text-xs={!large} class:text-sm={large}>
      <div class="flex justify-between items-center">
        <h4 class:text-base={!large} class:text-lg={large}>
          {item.product.name}
        </h4>
        <span class={hover ? 'group-hover:hidden' : ''}>
          {formatAmount(item.price)}
        </span>
      </div>
      <ul>
        {#each [...getVariablesValues(item.product.variables, item.options)] as [name, option]}
          <li>
            {name}
            <b>
              {option.value}
            </b>
          </li>
        {/each}
      </ul>
    </div>
    <slot />
  </div>
{/if}
