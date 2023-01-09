<script lang="ts">
  import { page } from '$app/stores'
  import '../app.css'
  import Menu from '$lib/molecule/Menu.svelte'

  $: console.log($page)
</script>

<header>
  <Menu
    items={[
      { label: 'boutique', href: '/shop' },
      { label: 'edit', href: '/edit' },
      { label: 'labo', href: '/lab' },
      { label: 'admin', href: '/admin' },
    ]}
  />
</header>

<main class="p-3 min-h-screen">
  <slot />
</main>
