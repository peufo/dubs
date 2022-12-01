import type { CollectionConfig, FieldHook, Field } from 'payload/types'
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

const inputsField: Field = {
  name: 'inputs',
  label: 'Entrées',
  type: 'relationship',
  relationTo: ['product', 'action'],
  hasMany: true,
  filterOptions: ({ id }) => ({ id: { not_equals: id } }),
  hooks: {
    afterChange: [connectionHook],
  },
}

function getInputsFields(deep: number): Field {
  return {
    name: 'inputsCond',
    label: 'Entrées conditionnelles',
    type: 'array',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'condition',
            type: 'select',
            options: ['and', 'or'],
          },
          inputsField,
          // deep > 0 && getInputsFields(deep - 1),
        ],
      },
    ],
  }
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
      label: 'Connexions',
      type: 'collapsible',
      admin: {
        // position: 'sidebar',
      },
      fields: [
        getInputsFields(3),
        inputsField,
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
