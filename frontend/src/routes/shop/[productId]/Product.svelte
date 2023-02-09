<script lang="ts">
  import type { Product } from 'types'
  import { page } from '$app/stores'
  import { afterNavigate } from '$app/navigation'

  import Galery from '$lib/Galery.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import { serialize } from '$lib/utils/serializeSlate'
  import { useGotoQuery } from '$lib/utils/gotoQuery'

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
      return +($page.url.searchParams.get(key) || v.defaultOption || 0)
    })

  let variables: number[] = getVariables()
  afterNavigate(() => (variables = getVariables()))
  $: gotoQuery = useGotoQuery($page)
  $: price =
    (product.price || 0) +
    product.variables.reduce(
      (acc, { options }, i) => acc + options[variables[i]]?.price || 0,
      0
    )
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
              on:click={() => gotoQuery({ [getKey(i)]: optIndex.toString() })}
              class="border px-4 py-2 rounded shrink-0 bg-white disabled:opacity-40"
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
        {formatAmount(price)}
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
