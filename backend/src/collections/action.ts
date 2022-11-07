import type { CollectionConfig } from 'payload/types'

export const Action: CollectionConfig = {
  slug: 'action',
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
      name: 'Connection',
      type: 'group',
      fields: [
        {
          name: 'inputs',
          type: 'relationship',
          relationTo: ['product', 'action'],
          hasMany: true,
          filterOptions: ({ id }) => ({ id: { not_equals: id } }),
        },
        {
          name: 'ouputs',
          type: 'relationship',
          relationTo: ['product', 'action'],
          hasMany: true,
          filterOptions: ({ id }) => ({ id: { not_equals: id } }),
        },
      ],
    },
    {
      name: 'Resources',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'resourceFrom',
              type: 'relationship',
              relationTo: 'resource',
            },
            {
              name: 'resourceTo',
              type: 'relationship',
              relationTo: 'resource',
            },
          ],
        },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'action',
      filterOptions: ({ id }) => ({
        id: { not_equals: id },
      }),
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
