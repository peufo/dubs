<script lang="ts">
  import '../app.css'
  import Menu from '$lib/Menu.svelte'

  import Watermark from '$lib/material/Watermark.svelte'
</script>

<header>
  <Menu
    items={[
      { label: 'boutique', href: '/shop' },
      { label: 'process', href: '/process' },
      { label: 'admin', href: '/admin', external: true },
      { label: 'labo', href: '/lab' },
    ]}
  />
</header>

<main class="min-h-screen">
  <Watermark />
  <slot />
</main>
