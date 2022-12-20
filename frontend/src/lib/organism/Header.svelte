<script lang="ts">
  import Hexagon from '$lib/atom/svg/Hexagon.svelte'
  import MenuButton from '$lib/atom/svg/MenuButton.svelte'
  import Menu from '$lib/molecule/Menu.svelte'
  import Svg from '$lib/atom/svg/Svg.svelte'
</script>

<header class="fixed w-full h-0 flex p-2 z-10">
  <a href="/lab">Labo</a>

  <Svg width={1000} height={1000}>
    <!-- A link around a shape -->
    <circle cx="50" cy="40" r="35" />
    <a href="/docs/Web/SVG/Element/circle">
      <circle cx="50" cy="40" r="35" />
    </a>

    <!-- A link around a text -->
    <a href="/docs/Web/SVG/Element/text">
      <text x="50" y="90" text-anchor="middle">&lt;circle&gt;</text>
    </a>
  </Svg>

  <div class="flex-1" />

  <Menu
    items={[
      { label: 'labo', href: '/lab' },
      { label: 'edit', href: '/edit' },
      { label: 'admin', href: '/admin' },
    ]}
  />
</header>
