import { createSignal } from 'solid-js'
import { Hexagon, viewWidth, viewHeight } from './Hexagon'

export interface Props {
  size?: number
}

export function Menu(props: Props) {
  const [open, setOpen] = createSignal(true)

  const defaultSize = 50

  function handleClick() {
    setOpen((v) => !v)
  }

  return (
    <div
      class='stroke-primary-dark fill-primary cursor-pointer'
      onClick={handleClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={props.size || defaultSize}
        height={props.size || defaultSize}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        class='overflow-visible'
      >
        <Hexagon
          isMenuButton
          open={open()}
          visible
          class='hover:fill-primary-light'
          gap={150}
          sides={[
            { face: 0, visible: true },
            { face: 1, visible: true },
            { face: 2, visible: true, sides: [{ face: 2, visible: true }] },
            { face: 3 },
            { face: 4 },
            { face: 5, visible: true },
          ]}
        />
      </svg>
    </div>
  )
}
