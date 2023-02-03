<script lang="ts">
  import type { LayoutData } from './$types'
  import '../app.css'
  import Menu from '$lib/Menu.svelte'
  import Footer from '$lib/Footer.svelte'

  import Watermark from '$lib/material/Watermark.svelte'

  export let data: LayoutData
</script>

<div class="min-h-screen flex flex-col">
  <header>
    <Menu
      items={[
        { label: 'boutique', href: '/shop' },
        { label: 'processus', href: '/process' },
        { label: 'admin', href: '/admin', external: true },
      ]}
    />
  </header>

  <main class="grow">
    <Watermark />
    <slot />
  </main>

  <Footer links={data.links} />
</div>
