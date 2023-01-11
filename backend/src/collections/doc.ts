import type { CollectionConfig, Field, FieldHook } from 'payload/types'

function createField(name: string): Field {
  return {
    name,
    type: 'array',
    hooks: {
      afterChange: [createHook(name)],
    },
    fields: [
      {
        type: 'text',
        name: 'name',
      },
    ],
  }
}

function createHook(name: string): FieldHook {
  return async ({ value, previousValue }) => {
    console.log(name, { value, previousValue })
  }
}

export const Doc: CollectionConfig = {
  slug: 'doc',
  fields: [createField('a'), createField('b')],
}
