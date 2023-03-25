<script lang="ts">
  import type { Order } from 'types'
  import { mdiClose } from '@mdi/js'

  import Image from '$lib/Image.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import { getVariablesValues } from '$lib/product'

  export let item: Order['cart'][number]
  //
</script>

{#if typeof item.product !== 'string'}
  <div class="flex gap-1 p-1 group hover:bg-secondary-light/25">
    <Image
      image={item.product.images[0].image}
      size="mini"
      class="w-10 h-10 rounded mt-1"
    />
    <div class="flex-grow">
      <div class="flex justify-between items-center">
        <h4 class="">{item.product.name}</h4>
        <span class="text-xs group-hover:hidden">
          {formatAmount(item.price)}
        </span>
      </div>
      <ul class="text-xs">
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
