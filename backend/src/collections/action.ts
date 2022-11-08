import type { CollectionConfig, FieldHook } from 'payload/types'
import payload from 'payload'
import type { Action as IAction, ValueWithRelation } from 'types'

/** Assure la cohérance entre input et ouput d'action */
const connectionHook: FieldHook<IAction, ValueWithRelation[]> = async ({
  value,
}) => {
  /*
  const actionIds = value
    .filter((v) => v.relationTo === 'action')
    .map((v) => v.value)
    */

  return value
}

export const Action: CollectionConfig = {
  slug: 'action',
  admin: {
    useAsTitle: 'name',
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
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 120,
        },
      ],
    },
    {
      name: 'desciption',
      type: 'richText',
    },

    {
      name: 'inputs',
      type: 'relationship',
      relationTo: ['product', 'action'],
      hasMany: true,
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      hooks: {
        afterChange: [connectionHook],
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ouputs',
      type: 'relationship',
      relationTo: ['product', 'action'],
      hasMany: true,
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'resource',
      type: 'relationship',
      relationTo: 'resource',
    },
    {
      name: 'moving',
      type: 'checkbox',
      admin: {
        description: "L'action déplace le produit d'une ressource à l'autre",
      },
    },
    {
      name: 'resourceTo',
      type: 'relationship',
      relationTo: 'resource',
      admin: {
        condition: (data) => data.moving,
      },
    },

    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'action',
      filterOptions: ({ id }) => ({
        id: { not_equals: id },
      }),
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
