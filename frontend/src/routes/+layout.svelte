<script lang="ts">
  import type { LayoutData } from './$types'
  import '../app.css'
  import Footer from './Footer.svelte'
  import Menu from '$lib/Menu.svelte'
  import Order from '$lib/Order.svelte'

  import Watermark from '$lib/material/Watermark.svelte'

  export let data: LayoutData
  data.session?.user
</script>

<div class="min-h-screen flex flex-col">
  <header>
    <Menu
      items={[
        { label: data.session?.user?.name || 'Connexion', href: '/profile' },
        { label: 'fabrication', href: '/process' },
        { label: 'boutique', href: '/shop' },
        { label: 'admin', href: '/admin', external: true },
      ]}
    />
  </header>

  <main class="grow">
    <Watermark />
    <slot />
  </main>

  <Footer links={data.links || []} />
</div>

<Order />
