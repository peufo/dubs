import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { api } from '$lib/api'

export const load = (async ({ params }) => {
  const action = await api.getById('action', params.actionId, { depth: 6 })
  return { action }
}) satisfies PageLoad
