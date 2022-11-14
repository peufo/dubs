import type { CollectionConfig } from 'payload/types'

export const Product: CollectionConfig = {
  slug: 'product',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tags'],
  },
  access: {
    read: () => true,
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
      name: 'tags',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true,
    },
    {
      name: 'desciption',
      type: 'richText',
    },
    {
      label: 'Article achetable',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'providers',
          label: 'Fournisseurs',
          type: 'array',
          fields: [
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'price',
              label: `Prix`,
              type: 'number',
              min: 0,
            },
          ],
        },
      ],
    },
  ],
}
