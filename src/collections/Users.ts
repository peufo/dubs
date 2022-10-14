import type { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'userName',
  },
  fields: [
    {
      name: 'userName',
      type: 'text',
      minLength: 3,
      maxLength: 30,
      unique: true,
    },
  ],
}
