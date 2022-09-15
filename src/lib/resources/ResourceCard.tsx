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
      <article class='rounded-lg bg-white drop-shadow-2xl'>
        <div class='p-4'>
          <h2 class='text-3xl text-gray-600'>{resource.name}</h2>
          <div
            innerHTML={resource.decription}
            class='font-medium text-lg text-gray-500'
          />
        </div>

        <Gallery files={files} />
      </article>
      <FlowsLines flows={ouputsFlow} resources={resources} />
    </>
  )
}
