<script lang="ts">
  import type { Product } from 'types'

  import Galery from '$lib/Galery.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import { serialize } from '$lib/utils/serializeSlate'

  export let product: Product

  let stateLabel: Record<Product['state'], string> = {
    draft: 'Brouillon',
    comingSoon: 'Bientôt disponible',
    available: '',
    notAvailable: 'Non disponible',
    archived: 'Archiver',
  }
</script>

<div class="flex gap-8 flex-wrap justify-center">
  <Galery images={product.images.map((_) => _.image)} />

  <div class="flex flex-col gap-4 grow min-w-[320px] max-w-md">
    <div class="flex">
      <div>
        <h4 class="text-3xl">{product.name}</h4>
        {#if product.detail}
          <h5 class="text-xl text-secondary-dark">{product.detail}</h5>
        {/if}
      </div>
    </div>

    <section class="grow">
      {@html serialize(product.description)}
    </section>

    {#each product.variables as variable}
      <section>
        <h5 class="text-xl">{variable.blockName || 'Options'}</h5>
        <div class="flex gap-4 pt-1">
          {#each variable.options as option}
            <div
              class="border px-4 py-2 rounded cursor-pointer"
              class:opacity-40={!option.available}
              class:cursor-not-allowed={!option.available}
            >
              {option.value}
            </div>
          {/each}
        </div>
      </section>
    {/each}

    <div class="flex items-center gap-4">
      <div class="text-xl font-bold">
        {formatAmount(product.price)}
      </div>

      <div class="grow text-right">
        {stateLabel[product.state]}
      </div>

      <div
        class="
          rounded py-2 px-4 uppercase 
          bg-primary-light text-primary-dark
          shadow transition-shadow
          {product.state === 'available'
          ? 'hover:shadow-lg cursor-pointer'
          : 'cursor-not-allowed opacity-60'}
        "
      >
        Commander
      </div>
    </div>
  </div>
</div>
