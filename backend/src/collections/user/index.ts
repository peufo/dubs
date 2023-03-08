import { CollectionConfig } from 'payload/types'
import { isRole, isRoleField } from './access'

export { Account } from './account'
export { Session } from './session'

export const User: CollectionConfig = {
  slug: 'user',
  auth: true,
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: isRole('editor', true),
    update: isRole('editor', true),
    delete: isRole('editor', true),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'emailVerified',
      type: 'date',
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
