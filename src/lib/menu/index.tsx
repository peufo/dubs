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
    const isLast = index === patern.length - 1
    const sides = isLast ? next : [draw(patern, next, index + 1)]
    return { face: patern[index], sides }
  }

  function repeat(nb: number, patern: FaceIndex[]): HexagonProps {
    if (nb === 1) return draw(patern)
    return draw(patern, [repeat(nb - 1, patern)])
  }

  function button(label: string, href?: string): HexagonProps {
    return {
      label,
      href,
      face: 3,
      sides: [
        {
          face: 2,
          sides: [{ face: 3, hide: true, sides: [draw([2, 3, 5])] }],
        },
        { face: 3 },
      ],
    }
  }

  function button2(): HexagonProps[] {
    return [
      button('Contact', '/lab'),
      draw(
        [5, 3],
        [
          { face: 3, sides: [button('Prout', '/')] },
          draw([5, 3], [{ face: 3 }, draw([5, 3])]),
        ]
      ),
    ]
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size || defaultSize}
      height={props.size || defaultSize}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      class='overflow-visible fill-primary stroke-primary-dark '
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
          {
            face: 4,
            sides: [
              button('Contact', '/lab'),
              draw(
                [5, 3],
                [
                  { face: 3, sides: [button('Prout', '/')] },
                  draw([5, 3], [{ face: 3 }, draw([5, 3])]),
                ]
              ),
            ],
          },
          { face: 0, visible: true },
          { face: 1, visible: true },
          { face: 2, visible: true },
          { face: 5, visible: true },
        ]}
      />
    </svg>
  )
}
