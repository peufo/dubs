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
          class='hover:fill-primary-light'
          sides={[
            { face: 0 },
            { face: 1 },
            {
              face: 2,
              sides: [
                {
                  face: 2,
                  sides: [
                    {
                      face: 3,
                      sides: [{ face: 2, sides: [{ face: 3 }] }, { face: 3 }],
                    },
                  ],
                },
                { face: 3 },
              ],
            },
            { face: 3 },
            {
              face: 4,
              sides: [{ face: 3 }, { face: 5, sides: [{ face: 4 }] }],
            },
            { face: 5 },
          ]}
        />
      </svg>
    </div>
  )
}
