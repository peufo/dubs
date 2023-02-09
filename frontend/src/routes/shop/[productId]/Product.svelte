<script lang="ts">
  import type { Product } from 'types'
  import { page } from '$app/stores'
  import { goto, afterNavigate } from '$app/navigation'
  import { browser } from '$app/environment'

  import Galery from '$lib/Galery.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import { serialize } from '$lib/utils/serializeSlate'
  import { updateQS } from '$lib/utils/updateQS'
  import { query } from '$lib/stores'

  export let product: Product

  let stateLabel: Record<Product['state'], string> = {
    draft: 'Brouillon',
    comingSoon: 'Bientôt disponible',
    available: '',
    notAvailable: 'Non disponible',
    archived: 'Archiver',
  }

  const getKey = (index: number) => `variable_${index}`
  const getVariables = () =>
    product.variables.map((v, index) => {
      const key = getKey(index)
      if (typeof $query[key] === 'string') return +($query[key] as string)
      return v.defaultOption || 0
    })

  let variables: number[] = getVariables()
  afterNavigate(() => (variables = getVariables()))
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

    {#each product.variables as variable, i}
      <section>
        <h5 class="text-xl pb-1">{variable.blockName || 'Options'}</h5>
        <div class="flex gap-x-4 gap-y-2 flex-wrap">
          {#each variable.options as option, optIndex}
            <button
              on:click={() =>
                goto(updateQS($page.url, getKey(i), optIndex), {
                  replaceState: true,
                })}
              class="border px-4 py-2 rounded shrink-0 disabled:opacity-40"
              disabled={!option.available}
              class:outline={variables[i] === optIndex}
              class:outline-secondary-light={variables[i] === optIndex}
            >
              {option.value}
            </button>
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

      <button
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
      </button>
    </div>
  </div>
</div>
