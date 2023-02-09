<script lang="ts">
  import type { PageData } from './$types'
  import Product from './Product.svelte'

  export let data: PageData
</script>

<svelte:head>
  <title>Dubs • {data.product.name}</title>
</svelte:head>

<Product product={data.product} />
