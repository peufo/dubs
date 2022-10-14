import { For } from 'solid-js'

import { getAssetUrl } from '$src/directus'
import './Gallery.css'
import { Indicator } from '$lib/hexagon/Indicator'

interface Props {
  files: DirectusFile[]
}

export function Gallery({ files }: Props) {
  // TODO: Traiter d'autre fichier ? PDF, text, etc...
  const images = files // .filter((file) => file.type.startsWith('image'))

  return (
    <>
      <div class='images-wrapper flex pb-4 pt-8 gap-[50%] overflow-x-auto snap-x snap-mandatory'>
        <For each={images}>
          {(image) => (
            <figure class='snap-center flex-shrink-0 first:ml-[50%] last:mr-[50%]'>
              <img
                id={image.title}
                class='rounded-xl'
                src={getAssetUrl('image.id', 'height240')}
                alt={''}
              />
              <figcaption class='max-w-fit text-center m-auto my-2 text-gray-600 leading-none'>
                decription
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
    </>
  )
}
