import { CollectionConfig } from 'payload/types'
import { isRole, isRoleOrSelf } from './access'

export const Session: CollectionConfig = {
  slug: 'session',
  labels: {
    singular: 'Session',
    plural: 'Sessions',
  },
  access: {
    create: isRole('editor'),
    read: isRole('admin'),
    update: isRoleOrSelf('editor'),
    delete: isRoleOrSelf('editor'),
  },
  fields: [
    {
      name: 'expires',
      type: 'date',
      required: true,
    },
    {
      name: 'sessionToken',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'userId',
      type: 'text',
      required: true,
    },
  ],
}
