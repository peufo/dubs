<script lang="ts">
  import type { PageData } from './$types'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import type { Order } from 'types'
  import { order } from '$lib/stores'
  import Product from './Product.svelte'

  export let data: PageData

  function handleNewOrderItem(newOrderItem: Order['items'][number]) {
    if (!data.session.user)
      return goto(`/profile?callback=${$page.url.pathname}`)
    if (!$order) {
      $order = {
        client: data.session.user.id,
      }
    }
    order.add(newOrderItem)
  }
</script>

<svelte:head>
  <title>Dubs • {data.product.name}</title>
</svelte:head>

<Product
  product={data.product}
  on:newOrderItem={({ detail }) => handleNewOrderItem(detail)}
/>
