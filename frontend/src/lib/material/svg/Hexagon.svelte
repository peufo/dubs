<svelte:options namespace="svg" />

<script lang="ts">
  import { page } from '$app/stores'

  import type { Dot, FaceIndex, HexagonProps, HexagonSide } from './types'
  import Path from './Path.svelte'
  import Text from './Text.svelte'
  import Link from './SvgLink.svelte'

  type $$Props = HexagonProps

  export let rayon = 450

  let klass = ''
  export { klass as class }
  export let style = ''

  // Clickable props
  export let label = ''
  export let icon = ''
  export let href = ''
  export let external = false

  export let origin: Dot = { x: 500, y: 500 }
  export let rotate: FaceIndex = 0
  export let open = false
  export let permanent = true

  export let index = 0
  export let gap = 0
  export let stepDelay = 15
  export let sides: HexagonSide[] = []
  export let maxShowDelay = getMaxShowDelay()
  export let showDelay = stepDelay * index
  export let hideDelay = maxShowDelay - showDelay

  const rayonIn = (rayon ** 2 - (rayon / 2) ** 2) ** 0.5
  const rayonSides = 2 * rayonIn + gap

  const angles = Array(6)
    .fill(null)
    .map((_, i) => (i + rotate) * 60)
  const degToRad = (angle: number) => angle * (Math.PI / 180)
  const dots = angles.map((angle) => {
    const radians = degToRad(angle)
    return {
      x: origin.x + Math.cos(radians) * rayon,
      y: origin.y - Math.sin(radians) * rayon,
    }
  })

  if (label && !icon) {
    const horizontalGap = Math.cos(degToRad(30)) * (gap || 0)
    const delta = rayon * 3 + 2 * horizontalGap
    dots[2].x -= delta
    dots[3].x -= delta
    dots[4].x -= delta
  }

  function getSideOrigin(face: number): Dot {
    const sideRadian = degToRad(30 + 60 * face)
    return {
      x: origin.x + Math.cos(sideRadian) * rayonSides,
      y: origin.y - Math.sin(sideRadian) * rayonSides,
    }
  }

  function getMaxDeep(sides?: HexagonProps[], count = 0): number {
    if (!sides || !sides.length) return count
    let counts: number[] = Array(sides.length).fill(count)
    sides.forEach((side, index) => {
      counts[index] += getMaxDeep(side.sides, index + 1)
    })
    return Math.max(...counts)
  }

  function getMaxShowDelay() {
    const maxDeep = getMaxDeep(sides)
    return maxDeep * stepDelay
  }

  function isActive(routeId: string | null, path: string) {
    if (path === '/' && routeId !== '/') return false
    return routeId?.startsWith(path)
  }
</script>

{#if sides}
  {#each sides as side, i}
    <svelte:self
      sides={side.sides}
      label={side.label}
      icon={side.icon}
      href={side.href}
      external={side.external}
      {gap}
      {maxShowDelay}
      open={side.permanent || open}
      permanent={false}
      origin={getSideOrigin(side.face)}
      index={index + i + 1}
    />
  {/each}
{/if}

<Link {href} {external}>
  <g
    class="relative duration-300 origin-center {klass} group"
    class:fill-primary-light={label}
    style="
      transform-origin: {origin.x}px {origin.y}px;
      transition-delay: {open ? showDelay : hideDelay}ms;
      scale: {permanent || open ? 1 : 0};
      transition-property: scale;
      transition-timing-function: cubic-bezier(.5,-0.3,.5,1.3);
      z-index: {+(!!label || !!href)};
      {style}
    "
    on:click
    on:keydown
    on:keyup
  >
    <Path
      {dots}
      class={href
        ? `transition-all group-hover:stroke-[240px] group-hover:stroke-primary-light ${
            isActive($page.route.id, href)
              ? 'stroke-[80px] stroke-primary-dark'
              : ''
          }`
        : ''}
    />

    <slot />

    {#if icon}
      <path
        d={icon}
        style="
        translate: {origin.x - rayonIn}px {origin.y - rayonIn}px;
        scale: 32;
        "
      />
    {:else if label}
      <Text {label} {dots} />
    {/if}
  </g>
</Link>
