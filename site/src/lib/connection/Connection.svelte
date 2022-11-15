<script lang="ts">
  import { onMount } from 'svelte'

  export let from: HTMLDivElement
  export let to: HTMLDivElement

  onMount(() => draw())

  const curveIntensity = 0.75

  let left = 0
  let top = 0
  let width = 0
  let height = 0
  let d = ''

  export function draw() {
    const posFrom = getPosition(from.getBoundingClientRect(), 'bottom')
    const posTo = getPosition(to.getBoundingClientRect(), 'top')
    left = posFrom.x < posTo.x ? posFrom.x : posTo.x
    top = posFrom.y < posTo.y ? posFrom.y : posTo.y
    width = Math.abs(posFrom.x - posTo.x)
    height = Math.abs(posFrom.y - posTo.y)

    const x1 = 0
    const y1 = height * curveIntensity
    const x2 = width
    const y2 = height - height * curveIntensity
    const x = width
    const y = height

    d = `M 0 0 C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`
  }

  type Position =
    | 'center'
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'

  function getPosition(
    rect: DOMRect,
    position: Position = 'center'
  ): { x: number; y: number } {
    let x = rect.left
    if (position.match(/right/)) x += rect.width
    else if (!position.match(/left/)) x += rect.width / 2

    let y = rect.top
    if (position.match(/bottom/)) y += rect.height
    else if (!position.match(/top/)) y += rect.height / 2

    return { x, y }
  }
</script>

<svg {width} {height} style="left: {left}; top: {top};">
  <path {d} stroke="black" fill="none" />
</svg>

<style>
  svg {
    position: absolute;
    overflow: visible;
    outline: blue solid 1px;
  }
</style>
