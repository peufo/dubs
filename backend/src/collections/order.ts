import type { CollectionConfig } from 'payload/types'

export const Order: CollectionConfig = {
  slug: 'order',
  admin: {
    useAsTitle: 'amountDue',
  },
  labels: {
    singular: 'Commande',
    plural: 'Commandes',
  },
  access: {},
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'client',
          type: 'relationship',
          relationTo: 'user',
          required: true,
        },
        {
          name: 'stateOrder',
          label: 'État de la commande',
          type: 'select',
          options: [
            { label: 'En cours', value: 'open' },
            { label: 'Anuler', value: 'canceled' },
            { label: 'Terminer', value: 'close' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'amountDue',
          label: 'Somme dû',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'amountPaid',
          label: 'Somme payé',
          type: 'number',
          defaultValue: 0,
          min: 0,
        },
        {
          name: 'paymentOk',
          label: 'Payement effectué',
          type: 'checkbox',
        },
      ],
    },

    {
      name: 'cart',
      label: `Panier d'achat`,
      type: 'array',
      defaultValue: [],
      required: true,
      fields: [
        {
          name: 'product',
          label: 'produit',
          type: 'relationship',
          relationTo: 'product',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'options',
          type: 'json',
        },
      ],
    },
  ],
}
