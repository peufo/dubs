import type { CollectionConfig, FieldHook } from 'payload/types'
import type { Action as IAction, ValueWithRelation } from 'types'

import { TIME_UNITS_OPTIONS } from './timeUnits'

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
    defaultColumns: ['name', 'tags', 'inputs', 'outputs'],
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
      name: 'tags',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true,
    },
    {
      name: 'temporality',
      label: 'Temporalité',
      type: 'group',
      fields: [
        {
          name: 'timeUnit',
          label: 'Unité de temps',
          type: 'select',
          options: TIME_UNITS_OPTIONS,
        },
        {
          name: 'estimatedDuration',
          label: 'Durée éstimé',
          type: 'number',
          min: 0,
        },
      ],
    },
    {
      name: 'desciption',
      type: 'richText',
    },
    {
      label: 'Connections',
      type: 'collapsible',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'inputs',
          label: 'Entrées',
          type: 'relationship',
          relationTo: ['product', 'action'],
          hasMany: true,
          filterOptions: ({ id }) => ({ id: { not_equals: id } }),
          hooks: {
            afterChange: [connectionHook],
          },
        },
        {
          name: 'outputs',
          label: 'Sorties',
          type: 'relationship',
          relationTo: ['product', 'action'],
          hasMany: true,
          filterOptions: ({ id }) => ({ id: { not_equals: id } }),
        },
      ],
    },
    {
      label: 'Ressources',
      type: 'collapsible',
      admin: {
        position: 'sidebar',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'resource',
          type: 'relationship',
          relationTo: 'resource',
        },
        {
          name: 'moving',
          type: 'checkbox',
          admin: {
            description:
              "L'action déplace le produit d'une ressource à l'autre",
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
      ],
    },
  ],
}
