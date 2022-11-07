import type { CollectionConfig } from 'payload/types'
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
      name: 'location',
      type: 'point',
      required: true,
      admin: {
        components: {
          Field: LocationField,
        },
      },
    },
    {
      name: 'locationB',
      type: 'point',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'resource',
    },
  ],
}
