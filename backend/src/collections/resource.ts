import type { CollectionConfig, Field } from 'payload/types'
import { LocationField } from '../components/LocationField'

export const Resource: CollectionConfig = {
  slug: 'resource',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 120,
    },
    {
      name: 'desciption',
      type: 'richText',
    },
    {
      name: 'relative',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description:
          'Définit si cette ressource est relative à une resource parent.',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'resource',
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      admin: {
        condition: (resource) => resource.relative,
      },
    },
    {
      name: 'location',
      type: 'point',
      required: true,
      admin: {
        components: {
          Field: LocationField,
        },
        condition: (resource) => !resource.relative,
      },
    },
  ],
}
