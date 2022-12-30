import type { CollectionConfig } from 'payload/types'

import { TIME_UNITS_OPTIONS } from './timeUnits'
import { createRelationFields } from './relation'

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
      name: 'description',
      type: 'richText',
    },
    {
      name: 'inputs',
      label: 'Entrées',
      type: 'array',
      fields: createRelationFields('inputs'),
    },
    {
      name: 'outputs',
      label: 'Sorties',
      type: 'array',
      fields: createRelationFields('ouputs'),
    },
    {
      name: 'resource',
      type: 'relationship',
      relationTo: 'resource',
    },
    {
      label: 'Temporalité',
      type: 'collapsible',
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
  ],
}
