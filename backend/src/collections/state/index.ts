import type { CollectionConfig } from 'payload/types'
import { LocationField } from '../../components/LocationField'

export const State: CollectionConfig = {
  slug: 'state',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'from',
      type: 'relationship',
      relationTo: 'action',
    },
    {
      name: 'to',
      type: 'relationship',
      relationTo: 'action',
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'product',
    },
    {
      name: 'location',
      type: 'point',
      admin: {
        components: {
          Field: LocationField,
        },
      },
    },
  ],
}
