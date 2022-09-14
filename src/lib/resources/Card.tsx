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
    <div class='drop-shadow rounded-lg p-4 bg-primary-light shadow-xl'>
      <h3 class='text-2xl'>{resource.name}</h3>
      <div innerHTML={resource.decription} />

      <div class='flex gap-4 pt-8 pb-4 overflow-x-auto snap-x snap-mandatory'>
        {files.map((file) => (
          <img
            class='rounded-xl snap-center'
            src={getAssetUrl(file.id, 'height240')}
            alt={file.title}
          />
        ))}
      </div>
    </div>
  )
}
