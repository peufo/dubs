import type { Field } from 'payload/types'

export function createRelationFields(name = 'ports'): Field[] {
  return [
    {
      type: 'row',
      fields: [
        {
          name: 'action',
          type: 'relationship',
          relationTo: 'action',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: true,
          required: true,
        },
      ],
    },
    {
      name: 'condition',
      type: 'code',
      defaultValue: `(${name}) => true`,
      admin: {
        language: 'js',
        description: 'return true, false or undefined',
        condition: (data, siblingData) => !siblingData.required,
      },
    },
  ]
}
