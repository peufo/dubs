import type { CollectionConfig } from 'payload/types'

export const Item: CollectionConfig = {
  slug: 'item',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'product',
      required: true,
    },
  ],
}
