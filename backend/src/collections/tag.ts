import { CollectionConfig } from 'payload/types'

export const Tag: CollectionConfig = {
  slug: 'tag',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
