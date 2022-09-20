import { createSignal } from 'solid-js'
import { Hexagon, viewWidth, viewHeight, HexagonProps } from './Hexagon'

export interface Props {
  size?: number
}

export function Menu(props: Props) {
  const [open, setOpen] = createSignal(false)

  const defaultSize = 50

  function handleClick() {
    setOpen((v) => !v)
  }

  function row(length: number, sides: HexagonProps[] = []): HexagonProps[] {
    if (length === 0) return []
    const next = [...row(length - 1), ...sides]
    return [{ face: 2, sides: [{ face: 3, sides: next }] }]
  }
  function col(length: number, sides: HexagonProps[] = []): HexagonProps[] {
    if (length === 0) return []
    const next = [...col(length - 1, sides), ...sides]
    return [{ face: 4, sides: next }]
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
          { face: 0, visible: true },
          { face: 1, visible: true },
          {
            face: 2,
            visible: true,
            sides: [{ face: 3, sides: [{ face: 3 }] }],
          },
          { face: 3 },
          { face: 4 },
          { face: 5, visible: true, sides: col(5, row(3)) },
        ]}
      />
    </svg>
  )
}
