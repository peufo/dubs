import type { Field } from 'payload/types'

export const sections: Field = {
  name: 'sections',
  type: 'array',
  fields: [
    {
      name: 'text',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      type: 'select',
      options: ['row', 'row_reverse', 'col', 'col_reverse'],
      defaultValue: 'row',
    },
  ],
}
