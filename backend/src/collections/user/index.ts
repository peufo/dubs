import { CollectionConfig } from 'payload/types'
import { isRole, isRoleOrSelf, isRoleField } from './access'

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
    defaultColumns: ['name', 'surname', 'email'],
  },
  access: {
    create: () => true,
    read: isRoleOrSelf('editor'),
    update: isRoleOrSelf('editor'),
    delete: isRoleOrSelf('editor'),
    admin: isRole('editor'),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
      label: 'Prénom',
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    {
      name: 'surname',
      type: 'text',
      label: 'Nom',
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
    {
      name: 'street',
      type: 'text',
      label: 'Rue et numéro',
      minLength: 3,
      maxLength: 50,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'zipCode',
          type: 'text',
          label: 'Code postal',
          minLength: 4,
          maxLength: 4,
        },
        {
          name: 'city',
          type: 'text',
          label: 'Ville',
          minLength: 2,
          maxLength: 50,
        },
      ],
    },
    {
      name: 'emailVerified',
      type: 'date',
    },
  ],
}
