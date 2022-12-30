<script lang="ts">
  import { headerSubtitle } from '$lib/stores'
  import Menu from '$lib/molecule/Menu.svelte'
</script>

<header class="fixed w-full h-0 flex p-4 z-10">
  <div>
    <h3 class="text-3xl">Dubs apiculture</h3>
    {#if $headerSubtitle}
      <h5>{$headerSubtitle}</h5>
    {/if}
  </div>

  <div class="flex-1" />

  <Menu
    items={[
      { label: 'boutique', href: '/shop' },
      { label: 'edit', href: '/edit' },
      { label: 'admin', href: '/admin' },
    ]}
  />
</header>
