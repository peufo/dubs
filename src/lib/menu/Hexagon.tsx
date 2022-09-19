import { Show } from 'solid-js'
import { createTransition } from '$lib/utils/transition'

interface Dot {
  x: number
  y: number
}

export const viewWidth = 1000
export const viewHeight = 1000

interface PropsLine {
  from: Dot
  to: Dot
  width?: number
  class?: string
}
export function Line(props: PropsLine) {
  return (
    <line
      x1={props.from.x}
      y1={props.from.y}
      x2={props.to.x}
      y2={props.to.y}
      stroke-width={props.width || 50}
      stroke-linecap='round'
      class={props.class}
    ></line>
  )
}

interface PathProps {
  dots: Dot[]
  closePath?: boolean
  class?: string
}
export function Lines(props: PathProps) {
  return props.dots
    .map((dot, i, self) => (
      <Line from={dot} to={self[i + 1] || self[0]} width={100} />
    ))
    .filter((l, i, self) => !props.closePath || self[i + 1])
}
export function Path(props: PathProps) {
  const d = [`M${props.dots[0].x} ${props.dots[0].y}`]
  d.push(...props.dots.map((dot) => `L${dot.x} ${dot.y}`))
  d.push('z')
  return (
    <path
      class={`hexagon-path ${props.class}`}
      d={d.join(' ')}
      stroke-width='0'
    ></path>
  )
}

interface MenuLinesOpen {
  open?: boolean
}
export function MenuLines(props: MenuLinesOpen) {
  const width = 100
  const oy = viewHeight / 2
  const dy = viewHeight / 6
  const ox = viewWidth / 2
  const dx1 = viewWidth / 6
  const dx2 = viewWidth / 4

  const { t, u } = createTransition(() => !!props.open)

  return (
    <>
      <Line
        from={{ x: ox - u() * dx2, y: oy }}
        to={{ x: ox + u() * dx2, y: oy }}
        width={width}
      />
      <Line
        from={{ x: ox - dx1, y: oy - dy }}
        to={{ x: ox + dx1, y: oy - dy + t() * 2 * dy }}
        width={width}
      />
      <Line
        from={{ x: ox - dx1, y: oy + dy }}
        to={{ x: ox + dx1, y: oy + dy - t() * 2 * dy }}
        width={width}
      />
    </>
  )
}

type FaceIndex = 0 | 1 | 2 | 3 | 4 | 5
interface HexagonProps {
  isMenuButton?: boolean
  rotate?: FaceIndex
  slice?: [FaceIndex, FaceIndex]
  open?: boolean
}

export function Hexagon(props: HexagonProps) {
  const center = { x: viewWidth / 2, y: viewHeight / 2 }
  const angles = Array(6)
    .fill(null)
    .map((n, i) => (i + (props.rotate || 0)) * 60)
  const rayon = 450
  const dots = angles
    .map((angle) => {
      const radians = (angle / 360) * Math.PI * 2
      return {
        x: center.x + Math.cos(radians) * rayon,
        y: center.y - Math.sin(radians) * rayon,
      }
    })
    .slice(...(props.slice || []))

  return (
    <>
      <Path dots={dots} />
      <Lines dots={dots} closePath={!!props.slice} />
      <Show when={props.isMenuButton}>
        <MenuLines open={props.open} />
      </Show>
    </>
  )
}
