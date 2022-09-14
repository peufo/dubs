import type { Flow, Resource } from '$src/types'
import { getAssetUrl } from '$src/directus'

interface Props {
  resourceId: number
  resources: Resource[]
  flows: Flow[]
}

export function Card({ resourceId, resources, flows }: Props) {
  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) return null

  const files = resource.files.map((file) => file.directus_files_id)

  return (
    <div class='rounded-lg p-4 bg-primary-light drop-shadow-2xl'>
      <h2 class='text-3xl text-gray-600'>{resource.name}</h2>
      <div
        innerHTML={resource.decription}
        class='font-medium text-lg text-gray-500'
      />

      <div class='flex gap-4 pt-8 pb-4 overflow-x-auto snap-x snap-mandatory md:justify-center md:flex-wrap'>
        {files.map((file) => (
          <div class='snap-start flex-shrink-0'>
            <img
              class='rounded-xl'
              src={getAssetUrl(file.id, 'height240')}
              alt={file.title}
            />
            <div class='max-w-fit text-center m-auto text-gray-600 leading-none mt-2'>
              {file.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
