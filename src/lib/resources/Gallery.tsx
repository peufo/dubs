import type { DirectusFile } from '$src/types'
import { getAssetUrl } from '$src/directus'

interface Props {
  files: DirectusFile[]
}

export function Gallery({ files }: Props) {
  // TODO: Traiter d'autre fichier ? PDF, text, etc...
  const images = files.filter((file) => file.type.startsWith('image'))

  return (
    <div class='flex gap-4 pt-8 pb-4 overflow-x-auto snap-x snap-mandatory md:justify-center md:flex-wrap'>
      {images.map((image) => (
        <div class='snap-start flex-shrink-0'>
          <img
            class='rounded-xl'
            src={getAssetUrl(image.id, 'height240')}
            alt={image.title}
          />
          <div class='max-w-fit text-center m-auto text-gray-600 leading-none mt-2'>
            {image.description}
          </div>
        </div>
      ))}
    </div>
  )
}
