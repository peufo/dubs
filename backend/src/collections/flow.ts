import type { CollectionConfig } from 'payload/types'

export const Flow: CollectionConfig = {
  slug: 'flow',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'start',
      type: 'date',
    },
    {
      name: 'end',
      type: 'date',
    },
    {
      name: 'actions',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'subflow',
          type: 'relationship',
          relationTo: 'flow',
        },
        {
          name: 'resource',
          type: 'relationship',
          relationTo: 'resource',
        },
        {
          name: 'pruduct',
          type: 'relationship',
          relationTo: 'product',
        },
      ],
    },
  ],
}
