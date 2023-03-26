import { GlobalConfig, Field } from 'payload/types'

export const Process: GlobalConfig = {
  slug: 'process',
  label: 'Processus',
  admin: {
    preview: () => '/process',
  },
  access: {
    read: () => true,
  },
  fields: [{ name: 'action', type: 'relationship', relationTo: 'action' }],
}
