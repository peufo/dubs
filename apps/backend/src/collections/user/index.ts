import { CollectionConfig } from 'payload/types'
import { isRole, isRoleField } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isRole('editor'),
    read: isRole('editor', true),
    update: isRole('editor', true),
    delete: isRole('editor', true),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: ['admin', 'editor', 'user'],
      saveToJWT: true,
      access: {
        create: isRoleField('editor'),
        update: isRoleField('editor'),
      },
    },
  ],
}
