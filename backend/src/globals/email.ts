import { GlobalConfig, Field } from 'payload/types'

export const Email: GlobalConfig = {
  slug: 'email',
  label: 'Email',
  fields: [
    {
      name: 'order',
      type: 'group',
      label: 'Nouvelle commande',
      fields: [
        {
          name: 'notify',
          label: 'Notifier',
          type: 'relationship',
          relationTo: 'user',
          hasMany: true,
          filterOptions: () => ({ role: { in: ['admin', 'editor'] } }),
          admin: {
            description: `Seront notifier par mail lors d'une nouvelle commande`,
          },
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Merci pour votre commande',
        },
        {
          name: 'message',
          type: 'textarea',
        },
      ],
    },
  ],
}
