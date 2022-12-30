<script lang="ts">
  import { beforeNavigate } from '$app/navigation'

  import type { FaceIndex, HexagonSide } from '$lib/atom/svg/types'
  import Svg from '$lib/atom/svg/Svg.svelte'
  import Hexagon from '$lib/atom/svg/Hexagon.svelte'
  import MenuLines from '$lib/atom/svg/MenuLines.svelte'

  type MenuItem = { label: string; href: string }

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

  function drawItem({ label, href }: MenuItem): HexagonSide {
    return {
      label,
      href,
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
    return drawPatern([5, 3], drawNext)
  }

  const sides: HexagonSide[] = [
    { face: 3, sides: [repeat(2, [2, 3])] },
    {
      face: 4,
      sides: [drawItem({ label: 'Acceuil', href: '/' }), nextItem(items)],
    },
    { face: 0, permanent: true },
    { face: 1, permanent: true },
    { face: 2, permanent: true },
    { face: 5, permanent: true },
  ]
</script>

<Svg {size} class="fixed right-2 top-2 z-10">
  <Hexagon
    on:click={() => (open = !open)}
    {open}
    class="hover:fill-primary-light cursor-pointer"
    gap={150}
    {sides}
  >
    <MenuLines {open} />
  </Hexagon>
</Svg>
