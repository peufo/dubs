<script lang="ts">
  import type { PageData } from './$types'

  import Title from '$lib/Title.svelte'
  import ProductList from './ProductList.svelte'

  export let data: PageData
</script>

<svelte:head>
  <meta name="description" content="Acheter notre miel de Coeuve." />
</svelte:head>

<Title subtitle="La boutique" />

<ProductList products={data.products} />
