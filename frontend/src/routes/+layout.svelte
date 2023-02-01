<script lang="ts">
  import '../app.css'
  import Menu from '$lib/Menu.svelte'

  import Watermark from '$lib/material/Watermark.svelte'
</script>

<header>
  <Menu
    items={[
      { label: 'boutique', href: '/shop' },
      { label: 'processus', href: '/process' },
      { label: 'admin', href: '/admin', external: true },
    ]}
  />
</header>

<main class="min-h-screen">
  <Watermark />
  <slot />
</main>
