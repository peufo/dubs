<script lang="ts">
  import type { PageData } from './$types'

  import ProductList from './ProductList.svelte'

  export let data: PageData
</script>

<ProductList products={data.products} />
