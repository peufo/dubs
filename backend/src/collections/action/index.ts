import type { CollectionConfig } from 'payload/types'

import { TIME_UNITS_OPTIONS } from './timeUnits'
import { conditionField, portsField, getPortGroupsField } from './ports'

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
      name: 'input',
      label: 'Entrées',
      type: 'group',
      fields: [conditionField, portsField, getPortGroupsField(2)],
    },
    {
      name: 'output',
      label: 'Sorties',
      type: 'group',
      fields: [conditionField, portsField, getPortGroupsField(2)],
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
