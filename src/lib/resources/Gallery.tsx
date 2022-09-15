import type { DirectusFile } from '$src/types'
import { getAssetUrl } from '$src/directus'

interface Props {
  files: DirectusFile[]
}

export function Gallery({ files }: Props) {
  // TODO: Traiter d'autre fichier ? PDF, text, etc...
  const images = files.filter((file) => file.type.startsWith('image'))

  return (
    <div class='relative'>
      <div class='flex pb-4 pt-8 overflow-x-auto snap-x snap-mandatory md:justify-center md:flex-wrap'>
        {images.map((image) => (
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
        ))}
      </div>
      <div class='absolute top-0 bottom-4 left-0 w-8 from-transparent to-primary-light bg-gradient-to-l' />
      <div class='absolute top-0 bottom-4 right-0 w-8 from-transparent to-primary-light bg-gradient-to-r' />
    </div>
  )
}
