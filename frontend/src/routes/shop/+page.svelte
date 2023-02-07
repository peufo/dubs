<script lang="ts">
  import type { PageData } from './$types'

  import Title from '$lib/Title.svelte'
  import Product from './Product.svelte'

  export let data: PageData
</script>

<svelte:head>
  <meta name="description" content="Acheter notre miel de Coeuve." />
</svelte:head>

<Title subtitle="La boutique" />

<div
  class="
    mx-auto my-10 px-2 max-w-5xl gap-x-4 gap-y-8
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center
  "
>
  {#each data.products.docs as product}
    <Product {product} />
  {/each}
</div>
