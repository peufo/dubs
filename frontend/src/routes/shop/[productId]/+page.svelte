<script lang="ts">
  import type { PageData } from './$types'
  import Product from './Product.svelte'

  export let data: PageData
</script>

<Product product={data.product} />
