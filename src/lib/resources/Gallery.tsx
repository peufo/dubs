import { For, onCleanup, createSignal } from 'solid-js'
import type { DirectusFile } from '$src/types'
import { getAssetUrl } from '$src/directus'

interface Props {
  files: DirectusFile[]
}

type ScrollState = 'left' | 'middle' | 'rigth'
declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      getScrollState: (newState: ScrollState) => void
    }
  }
}

export function Gallery({ files }: Props) {
  const [scrollState, setScrollState] = createSignal<ScrollState>('left')

  // TODO: Traiter d'autre fichier ? PDF, text, etc...
  const images = files.filter((file) => file.type.startsWith('image'))

  return (
    <div class='relative'>
      <div
        use:getScrollState={setScrollState}
        class='flex pb-4 pt-8 overflow-x-auto snap-x snap-mandatory md:justify-center md:flex-wrap'
      >
        <For each={images}>
          {(image) => (
            <figure class='snap-start flex-shrink-0 pl-4 last:pr-4'>
              <img
                class='rounded-xl'
                src={getAssetUrl(image.id, 'height240')}
                alt={image.title}
              />
              <figcaption class='max-w-fit text-center m-auto text-gray-600 leading-none mt-2'>
                {image.description}
              </figcaption>
            </figure>
          )}
        </For>
      </div>
      <div class='absolute top-0 bottom-4 left-0 w-8 from-transparent to-primary-light bg-gradient-to-l'></div>
      <div class='absolute top-0 bottom-4 right-0 w-8 from-transparent to-primary-light bg-gradient-to-r' />
    </div>
  )
}

function getScrollState(
  element: HTMLElement,
  accesssor: () => (scrollState: ScrollState) => void
) {
  let currentState: ScrollState = 'left'
  const getNewState = (): ScrollState => {
    const { scrollLeft, scrollWidth, clientWidth } = element
    if (scrollLeft === 0) return 'left'
    if (scrollLeft + clientWidth === scrollWidth) return 'rigth'
    return 'middle'
  }

  const onScroll = () => {
    let newState = getNewState()
    if (newState !== currentState) {
      currentState = newState
      accesssor()(newState)
    }
  }
  element.addEventListener('scroll', onScroll)
  onCleanup(() => element.removeEventListener('scroll', onScroll))
}
