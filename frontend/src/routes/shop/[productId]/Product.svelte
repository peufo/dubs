<script lang="ts">
  import type { Product } from 'types'

  import Galery from '$lib/Galery.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'

  export let product: Product
</script>

<div class="flex gap-4 flex-wrap justify-center">
  <Galery images={product.images.map((_) => _.image)} />

  <div class="flex grow min-w-[320px] max-w-md">
    <div>
      <h4 class="text-3xl">{product.name}</h4>
      {#if product.detail}
        <h5 class="text-xl text-secondary-dark">{product.detail}</h5>
      {/if}
    </div>
    <div class="text-xl ml-auto font-bold">
      {formatAmount(product.price)}
    </div>
  </div>
</div>