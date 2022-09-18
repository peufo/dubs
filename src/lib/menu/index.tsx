import { createSignal } from 'solid-js'
import { Hexagon, viewWidth, viewHeight } from './Hexagon'

export interface Props {
  size?: number
}

export function Menu(props: Props) {
  const [open, setOpen] = createSignal(false)

  const defaultSize = 50

  function handleClick() {
    setOpen((v) => !v)
  }

  return (
    <div
      class='stroke-primary-dark fill-primary hover:fill-primary-light cursor-pointer'
      onClick={handleClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={props.size || defaultSize}
        height={props.size || defaultSize}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      >
        <Hexagon isMenuButton open={open()} />
      </svg>
    </div>
  )
}
