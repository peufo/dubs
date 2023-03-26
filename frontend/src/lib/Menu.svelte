<script lang="ts">
  import { beforeNavigate } from '$app/navigation'
  import { browser } from '$app/environment'

  import { isLargeScreen } from '$lib/stores'
  import type { FaceIndex, HexagonSide } from '$lib/material/svg/types'
  import Svg from '$lib/material/svg/Svg.svelte'
  import Hexagon from '$lib/material/svg/Hexagon.svelte'
  import MenuLines from '$lib/material/svg/MenuLines.svelte'
  import ClickOutside from '$lib/material/ClickOutside.svelte'

  type MenuItem = {
    label: string
    href: string
    icon?: string
    external?: boolean
  }

  export let items: MenuItem[] = []
  export let size = 50
  let open = false

  beforeNavigate(() => {
    open = false
  })

  function drawPatern(
    patern: FaceIndex[],
    next: HexagonSide[] = [],
    index = 0
  ): HexagonSide {
    const isLast = index === patern.length - 1
    const sides = isLast ? next : [drawPatern(patern, next, index + 1)]
    return { face: patern[index], sides }
  }

  function repeat(nb: number, patern: FaceIndex[]): HexagonSide {
    if (nb === 1) return drawPatern(patern)
    return drawPatern(patern, [repeat(nb - 1, patern)])
  }

  function drawItem(item: MenuItem): HexagonSide {
    return {
      ...item,
      face: 3,
      sides: [
        {
          face: 2,
          sides: [drawPatern([3, 2, 4])],
        },
        { face: 3 },
      ],
    }
  }

  function nextItem(items: MenuItem[]) {
    const [next, next2, ...rest] = items
    const drawNext: HexagonSide[] = []
    if (next) drawNext.push({ face: 3, sides: [drawItem(next)] })
    if (next2) {
      const drawRest = [drawItem(next2)]
      if (rest) drawRest.push(nextItem(rest))
      drawNext.push(
        drawPatern([5, 3], [{ face: 3 }, drawPatern([5, 3], drawRest)])
      )
    }

    // Add special ending to the patern
    if (!next && !next2) drawNext.push(drawPatern([5, 3, 2, 3, 2]))
    if (next && !next2) drawNext.push(drawPatern([5, 3, 5, 3, 2, 3, 3, 2]))

    return drawPatern([5, 3], drawNext)
  }

  let sides: HexagonSide[] = []
  $: sides = [
    { face: 3, sides: [repeat(2, [2, 3])] },
    {
      face: 4,
      sides: [drawItem(items[0]), nextItem(items.slice(1))],
    },
    { face: 0, permanent: true },
    { face: 1, permanent: true },
    { face: 2, permanent: true, sides: [{ face: 2, permanent: true }] },
    { face: 5, permanent: true },
  ]

  $: console.log({ $isLargeScreen, open })
</script>

<ClickOutside on:click_outside={() => (open = false)}>
  <Svg {size} class="fixed right-2 top-2 z-10">
    {#if $isLargeScreen}
      <Hexagon open gap={150} {sides} />
    {:else}
      <Hexagon
        on:click={() => (open = !open)}
        {open}
        class="hover:fill-primary-light cursor-pointer"
        gap={150}
        {sides}
      >
        {#if browser}
          <MenuLines {open} />
        {/if}
      </Hexagon>
    {/if}
  </Svg>
</ClickOutside>
