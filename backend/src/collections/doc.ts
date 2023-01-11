import type {
  CollectionConfig,
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
  FieldHook,
} from 'payload/types'

/* Result of "payload generate:types" */
interface IDoc {
  id: string
  name?: string
  createdAt: string
  updatedAt: string
}

interface IDocWithNativeFields extends IDoc {
  _id?: string
  __v?: number
}

function testDocType(labels: string[], doc: IDocWithNativeFields) {
  const correct = doc && doc.id && !doc._id && !doc.__v
  console.log(correct ? '✔️' : '❌', labels.join('\t'))
}

const fieldBeforeChange: FieldHook<IDoc> = ({ originalDoc, previousDoc }) => {
  testDocType(['field', 'beforeChange', 'previousDoc'], previousDoc)
  testDocType(['field', 'beforeChange', 'originalDoc'], originalDoc)
}

const fieldAfterChange: FieldHook<IDoc> = ({ originalDoc, previousDoc }) => {
  testDocType(['field', 'afterChange', 'previousDoc'], previousDoc)
  testDocType(['field', 'afterChange', 'originalDoc'], originalDoc)
}

const collectionBeforeChange: CollectionBeforeChangeHook<IDoc> = ({
  originalDoc,
}) => {
  testDocType(['collection', 'beforeChange', 'originalDoc'], originalDoc)
}
const collectionAfterChange: CollectionAfterChangeHook<IDoc> = ({
  previousDoc,
}) => {
  testDocType(['collection', 'afterChange', 'originalDoc'], previousDoc)
}

export const Doc: CollectionConfig = {
  slug: 'doc',
  hooks: {
    beforeChange: [collectionBeforeChange],
    afterChange: [collectionAfterChange],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      hooks: {
        beforeChange: [fieldBeforeChange],
        afterChange: [fieldAfterChange],
      },
    },
  ],
}
