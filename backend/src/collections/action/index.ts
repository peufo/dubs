import type { CollectionConfig, FieldHook, Field } from 'payload/types'
import type { Action as IAction, ValueWithRelation } from 'types'

import { TIME_UNITS_OPTIONS } from './timeUnits'

/** Assure la cohérance entre input et ouput d'action */
const ensureConnection: FieldHook<IAction, ValueWithRelation[]> = async ({
  value,
}) => {
  /*
  const actionIds = value
    .filter((v) => v.relationTo === 'action')
    .map((v) => v.value)
    */

  return value
}

const conditionField: Field = {
  name: 'condition',
  type: 'select',
  defaultValue: 'and',
  options: [
    { label: 'ET', value: 'and' },
    { label: 'OU', value: 'or' },
  ],
}

const portsField: Field = {
  name: 'ports',
  type: 'relationship',
  relationTo: ['product', 'action'],
  hasMany: true,
  filterOptions: ({ id }) => ({ id: { not_equals: id } }),
  hooks: {
    afterChange: [ensureConnection],
  },
}

/** Génère la logique and/or sur un profondeur prédéfinit */
function getPortGroupsField(deep: number): Field {
  const fields: Field[] = [conditionField, portsField]

  if (deep > 0) fields.push(getPortGroupsField(--deep))

  const field: Field = {
    name: 'groups',
    labels: {
      singular: `Groupe`,
      plural: `Groupes`,
    },
    type: 'array',
    fields,
  }

  return field
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
