export type Position =
  | 'center'
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left'

export function getPosition(
  rect: DOMRect,
  position: Position = 'center'
): { x: number; y: number } {
  let x = rect.left
  if (position.match(/right/)) x += rect.width
  else if (!position.match(/left/)) x += rect.width / 2

  let y = rect.top
  if (position.match(/bottom/)) y += rect.height
  else if (!position.match(/top/)) y += rect.height / 2

  x += window.scrollX
  y += window.scrollY

  return { x, y }
}

type GetPathOptions = {
  fromPosition?: Position
  toPosition?: Position
  curveIntensity?: number
  /** Straight line before the curve */
  fromStraight?: number
  /** Straight line after the curve */
  toStraight?: number
}

export function getPath(
  from: HTMLElement,
  to: HTMLElement,
  {
    fromPosition = 'bottom',
    toPosition = 'top',
    curveIntensity = 0.75,
    fromStraight = 0,
    toStraight = 0,
  }: GetPathOptions = {}
): string {
  if (!from || !to) return ''

  const posFrom = getPosition(from.getBoundingClientRect(), fromPosition)
  const posTo = getPosition(to.getBoundingClientRect(), toPosition)

  const width = posTo.x - posFrom.x
  const height = posTo.y - posFrom.y - fromStraight - toStraight
  const left = posFrom.x
  const top = posFrom.y

  const x1 = 0
  const y1 = height * curveIntensity
  const x2 = width
  const y2 = height - height * curveIntensity
  const x = width
  const y = height

  return `M ${left} ${top} v ${fromStraight} c ${x1} ${y1}, ${x2} ${y2}, ${x} ${y} v ${toStraight}`
}
