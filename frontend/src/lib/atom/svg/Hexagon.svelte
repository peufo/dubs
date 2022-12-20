<script lang="ts">
  import type { Dot, FaceIndex, HexagonProps, HexagonSide } from './types'
  import Link from '../Link.svelte'
  import Path from './Path.svelte'
  import Text from './Text.svelte'

  type $$Props = HexagonProps

  export let viewWidth = 1000
  export let viewHeight = 1000
  export let rayon = 450

  let klass = ''
  export { klass as class }
  export let style = ''
  /* hexagon is a button if label is defined */
  export let label = ''
  /* hexagon is a link if href is defined */
  export let href = ''
  export let origin: Dot = { x: viewWidth / 2, y: viewHeight / 2 }
  export let rotate: FaceIndex = 0
  export let open = false
  export let permanent = true

  export let index = 0
  export let gap = 0
  export let stepDelay = 20
  export let sides: HexagonSide[] = []
  export let maxShowDelay = getMaxShowDelay()
  export let showDelay = stepDelay * index
  export let hideDelay = maxShowDelay - showDelay

  const rayonIn = (rayon ** 2 - (rayon / 2) ** 2) ** 0.5
  const rayonSides = 2 * rayonIn + gap

  const angles = Array(6)
    .fill(null)
    .map((n, i) => (i + rotate) * 60)
  const degToRad = (angle: number) => angle * (Math.PI / 180)
  const dots = angles.map((angle) => {
    const radians = degToRad(angle)
    return {
      x: origin.x + Math.cos(radians) * rayon,
      y: origin.y - Math.sin(radians) * rayon,
    }
  })

  if (label) {
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
</script>

{#if sides}
  {#each sides as side, i}
    <svelte:self
      {...side}
      {gap}
      {maxShowDelay}
      open={side.permanent || open}
      permanent={false}
      origin={getSideOrigin(side.face)}
      index={index + i + 1}
    />
  {/each}
{/if}

<Link {href}>
  <g
    class="duration-300 origin-center {klass}"
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
    <Path {dots} />

    <slot />

    {#if href}
      <a {href}>prout</a>
    {/if}

    {#if label}
      <Text {label} {dots} />
    {/if}
  </g>
</Link>
