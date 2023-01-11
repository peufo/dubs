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
      beforeChange: [ensureRelation(port)],
    },
    fields: [
      {
        name: 'name',
        type: 'text',
      },
      {
        name: 'copy',
        type: 'checkbox',
        admin: {
          hidden: false,
          description: 'Flag to avoid hook propagation',
        },
      },
      {
        name: 'action',
        type: 'relationship',
        relationTo: 'action',
        filterOptions({ id: docId, data, siblingData }) {
          const actionId = (siblingData as { action: string }).action
          const relations = data[port] || []
          const actionIds = relations
            .map((rel) => rel.action)
            .filter((action) => action !== actionId)
          return { id: { not_in: [docId, ...actionIds] } }
        },
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

function ensureRelation(port: Port): FieldHook<Action, Action[Port]> {
  return async ({ value, originalDoc }) => {
    // TODO: handle update relation
    // |- remove remote relation
    // |- add new remote relation

    const previousValue = originalDoc[port]
    const previousIds = previousValue?.map((rel) => rel.id) || []
    const ids = value.map((rel) => rel.id)

    const added = value.filter((rel) => !previousIds.includes(rel.id))
    const removed = previousValue?.filter((rel) => !ids.includes(rel.id)) || []
    const updated =
      previousValue
        ?.filter((rel) => ids.includes(rel.id))
        .map((previousRel) => ({
          previousRel,
          rel: value.find((_) => _.id === previousRel.id),
        }))
        .filter(({ previousRel, rel }) => !deepEqual(previousRel, rel)) || []

    for (const rel of added) {
      addRelation(originalDoc.id, port, rel)
    }

    for (const rel of removed) {
      removeRelation(port, rel)
    }

    if (added.length) console.log('added', added)
    if (removed.length) console.log('removed', removed)
    if (updated.length) console.log('updated', updated)

    return value.map((rel) => ({ ...rel, copy: false }))
  }
}

async function addRelation(
  fromId: string,
  port: Port,
  rel: Action[Port][number]
) {
  if (typeof rel.action !== 'string') return
  if (rel.copy) return
  console.log('ADD RELATION')
  const action = await getAction(rel.action)
  const opposite: Port = port === 'inputs' ? 'outputs' : 'inputs'
  action[opposite].push({ ...rel, action: fromId, copy: true })
  await updateAction(action)
  return
}

async function removeRelation(port: Port, rel: Action[Port][number]) {
  if (typeof rel.action !== 'string') return
  if (rel.copy) return
  const action = await getAction(rel.action)
  const opposite: Port = port === 'inputs' ? 'outputs' : 'inputs'
  action[opposite] = action[opposite].filter(({ id }) => id !== rel.id)
  console.log('REMOVE RELATION', action[opposite])
  await updateAction(action)
}

/** Copy relation into the linked actions */
async function ensureRelation2(
  from: string | Action,
  to: string | Action,
  rel: Action[Port][number]
): Promise<void> {
  const actionFrom = typeof from === 'object' ? from : await getAction(from)
  const actionTo = typeof to === 'object' ? to : await getAction(to)

  let relFrom = actionFrom.outputs.find((rel) => rel.id === rel.id)
  let relTo = actionTo.inputs.find((rel) => rel.id === rel.id)

  let diffFrom = false
  let diffTo = false

  if (!relFrom) {
    diffFrom = true
    actionFrom.outputs.push(rel)
  } else {
    for (const key in rel) {
      if (relFrom[key] !== rel[key]) {
        diffFrom = true
        relFrom[key] = rel[key]
      }
    }
  }

  if (!relTo) {
    diffTo = true
    actionTo.inputs.push(rel)
  } else {
    for (const key in rel) {
      if (relTo[key] !== rel[key]) {
        diffTo = true
        relTo[key] = rel[key]
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
