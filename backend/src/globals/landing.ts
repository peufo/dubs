import { GlobalConfig, Field } from 'payload/types'

export const Landing: GlobalConfig = {
  slug: 'landing',
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
