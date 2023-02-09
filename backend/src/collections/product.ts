import type { CollectionConfig } from 'payload/types'

export const Product: CollectionConfig = {
  slug: 'product',
  labels: {
    singular: 'Produit',
    plural: 'Produits',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'detail', 'price', 'state', 'tags'],
    listSearchableFields: ['name', 'detail', 'state', 'tags'],
    preview: (doc) => `/shop/${doc.id}`,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Nom du produit',
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 120,
        },
        {
          name: 'detail',
          label: 'Détail',
          type: 'text',
          admin: {
            description: 'Information complémentaire',
          },
          minLength: 3,
          maxLength: 50,
        },
        {
          name: 'state',
          type: 'select',
          label: 'État',
          defaultValue: 'draft',
          required: true,
          admin: {
            description:
              'Seul les produits "Disponible" et "Bientôt diponible" ne sont pas visible sur le site.',
          },
          options: [
            { value: 'draft', label: 'Brouillon' },
            { value: 'comingSoon', label: 'À venire' },
            { value: 'available', label: 'Disponible' },
            { value: 'notAvailable', label: 'Non disponible' },
            { value: 'archived', label: 'Archiver' },
          ],
        },
        {
          name: 'price',
          type: 'number',
          label: 'Prix',
          min: 0,
          defaultValue: 0,
          admin: {
            description:
              "Prix de base auquel vient s'ajouter celui des options",
          },
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'variables',
      type: 'blocks',
      blocks: [
        {
          slug: 'options',
          labels: {
            singular: "liste d'options",
            plural: "listes d'options",
          },
          fields: [
            {
              name: 'options',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      label: "Valeur de l'option",
                      minLength: 1,
                      maxLength: 30,
                    },
                    {
                      name: 'price',
                      label: 'prix',
                      type: 'number',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'available',
                  type: 'checkbox',
                  label: 'Disponible',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
