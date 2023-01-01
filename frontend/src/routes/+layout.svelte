<script lang="ts">
  import { fade } from 'svelte/transition'
  import { page } from '$app/stores'
  import '../app.css'
  import Menu from '$lib/molecule/Menu.svelte'
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

{#key $page}
  <main class="p-3 min-h-screen" in:fade>
    <slot />
  </main>
{/key}
