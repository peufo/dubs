<script lang="ts">
  import type { Product, PaginatedDocs } from 'types'

  import logo from '$lib/assets/logo-borderless.png?w400&h=300&webp'
  import { formatAmount } from '$lib/utils/formatAmount'
  import Image from '$lib/Image.svelte'

  export let products: PaginatedDocs<Product>
</script>

<div class="flex flex-wrap justify-center items-stretch gap-x-6 gap-y-8">
  {#each products.docs as product}
    <a
      href="/shop/{product.id}"
      class="group min-w-[220px] max-w-[300px] h-full"
    >
      <div
        class="
          shadow border rounded-md overflow-hidden
          bg-white border-secondary-dark/20 shadow-secondary-dark/80
          hover:shadow-2xl hover:shadow-secondary-dark hover:scale-[1.015]
          transition-all
        "
      >
        <Image
          image={product.images[0]?.image}
          size="card"
          placeholder={logo}
          class="h-72 object-cover"
        />

        <div class="py-2 px-4 flex">
          <div>
            <h4 class="text-xl">{product.name}</h4>
            {#if product.detail}
              <h5 class="text-secondary-dark">{product.detail}</h5>
            {/if}
          </div>
          <div class="ml-auto font-bold">
            {formatAmount(product.price)}
          </div>
        </div>
      </div>
    </a>
  {/each}
</div>
