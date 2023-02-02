export interface Dot {
  x: number
  y: number
}

export type FaceIndex = 0 | 1 | 2 | 3 | 4 | 5

export type HexagonProps = {
  class?: string
  style?: string
  /* hexagon is a button with label if defined */
  label?: string
  /* hexagon is a button with icon if defined */
  icon?: string
  /* hexagon is a link if href is defined */
  href?: string
  external?: boolean

  origin?: Dot
  rotate?: FaceIndex
  permanent?: boolean

  open?: boolean
  gap?: number
  showDelay?: number
  hideDelay?: number
  rayon?: number
  viewWidth?: number
  viewHeight?: number
  sides?: HexagonSide[]
  index?: number
  maxShowDelay?: number
  stepDelay?: number
}

export type HexagonSide = HexagonProps & {
  face: FaceIndex
}
