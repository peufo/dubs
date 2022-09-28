import { createSignal, For, JSX, onMount, Show } from 'solid-js'
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
  lineWidth?: number
}
export function Path(props: PathProps) {
  const d = [`M${props.dots[0].x} ${props.dots[0].y}`]
  d.push(...props.dots.map((dot) => `L${dot.x} ${dot.y}`))
  d.push('z')
  return (
    <path
      class={`${props.class}`}
      d={d.join(' ')}
      stroke-width={props.lineWidth || 80}
      stroke-linejoin='round'
    />
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

export type FaceIndex = 0 | 1 | 2 | 3 | 4 | 5
export interface HexagonProps {
  isMenuButton?: boolean
  /* hexagon is a button if label is defined */
  label?: string
  /* hexagon is a link if href is defined */
  href?: string
  onClick?: JSX.EventHandlerUnion<SVGGElement, MouseEvent>
  origin?: Dot
  rotate?: FaceIndex
  slice?: [FaceIndex, FaceIndex]
  hide?: boolean
  face?: FaceIndex
  open?: boolean
  visible?: boolean
  sides?: HexagonProps[]
  class?: string
  style?: string
  gap?: number
  index?: number
}

export function Hexagon(props: HexagonProps) {
  const stepDelay = 30
  const rayon = 450
  const rayonIn = (rayon ** 2 - (rayon / 2) ** 2) ** 0.5
  const rayonSides = 2 * rayonIn + (props.gap ?? 0)
  const center = props.origin ?? { x: viewWidth / 2, y: viewHeight / 2 }

  const sideRadian =
    props.face === undefined ? undefined : degToRad(30 + 60 * props.face)
  const origin: Dot = !sideRadian
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
    .map((n, i) => (i + (props.rotate || 0)) * 60)

  const dots = angles
    .map((angle) => {
      const radians = degToRad(angle)
      return {
        x: origin.x + Math.cos(radians) * rayon,
        y: origin.y - Math.sin(radians) * rayon,
      }
    })
    .slice(...(props.slice || []))

  if (props.label) {
    const horizontalGap = Math.cos(degToRad(30)) * (props.gap || 0)
    const delta = rayon * 3 + 2 * horizontalGap
    dots[2].x -= delta
    dots[3].x -= delta
    dots[4].x -= delta
  }

  const [mounted, setMounted] = createSignal(false)
  onMount(() => setMounted(true))

  const maxDeep = getMaxDeep(props.sides)
  function getMaxDeep(sides?: HexagonProps[], count = 0): number {
    if (!sides || !sides.length) return count
    let counts: number[] = Array(sides.length).fill(count)
    sides.forEach((side, index) => {
      counts[index] += getMaxDeep(side.sides, index + 1)
    })
    return Math.max(...counts)
  }

  const index = props.index || 0
  const showDelay = stepDelay * index
  const hideDelay = stepDelay * (maxDeep - index)

  return (
    <>
      <For each={props.sides}>
        {(side, sideIndex) => (
          <Hexagon
            {...side}
            origin={origin}
            visible={side.visible}
            open={props.open}
            gap={props.gap}
            index={(props.index || 0) + sideIndex() + 1}
          />
        )}
      </For>

      <Show when={!props.hide ?? true}>
        <Link href={props.href}>
          <g
            class={`duration-300 origin-center ${props.class || ''}`}
            classList={{
              'cursor-pointer': !!props.onClick,
              'scale-100': mounted() && (props.visible || props.open),
              'fill-primary-light': !!props.label,
            }}
            style={`
              transform-origin: ${origin.x}px ${origin.y}px;
              transition-delay: ${props.open ? showDelay : hideDelay}ms;
              scale: ${props.visible || props.open ? 1 : 0};
              transition-property: scale;
              transition-timing-function: cubic-bezier(.5,-0.3,.5,1.3);
              z-index: ${+(!!props.label || !!props.href)};
              ${props.style || ''}
            `}
            onClick={props.onClick}
          >
            <Path dots={dots} />

            <Show when={props.isMenuButton}>
              <MenuLines open={props.open} />
            </Show>

            <Show when={!!props.label}>
              <Label label={props.label!} dots={dots} />
            </Show>
          </g>
        </Link>
      </Show>
    </>
  )
}

interface LinkProps {
  href?: string
  children: JSX.Element
}
function Link(props: LinkProps) {
  if (!props.href) return props.children
  return <a href={props.href}>{props.children}</a>
}

interface LabelProps {
  label: string
  dots: Dot[]
}
function Label(props: LabelProps) {
  const getCenter = (a: number, b: number) => a + (b - a) / 2
  const centerX = getCenter(props.dots[2].x, props.dots[1].x)
  const centerY = getCenter(props.dots[1].y, props.dots[5].y)

  return (
    <text
      x={centerX}
      y={centerY}
      dominant-baseline='central'
      text-anchor='middle'
      class='fill-primary-dark uppercase'
      style='font-size: 500px;'
    >
      {props.label}
    </text>
  )
}
