import type { FileInterface, Flow, Resource } from 'types'
import { Gallery } from '$lib/Gallery'

interface Props {
  resourceId: number
  resources: Resource[]
  flows: Flow[]
}

export function ResourceCard({ resourceId, resources, flows }: Props) {
  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) return null

  const files: FileInterface[] = []

  return (
    <>
      <article class='rounded-lg bg-white drop-shadow-2xl overflow-hidden'>
        <h2 class='p-4 bg-secondary-dark text-3xl text-white'>resource.name</h2>
        <div
          innerHTML={'<p>resource.decription</p>'}
          class='p-4 font-medium text-lg text-gray-500'
        />

        <Gallery files={files} />
      </article>
    </>
  )
}
