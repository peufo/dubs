import {
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
  on,
  onMount,
  Show,
  Switch,
} from 'solid-js'
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
export interface HexagonProps {
  isMenuButton?: boolean
  origin?: Dot
  rotate?: FaceIndex
  slice?: [FaceIndex, FaceIndex]
  face?: FaceIndex
  open?: boolean
  visible?: boolean
  sides?: HexagonProps[]
  class?: string
  style?: string
  gap?: number
  delay?: number
  onClick?: JSX.EventHandlerUnion<SVGGElement, MouseEvent>
  deep?: number
}

export function Hexagon(props: HexagonProps) {
  const stepDelay = 30
  const rayon = 450
  const rayonIn = (rayon ** 2 - (rayon / 2) ** 2) ** 0.5
  const rayonSides = 2 * rayonIn + (props.gap ?? 0)
  const center = props.origin ?? { x: viewWidth / 2, y: viewHeight / 2 }
  const sideRadian =
    props.face === undefined ? undefined : degToRadian(30 + 60 * props.face)
  const origin: Dot = !sideRadian
    ? center
    : {
        x: center.x + Math.cos(sideRadian) * rayonSides,
        y: center.y - Math.sin(sideRadian) * rayonSides,
      }
  function degToRadian(angle: number) {
    return (angle / 360) * Math.PI * 2
  }

  const angles = Array(6)
    .fill(null)
    .map((n, i) => (i + (props.rotate || 0)) * 60)

  const dots = angles
    .map((angle) => {
      const radians = degToRadian(angle)
      return {
        x: origin.x + Math.cos(radians) * rayon,
        y: origin.y - Math.sin(radians) * rayon,
      }
    })
    .slice(...(props.slice || []))

  const [mounted, setMounted] = createSignal(false)
  onMount(() => setMounted(true))

  const maxDeep = getMaxDeep(props.sides)
  function getMaxDeep(sides?: HexagonProps[], deep = 0): number {
    if (!sides) return deep
    let max = 0
    for (const side of sides) {
      const sidesMaxDeep = getMaxDeep(side.sides, deep + 1)
      if (sidesMaxDeep > max) max = sidesMaxDeep
    }
    return max
  }

  const sidesInvisible = props.sides?.filter((s) => !s.visible).length || 0
  const deep = props.deep || 0
  const hideDelay = (i: number) =>
    stepDelay * (sidesInvisible + maxDeep - deep - i)
  const showDelay = (i: number) => stepDelay * (deep + i)

  return (
    <>
      <g
        class={`duration-300 origin-center ${props.class || ''}`}
        classList={{
          'cursor-pointer': !!props.onClick,
          'scale-100': mounted() && (props.visible || props.open),
        }}
        style={`
          transform-origin: ${origin.x}px ${origin.y}px;
          transition-delay: ${props.delay}ms;
          transition-property: scale;
          scale: ${props.visible || props.open ? 1 : 0};
          transition-timing-function: cubic-bezier(.5,-0.3,.5,1.3);
          ${props.style || ''}
        `}
        onClick={props.onClick}
      >
        <Path dots={dots} />
        <Lines dots={dots} closePath={!!props.slice} />
        <Show when={props.isMenuButton}>
          <MenuLines open={props.open} />
        </Show>
      </g>

      <For each={props.sides}>
        {(side, index) => (
          <Hexagon
            {...side}
            origin={origin}
            visible={side.visible}
            open={props.open}
            gap={props.gap}
            delay={props.open ? showDelay(index()) : hideDelay(index())}
            deep={(props.deep || 0) + 1}
          />
        )}
      </For>
    </>
  )
}
