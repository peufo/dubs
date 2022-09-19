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
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size || defaultSize}
      height={props.size || defaultSize}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      class='overflow-visible stroke-primary-dark fill-primary'
    >
      <Hexagon
        isMenuButton
        open={open()}
        visible
        class='hover:fill-primary-light'
        onClick={handleClick}
        gap={150}
        sides={[
          {
            face: 4,
            sides: [
              { face: 5, sides: [{ face: 4 }] },
              { face: 4 },
              { face: 3, sides: [{ face: 3 }, { face: 4 }] },
            ],
          },
          { face: 3 },
          { face: 0, visible: true },
          { face: 1, visible: true },
          { face: 2, visible: true, sides: [{ face: 2, visible: true }] },
          { face: 5, visible: true },
        ]}
      />
    </svg>
  )
}
