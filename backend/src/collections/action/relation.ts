import deepEqual from 'deep-equal'
import type { Field } from 'payload/types'
import payload from 'payload'
import type { FieldHook } from 'payload/types'

import type { Action, Port, Relation } from 'types'

import { LocationField } from '../../components/LocationField'

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
        type: 'collapsible',
        label: 'details',
        admin: {
          initCollapsed: true,
        },
        fields: [
          {
            name: 'groups',
            type: 'text',
          },
          /*
          {
            name: 'product',
            type: 'relationship',
            relationTo: 'product',
          },
          */
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
      },
    ],
  }
}

function ensureRelation(port: Port): FieldHook<Action, Action[Port]> {
  const opposite: Port = port === 'inputs' ? 'outputs' : 'inputs'

  return async ({ value, originalDoc, data }) => {
    // Prevent infinit execution
    if (data.remoteUpdate) {
      data.remoteUpdate = false
      return value
    }

    // See: https://github.com/payloadcms/payload/discussions/1851
    const docId = (originalDoc as Action & { _id: string })._id

    const previousValue = originalDoc[port]
    const previousIds = previousValue?.map((rel) => rel.id) || []
    const ids = value.map((rel) => rel.id)

    const added = value.filter((rel) => !previousIds.includes(rel.id))
    const removed =
      previousValue?.filter((rel) => rel.action && !ids.includes(rel.id)) || []
    const updated =
      previousValue
        ?.filter((rel) => ids.includes(rel.id))
        .map((previousRel) => ({
          previousRel,
          rel: value.find((_) => _.id === previousRel.id),
        }))
        .filter(({ previousRel, rel }) => !deepEqual(previousRel, rel)) || []

    for (const rel of added) {
      await addRelation(docId, rel)
    }

    for (const rel of removed) {
      await removeRelation(rel)
    }

    for (const { rel, previousRel } of updated) {
      if (rel.action === previousRel.action) updateRelation(docId, rel)
      else {
        await removeRelation(previousRel)
        await addRelation(docId, rel)
      }
    }

    return value.map((rel) => ({ ...rel }))
  }

  async function addRelation(fromId: string, rel: Relation) {
    if (!rel.action) return
    try {
      const remote = await getAction(rel.action)
      remote[opposite].push({ ...rel, action: fromId })
      return updateRemoteAction(remote)
    } catch (error) {
      console.log('addRelation', error)
    }
  }

  async function removeRelation(rel: Relation) {
    if (!rel.action) return
    try {
      const remote = await getAction(rel.action)
      remote[opposite] = remote[opposite].filter(({ id }) => id !== rel.id)
      return updateRemoteAction(remote)
    } catch (error) {
      console.log('removeRelation', error)
    }
  }

  async function updateRelation(fromId: string, rel: Relation) {
    if (!rel.action) return
    try {
      const remote = await getAction(rel.action)
      remote[opposite] = remote[opposite].map((r) => {
        if (r.id !== rel.id) return r
        return { ...rel, action: fromId }
      })
      return updateRemoteAction(remote)
    } catch (error) {
      console.log('updateRelation', error)
    }
  }
}

function getAction(action: string | Action) {
  if (typeof action === 'object') return action
  return payload.findByID<Action>({
    collection: 'action',
    depth: 0,
    id: action,
  })
}

function updateRemoteAction(action: Action) {
  return payload.update({
    collection: 'action',
    depth: 0,
    id: action.id,
    data: { ...action, remoteUpdate: true },
  })
}
