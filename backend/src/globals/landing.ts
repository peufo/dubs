import { GlobalConfig, Field } from 'payload/types'

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: "Page d'accueil",
  admin: {
    preview: () => '/',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
