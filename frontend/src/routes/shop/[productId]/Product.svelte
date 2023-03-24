<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { page } from '$app/stores'
  import type { PageData } from './$types'
  import { afterNavigate } from '$app/navigation'

  import type { Product, Order } from 'types'

  import Galery from '$lib/Galery.svelte'
  import { formatAmount } from '$lib/utils/formatAmount'
  import { serialize } from '$lib/utils/serializeSlate'
  import { useGotoQuery } from '$lib/utils/gotoQuery'

  export let product: Product

  const dispatch = createEventDispatcher<{ newOrder: Order['cart'][number] }>()

  let stateLabel: Record<Product['state'], string> = {
    draft: 'Brouillon',
    comingSoon: 'Bientôt disponible',
    available: '',
    notAvailable: 'Non disponible',
    archived: 'Archiver',
  }

  const getVariableKey = (index: number) => `variable_${index}`
  const getVariableValues = () =>
    product.variables.map((v, index) => {
      const key = getVariableKey(index)
      return (
        $page.url.searchParams.get(key) || v.options[v.defaultOption].id || ''
      )
    })

  let optionsId: string[] = getVariableValues()
  afterNavigate(() => (optionsId = getVariableValues()))
  $: gotoQuery = useGotoQuery($page)
  $: price =
    (product.price || 0) +
    product.variables.reduce((acc, { options }, i) => {
      const option = options.find(({ id }) => id === optionsId[i])
      return acc + (option?.price || 0)
    }, 0)

  function handleNewOrder() {
    dispatch('newOrder', {
      product,
      price,
      unitPrice: price,
      quantity: 1,
      variables: product.variables,
    })
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

    {#each product.variables as variable, i}
      <section>
        <h5 class="text-xl pb-1">{variable.blockName || 'Options'}</h5>
        <div class="flex gap-x-4 gap-y-2 flex-wrap">
          {#each variable.options as option}
            <button
              on:click={() => gotoQuery({ [getVariableKey(i)]: option.id })}
              class="border px-4 py-2 rounded shrink-0 bg-white disabled:opacity-40"
              disabled={!option.available}
              class:outline={optionsId[i] === option.id}
              class:outline-secondary-light={optionsId[i] === option.id}
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
        on:click={handleNewOrder}
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
