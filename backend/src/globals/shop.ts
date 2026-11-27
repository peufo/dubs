import { GlobalConfig } from 'payload/types'

export const Shop: GlobalConfig = {
  slug: 'shop',
  label: 'Boutique',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      admin: {
        description:
          'Affiché dans le mail de confirmation et sur la page des mentions légales',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', label: 'Nom et prénom', type: 'text' },
            { name: 'phone', label: 'Téléphone', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
          ],
        },
        {
          name: 'address',
          label: 'Adresse postale',
          type: 'textarea',
          admin: {
            description: 'Obligatoire pour une boutique en ligne (mentions légales)',
          },
        },
      ],
    },
    {
      name: 'pickup',
      type: 'group',
      label: 'Retrait sur place',
      fields: [
        {
          name: 'enabled',
          label: 'Proposer le retrait sur place',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'details',
          label: 'Informations de retrait',
          type: 'textarea',
          admin: {
            description: 'Adresse, horaires… Affiché dans le mail de confirmation',
          },
        },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      label: 'Livraison',
      fields: [
        {
          name: 'enabled',
          label: 'Proposer la livraison',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'fee',
              label: 'Frais de livraison (CHF)',
              type: 'number',
              min: 0,
              defaultValue: 0,
            },
            {
              name: 'freeFrom',
              label: 'Livraison offerte dès (CHF)',
              type: 'number',
              min: 0,
              admin: {
                description: 'Laisser vide pour ne jamais offrir la livraison',
              },
            },
          ],
        },
        {
          name: 'details',
          label: 'Informations de livraison',
          type: 'textarea',
          admin: {
            description: 'Délai, mode d’envoi… Affiché dans le mail de confirmation',
          },
        },
      ],
    },
  ],
}
