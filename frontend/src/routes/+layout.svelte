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
      { label: 'process', href: '/process' },
      { label: 'admin', href: '/admin' },
      { label: 'labo', href: '/lab' },
    ]}
  />
</header>

<main class="p-3 min-h-screen">
  <slot />
</main>
