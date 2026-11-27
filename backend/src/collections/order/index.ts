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
      type: 'row',
      fields: [
        {
          name: 'delivery',
          label: 'Mode de remise',
          type: 'select',
          defaultValue: 'pickup',
          required: true,
          options: [
            { label: 'Retrait sur place', value: 'pickup' },
            { label: 'Livraison', value: 'shipping' },
          ],
        },
        {
          name: 'shippingFee',
          label: 'Frais de livraison',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description: 'Calculé à la commande, déjà compris dans la somme dû',
          },
        },
      ],
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
          type: 'row',
          fields: [
            {
              name: 'quantity',
              type: 'number',
              required: true,
              label: 'Quantité',
              defaultValue: 1,
              admin: {
                step: 1,
              },
            },
            {
              name: 'price',
              label: 'Prix',
              type: 'number',
              required: true,
            },
          ],
        },
        {
          name: 'options',
          type: 'array',
          fields: [
            {
              name: 'id',
              type: 'text',
              required: true,
              admin: {
                hidden: true,
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  label: 'Nom',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  label: 'Valeur',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'price',
                  label: 'Prix',
                  type: 'number',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
