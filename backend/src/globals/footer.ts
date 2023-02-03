import { GlobalConfig } from 'payload/types'
import {
  mdiPhone,
  mdiEmailOutline,
  mdiInstagram,
  mdiWhatsapp,
  mdiFacebook,
} from '@mdi/js'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Pied de page',
  admin: {
    // @ts-ignore
    preview: () => '/',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'liens',
      labels: {
        singular: 'lien',
        plural: 'liens',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Téléphone', value: mdiPhone },
            { label: 'Email', value: mdiEmailOutline },
            { label: 'Instagram', value: mdiInstagram },
            { label: 'Whatsapp', value: mdiWhatsapp },
            { label: 'Facebook', value: mdiFacebook },
          ],
        },
      ],
    },
  ],
}
