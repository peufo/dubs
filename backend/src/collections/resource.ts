import type { CollectionConfig } from 'payload/types'
import { LocationField } from '../components/LocationField'

export const Resource: CollectionConfig = {
  slug: 'resource',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description'],
    description: `
      Une resource permet de réalisé des actions sur des produits sans être consomé.
      Il peut par exemple sagir d'un locale, d'une machine ou d'un logiciel.
    `,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 120,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'immaterial',
      label: 'Non materiel',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: `Cette resource n'a pas de propriété physique (Ex. un logiciel)`,
      },
    },
    {
      name: 'relative',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Cette ressource est relative à une resource parent.',
        condition: (data) => !data.immaterial,
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'resource',
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      admin: {
        condition: (data) => !data.immaterial && data.relative,
      },
    },
    {
      name: 'location',
      type: 'point',
      required: true,
      admin: {
        components: {
          Field: LocationField,
        },
        condition: (data) => !data.immaterial && !data.relative,
      },
    },
  ],
}
