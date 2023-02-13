import type { CollectionConfig } from 'payload/types'

export const Order: CollectionConfig = {
  slug: 'order',
  admin: {
    useAsTitle: 'product.name',
  },
  labels: {
    singular: 'Commande',
    plural: 'Commandes',
  },
  access: {},
  fields: [
    {
      name: 'product',
      label: 'produit',
      type: 'relationship',
      relationTo: 'product',
      required: true,
    },
    {
      name: 'quantity',
      label: 'Quantité',
      type: 'number',
      min: 1,
      admin: {
        step: 1,
      },
    },

    {
      name: 'variables',
      type: 'array',
      fields: [
        {
          name: 'optionId',
          type: 'text',
        },
        /*
        {
          name: 'option',
          type: 'relationship',
          relationTo: 'product.variables.options',
        },
        */
      ],
    },
  ],
}
