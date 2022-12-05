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
      name: 'unit',
      label: 'Unité',
      type: 'text',
      maxLength: 120,
    },
    {
      name: 'description',
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
    {
      name: 'variables',
      type: 'blocks',
      blocks: [
        {
          slug: 'text',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'freeValue',
                  label: 'Valeur libre',
                  type: 'checkbox',
                },
                {
                  name: 'options',
                  type: 'array',
                  admin: {
                    condition: (data, block) => !block.freeValue,
                  },
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          slug: 'numeric',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'freeValue',
                  label: 'Valeur libre',
                  type: 'checkbox',
                },
                {
                  name: 'unit',
                  label: 'Unité',
                  type: 'text',
                },
              ],
            },
            {
              name: 'options',
              type: 'array',
              admin: {
                condition: (data, block) => !block.freeValue,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
