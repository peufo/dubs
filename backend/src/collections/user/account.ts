import { CollectionConfig } from 'payload/types'
import { isRole, isRoleOrSelf } from './access'

export const Account: CollectionConfig = {
  slug: 'account',
  labels: {
    singular: 'Compte',
    plural: 'Comptes',
  },
  access: {
    create: isRole('editor'),
    read: isRole('admin'),
    update: isRoleOrSelf('editor'),
    delete: isRoleOrSelf('editor'),
  },
  fields: [
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'provider',
      type: 'text',
      required: true,
    },
    {
      name: 'providerAccountId',
      type: 'text',
      required: true,
    },
    {
      name: 'refresh_token',
      type: 'text',
    },
    {
      name: 'access_token',
      type: 'text',
    },
    {
      name: 'expires_at',
      type: 'number',
    },
    {
      name: 'token_type',
      type: 'text',
    },
    {
      name: 'scope',
      type: 'text',
    },
    {
      name: 'session_state',
      type: 'text',
    },
    {
      name: 'userId',
      type: 'text',
    },
  ],
}
