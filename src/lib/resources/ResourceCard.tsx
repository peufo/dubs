import type { Flow, Resource } from '$src/types'
import { Gallery } from '$lib/resources/Gallery'
import { FlowsLines } from '$lib/resources/FlowsLines'

interface Props {
  resourceId: number
  resources: Resource[]
  flows: Flow[]
}

export function ResourceCard({ resourceId, resources, flows }: Props) {
  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) return null

  const files = resource.files.map((file) => file.directus_files_id)
  const ouputsFlow = flows.filter((flow) => flow.from === resourceId)

  return (
    <>
      <div class='rounded-lg p-4 bg-primary-light drop-shadow-2xl'>
        <h2 class='text-3xl text-gray-600'>{resource.name}</h2>
        <div
          innerHTML={resource.decription}
          class='font-medium text-lg text-gray-500'
        />

        <Gallery files={files} />
      </div>
      <FlowsLines flows={ouputsFlow} resources={resources} />
    </>
  )
}
