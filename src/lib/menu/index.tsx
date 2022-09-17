import { Hexagon, viewWidth, viewHeight } from './Hexagon'

export interface Props {
  size?: number
}

export function Menu(props: Props) {
  const defaultSize = 50

  return (
    <div class='stroke-primary-dark fill-primary-light cursor-pointer'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={props.size || defaultSize}
        height={props.size || defaultSize}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      >
        <Hexagon isMenuButton />
      </svg>
    </div>
  )
}
