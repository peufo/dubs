import { CollectionConfig } from 'payload/types'
import { isRole } from './access'

export const Session: CollectionConfig = {
  slug: 'session',
  labels: {
    singular: 'Session',
    plural: 'Sessions',
  },
  access: {
    create: isRole('editor'),
    read: isRole('editor', true),
    update: isRole('editor', true),
    delete: isRole('editor', true),
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
