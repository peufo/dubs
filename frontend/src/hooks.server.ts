import type { Handle } from '@sveltejs/kit'

import { useApi } from '$lib/api'

export const handle = (async ({ event, resolve }) => {
  if (!event.locals.getSession) {
    event.locals.getSession = async () => {
      const token = event.cookies.get('payload-token')
      if (!token) return { user: null }
      const api = useApi(event.fetch)
      return await api.session(new Headers({ Authorization: `JWT ${token}` }))
    }
  }

  return resolve(event)
}) satisfies Handle
