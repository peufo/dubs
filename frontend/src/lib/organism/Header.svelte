<script lang="ts">
  import Hexagon from '$lib/atom/svg/Hexagon.svelte'
  import MenuButton from '$lib/atom/svg/MenuButton.svelte'
  import Svg from '$lib/atom/svg/Svg.svelte'
</script>

<header class="fixed w-full h-0 flex p-2 z-10">
  <div class="flex-1" />

  <Svg>
    <MenuButton />
  </Svg>
  <!--

  <Menu size={52} client:load buttons={[
    {label: 'labo', href: '/lab'},
    {label: 'edit', href: '/edit'},
    {label: 'admin', href: '/admin'},
    {label: 'admin', href: '/admin'},
    {label: 'admin', href: '/admin'},
  ]
    } />
  -->
</header>
