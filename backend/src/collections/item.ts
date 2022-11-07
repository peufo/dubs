import type { CollectionConfig } from 'payload/types'

export const Item: CollectionConfig = {
  slug: 'item',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
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
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'product',
      required: true,
    },
  ],
}
