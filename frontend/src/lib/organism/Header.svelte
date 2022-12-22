<script lang="ts">
  import Menu from '$lib/molecule/Menu.svelte'
</script>

<header class="fixed w-full h-0 flex p-2 z-10">
  <h3 class="text-4xl">Dubs apiculture</h3>

  <div class="flex-1" />

  <Menu
    items={[
      { label: 'labo', href: '/lab' },
      { label: 'edit', href: '/edit' },
      { label: 'admin', href: '/admin' },
    ]}
  />
</header>
