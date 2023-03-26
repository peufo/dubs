import type { CollectionConfig } from 'payload/types'
import { isRoleOrSelf } from '../user/access'
import { hooks } from './hooks'

export const Order: CollectionConfig = {
  slug: 'order',
  admin: {
    useAsTitle: 'amountDue',
  },
  hooks,
  labels: {
    singular: 'Commande',
    plural: 'Commandes',
  },
  access: {
    create: () => true,
    read: isRoleOrSelf('editor', 'client'),
  },
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
          defaultValue: 'open',
          required: true,
          options: [
            { label: 'En cours', value: 'open' },
            { label: 'Anulée', value: 'canceled' },
            { label: 'Terminée', value: 'close' },
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
          name: 'paymentOk',
          label: 'Payement effectué',
          type: 'checkbox',
        },
      ],
    },
    {
      name: 'label',
      type: 'textarea',
    },
    {
      name: 'items',
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
          name: 'label',
          type: 'textarea',
        },
        {
          name: 'options',
          type: 'json',
          admin: {
            hidden: true,
          },
        },
      ],
    },
  ],
}
