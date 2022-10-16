import { splitProps } from 'solid-js'

interface Props {
  path: string
  size?: number
  class?: string
  classList?: {
    [k: string]: boolean | undefined
  }
}

export function Icon(props: Props) {
  const viewWidth = 24
  const viewHeight = 24

  return (
    <i classList={props.classList} class={`rounded-full ${props.class}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={props.size}
        height={props.size}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      >
        <path d={props.path} />
      </svg>
    </i>
  )
}
