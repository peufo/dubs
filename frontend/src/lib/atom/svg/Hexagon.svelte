<script lang="ts">
  import Link from '../Link.svelte'
  import Path from './Path.svelte'

  import type { Dot } from './types'

  export let viewWidth = 1000
  export let viewHeight = 1000

  type FaceIndex = 0 | 1 | 2 | 3 | 4 | 5

  let klass = ''
  export { klass as class }
  export let style = ''
  /* hexagon is a button if label is defined */
  export let label = ''
  /* hexagon is a link if href is defined */
  export let href = ''
  export let origin: Dot = { x: viewWidth / 2, y: viewHeight / 2 }
  export let rotate: FaceIndex = 0
  export let face: FaceIndex | undefined = undefined
  export let hide = true
  export let open = false
  export let visible = true
  export let pathClass = ''
  export let gap = 0
  export let showDelay = 0
  export let hideDelay = 0

  const rayon = 450
  const rayonIn = (rayon ** 2 - (rayon / 2) ** 2) ** 0.5
  const rayonSides = 2 * rayonIn + (gap ?? 0)
  const center = origin ?? { x: viewWidth / 2, y: viewHeight / 2 }

  const sideRadian = face === undefined ? undefined : degToRad(30 + 60 * face)
  const _origin: Dot = !sideRadian
    ? center
    : {
        x: center.x + Math.cos(sideRadian) * rayonSides,
        y: center.y - Math.sin(sideRadian) * rayonSides,
      }
  function degToRad(angle: number) {
    return angle * (Math.PI / 180)
  }

  const angles = Array(6)
    .fill(null)
    .map((n, i) => (i + (rotate || 0)) * 60)

  const dots = angles.map((angle) => {
    const radians = degToRad(angle)
    return {
      x: _origin.x + Math.cos(radians) * rayon,
      y: _origin.y - Math.sin(radians) * rayon,
    }
  })

  if (label) {
    const horizontalGap = Math.cos(degToRad(30)) * (gap || 0)
    const delta = rayon * 3 + 2 * horizontalGap
    dots[2].x -= delta
    dots[3].x -= delta
    dots[4].x -= delta
  }
</script>

<Link {href}>
  <g
    class="duration-300 origin-center {klass}"
    class:scale-100={visible}
    class:fill-primary-light={label}
    style="
      transform-origin: ${_origin.x}px ${_origin.y}px;
      transition-delay: ${open ? showDelay : hideDelay}ms;
      scale: ${visible || open ? 1 : 0};
      transition-property: scale;
      transition-timing-function: cubic-bezier(.5,-0.3,.5,1.3);
      z-index: ${+(!!label || !!href)};
      {style}
    "
    on:click
    on:keydown
    on:keyup
  >
    <Path {dots} />

    <slot />
  </g>
</Link>
