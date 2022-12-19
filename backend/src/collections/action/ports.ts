import type { Field, FieldHook } from 'payload/types'
import type { Action as IAction, ValueWithRelation } from '../../old/types'

/** Assure la cohérance entre input et ouput d'action */
const ensureConnection: FieldHook<IAction, ValueWithRelation[]> = async ({
  value,
}) => {
  // TODO
  /*
  const actionIds = value
    .filter((v) => v.relationTo === 'action')
    .map((v) => v.value)
    */

  return value
}

export const conditionField: Field = {
  name: 'condition',
  type: 'select',
  defaultValue: 'and',
  options: [
    { label: 'ET', value: 'and' },
    { label: 'OU', value: 'or' },
  ],
}

export const portsField: Field = {
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
export function getPortGroupsField(deep: number): Field {
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
