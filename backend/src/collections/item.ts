import type { CollectionConfig } from 'payload/types'

export const Item: CollectionConfig = {
  slug: 'item',
  admin: {
    useAsTitle: 'product.name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'product',
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'action',
          type: 'relationship',
          relationTo: 'action',
        },
      ],
    },
    {
      name: 'virtual',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description:
          "Les items virtuels permettent définir de chemin d'actions de démonstration parmis les possibles",
      },
    },
    {
      name: 'validity',
      type: 'group',
      admin: {
        position: 'sidebar',
        condition: (data) => data.virtual,
      },
      fields: [
        {
          name: 'start',
          type: 'date',
        },
        {
          name: 'end',
          type: 'date',
        },
      ],
    },
  ],
}
