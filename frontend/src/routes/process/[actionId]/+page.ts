import type { PageLoad } from './$types'
import type { Action, ActionWithConnections } from 'types'
import { api } from '$lib/api'

export const load = (async ({ params }) => {
  const [_action, { docs: statesInput }, { docs: statesOutput }] =
    await Promise.all([
      api.getById('action', params.actionId),
      api.get('state', {
        where: { 'to.action': { equals: params.actionId } },
      }),
      api.get('state', {
        where: { 'from.action': { equals: params.actionId } },
      }),
    ])

  const action: ActionWithConnections = {
    ..._action,
    inputs: statesInput,
    outputs: statesOutput,
  }

  return { action }
}) satisfies PageLoad
