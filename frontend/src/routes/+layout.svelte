<script lang="ts">
  import '../app.css'
  import Menu from '$lib/molecule/Menu.svelte'
</script>

<header>
  <Menu
    items={[
      { label: 'boutique', href: '/shop' },
      { label: 'edit', href: '/edit' },
      { label: 'admin', href: '/admin' },
    ]}
  />
</header>

<main class="p-3 min-h-screen">
  <slot />
</main>
