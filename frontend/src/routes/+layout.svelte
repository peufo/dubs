<script lang="ts">
  import '../app.css'
  import Menu from '$lib/molecule/Menu.svelte'
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

<main class="p-3 min-h-screen">
  <slot />
</main>
