import { For } from 'solid-js'
import { Hexagon, viewWidth, viewHeight } from './Hexagon'

interface Props {
  ids: string[]
}

export function Indicator(props: Props) {
  const height = 16

  const hash = 'as' // window?.location.hash.replace('#', '') || ''

  return (
    <div class='flex gap-1 justify-center'>
      <For each={props.ids}>
        {(id, index) => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={height}
            height={height}
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            class='stroke-primary-dark'
          >
            <Hexagon
              href={`#${id}`}
              visible
              pathClass={index() === 1 ? 'fill-primary-dark' : 'fill-primary'}
            />
          </svg>
        )}
      </For>
    </div>
  )
}
