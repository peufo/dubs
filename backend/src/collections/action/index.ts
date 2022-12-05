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

const connectionField: Field = {
  name: 'inputs',
  label: 'Entrées',
  type: 'relationship',
  relationTo: ['product', 'action'],
  hasMany: true,
  filterOptions: ({ id }) => ({ id: { not_equals: id } }),
  hooks: {
    afterChange: [ensureConnection],
  },
}

const conditionField: Field = {
  name: 'condition',
  type: 'select',
  options: [
    { label: 'ET', value: 'and' },
    { label: 'OU', value: 'or' },
  ],
}

/** Génère la logique and/or sur un profondeur prédéfinit */
function getLogicalConnectionFields(
  deep: number,
  name: 'inputs' | 'outputs'
): Field {
  const fields: Field[] = [conditionField, connectionField]

  if (deep > 0) fields.push(getLogicalConnectionFields(--deep, name))

  const label = name === 'inputs' ? `Groupe d'entrée` : `Groupe de sortie`
  const field: Field = {
    name,
    label,
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
      label: 'Entrées',
      type: 'collapsible',
      fields: [
        conditionField,
        connectionField,
        getLogicalConnectionFields(3, 'inputs'),
      ],
    },
    {
      label: 'Sorties',
      type: 'collapsible',
      fields: [
        conditionField,
        connectionField,
        getLogicalConnectionFields(3, 'outputs'),
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
