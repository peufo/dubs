import { For, onCleanup, createSignal } from 'solid-js'
import type { DirectusFile } from '$src/types'
import { getAssetUrl } from '$src/directus'
import { Icon } from '$src/util/icon'
import { mdiChevronDoubleLeft, mdiChevronDoubleRight } from '@mdi/js'

interface Props {
  files: DirectusFile[]
}

type ScrollState = 'left' | 'middle' | 'right' | 'none'
declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      getScrollState: (newState: ScrollState) => void
    }
  }
}

export function Gallery({ files }: Props) {
  const [scrollState, setScrollState] = createSignal<ScrollState>('none')

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
              <figcaption class='max-w-fit text-center m-auto my-2 text-gray-600 leading-none'>
                {image.description}
              </figcaption>
            </figure>
          )}
        </For>
      </div>
      <div class='absolute top-8 h-60 left-0 w-6 from-transparent to-white bg-gradient-to-l grid items-center'>
        <Icon
          path={mdiChevronDoubleLeft}
          size={28}
          class='fill-white transition-transform m-4'
          classList={{
            'scale-0': scrollState() === 'none' || scrollState() === 'left',
          }}
        />
      </div>
      <div class='absolute top-8 h-60 right-0 w-6 from-transparent to-white bg-gradient-to-r grid items-center justify-end'>
        <Icon
          path={mdiChevronDoubleRight}
          size={28}
          class='fill-white transition-transform m-4'
          classList={{
            'scale-0': scrollState() === 'none' || scrollState() === 'right',
          }}
        />
      </div>
    </div>
  )
}

function getScrollState(
  element: HTMLElement,
  accesssor: () => (newState: ScrollState) => void
) {
  const tol = 16
  let currentState: ScrollState | null = null
  const getNewState = (): ScrollState => {
    const { scrollLeft, scrollWidth, clientWidth } = element
    if (scrollWidth === clientWidth) return 'none'
    if (scrollLeft < tol) return 'left'
    if (scrollLeft + clientWidth + tol >= scrollWidth) return 'right'
    return 'middle'
  }

  const testScrollWidth = () => {
    let newState = getNewState()
    if (newState !== currentState) {
      currentState = newState
      accesssor()(newState)
    }
  }
  element.addEventListener('scroll', testScrollWidth)
  window.addEventListener('resize', testScrollWidth)
  onCleanup(() => {
    element.removeEventListener('scroll', testScrollWidth)
    window.removeEventListener('resize', testScrollWidth)
  })
}
