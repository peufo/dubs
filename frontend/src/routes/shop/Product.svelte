<script lang="ts">
  import type { Product } from 'types'

  import logo from '$lib/assets/logo-borderless.png?w400&h=300&webp'
  import { formatAmount } from '$lib/utils/formatAmount'

  export let product: Product
</script>

<a href="/shop/{product.id}" class="group max-w-md">
  <div
    class="
    shadow-md border rounded
    bg-white border-secondary-dark/20 shadow-secondary-dark/80
    hover:shadow-2xl hover:shadow-secondary-dark hover:scale-105
    transition-all
  "
  >
    <div>
      <img
        src={logo}
        alt="Produit sans illustration"
        class="object-center h-full"
      />
    </div>

    <div class="py-2 px-4 flex">
      <div>
        <h4 class="text-xl">{product.name}</h4>
        {#if product.detail}
          <h5 class="text-secondary-dark">{product.detail}</h5>
        {/if}
      </div>
      <div class="ml-auto font-bold">
        {formatAmount(18)}
      </div>
    </div>
  </div>
</a>
