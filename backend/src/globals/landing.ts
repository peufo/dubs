import { GlobalConfig, Field } from 'payload/types'

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: "Page d'accueil",
  admin: {
    // @ts-ignore
    preview: () => '/',
  },
  access: {
    read: () => true,
  },
  fields: [createSection('sectionA'), createSection('sectionB')],
}

function createSection(name: string): Field {
  return {
    name,
    type: 'group',
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
  }
}
