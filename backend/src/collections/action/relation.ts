import deepEqual from 'deep-equal'
import type { Field } from 'payload/types'
import payload from 'payload'
import type { FieldHook } from 'payload/types'

import type { Action } from 'types'

import { LocationField } from '../../components/LocationField'

type Port = 'inputs' | 'outputs'

export function createRelationField(port: Port): Field {
  return {
    name: port,
    type: 'array',
    hooks: {
      beforeChange: [beforeChange(port)],
    },
    fields: [
      {
        name: 'name',
        type: 'text',
      },
      {
        name: 'action',
        type: 'relationship',
        relationTo: 'action',
      },
      {
        name: 'groups',
        type: 'text',
      },
      {
        name: 'product',
        type: 'relationship',
        relationTo: 'product',
      },
      {
        name: 'location',
        type: 'point',
        admin: {
          components: {
            Field: LocationField,
          },
        },
      },
    ],
  }
}

function beforeChange(port: Port): FieldHook<Action, Action[Port]> {
  return async ({ value, originalDoc, req }) => {
    // TODO: stop hook call propagation
    // TODO: handle remove relation
    // TODO: handle update relation
    // |- remove remote relation
    // |- add new remote relation

    const original = originalDoc[port]
    const originalIds = original?.map((rel) => rel.id) || []
    const valueIds = value.map((rel) => rel.id)

    const added = value.filter((rel) => !originalIds.includes(rel.id))
    const removed = original?.filter((rel) => !valueIds.includes(rel.id)) || []
    const updated =
      original
        ?.filter((rel) => valueIds.includes(rel.id))
        .map((rel) => ({ rel, newRel: value.find((_) => _.id === rel.id) }))
        .filter(({ rel, newRel }) => !deepEqual(rel, newRel)) || []

    for (const rel of added) {
      addRelation(originalDoc._id, port, rel)
    }

    if (added.length) console.log('added', added)
    if (removed.length) console.log('removed', removed)
    if (updated.length) console.log('updated', updated)

    return value
  }
}

async function addRelation(
  fromId: string,
  port: Port,
  rel: Action[Port][number]
) {
  if (typeof rel.action !== 'string') return
  const action = await getAction(rel.action)
  const opposite: Port = port === 'inputs' ? 'outputs' : 'inputs'
  action[opposite].push({ ...rel, action: fromId })

  console.log({ [opposite]: action[opposite] })
  await updateAction(action)
  return
}

/** Copy relation into the linked actions */
async function ensureRelation(
  from: string | Action,
  to: string | Action,
  newRel: Action[Port][number]
): Promise<void> {
  const actionFrom = typeof from === 'object' ? from : await getAction(from)
  const actionTo = typeof to === 'object' ? to : await getAction(to)

  let relFrom = actionFrom.outputs.find((rel) => rel.id === newRel.id)
  let relTo = actionTo.inputs.find((rel) => rel.id === newRel.id)

  let diffFrom = false
  let diffTo = false

  if (!relFrom) {
    diffFrom = true
    actionFrom.outputs.push(newRel)
  } else {
    for (const key in newRel) {
      if (relFrom[key] !== newRel[key]) {
        diffFrom = true
        relFrom[key] = newRel[key]
      }
    }
  }

  if (!relTo) {
    diffTo = true
    actionTo.inputs.push(newRel)
  } else {
    for (const key in newRel) {
      if (relTo[key] !== newRel[key]) {
        diffTo = true
        relTo[key] = newRel[key]
      }
    }
  }

  if (diffFrom) await updateAction(actionFrom)
  if (diffTo) await updateAction(actionTo)
}

function getAction(id: string) {
  return payload.findByID<Action>({
    collection: 'action',
    depth: 0,
    id,
  })
}

function updateAction(action: Action) {
  return payload.update({
    collection: 'action',
    id: action.id,
    data: action,
  })
}
