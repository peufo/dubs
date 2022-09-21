import { createSignal } from 'solid-js'
import {
  Hexagon,
  viewWidth,
  viewHeight,
  HexagonProps,
  FaceIndex,
} from './Hexagon'

export interface Props {
  size?: number
}

export function Menu(props: Props) {
  const [open, setOpen] = createSignal(false)

  const defaultSize = 50

  function handleClick() {
    setOpen((v) => !v)
  }

  function draw(
    patern: FaceIndex[],
    next: HexagonProps[] = [],
    index = 0
  ): HexagonProps {
    if (index === patern.length - 1) return { face: patern[index], sides: next }
    return {
      face: patern[index],
      sides: [draw(patern, next, index + 1)],
    }
  }

  function repeat(nb: number, patern: FaceIndex[]): HexagonProps {
    if (nb === 1) return draw(patern)
    return draw(patern, [repeat(nb - 1, patern)])
  }

  const test = draw([2, 2, 3], [{ face: 5 }]) // {face: 2, sides: [{face: 2}]}
  console.log(test)
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size || defaultSize}
      height={props.size || defaultSize}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      class='overflow-visible fill-primary stroke-primary-dark'
    >
      <Hexagon
        isMenuButton
        open={open()}
        visible
        class='hover:fill-primary-light'
        onClick={handleClick}
        gap={150}
        sides={[
          { face: 3 },
          { face: 4, sides: [repeat(5, [5, 3])] },
          { face: 0, visible: true },
          { face: 1, visible: true },
          { face: 2, visible: true },
          { face: 5, visible: true },
        ]}
      />
    </svg>
  )
}
