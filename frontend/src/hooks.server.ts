import type { Handle } from '@sveltejs/kit'

import { useApi } from '$lib/api'

export const handle = (async ({ event, resolve }) => {
  if (!event.locals.getSession) {
    event.locals.getSession = async () => {
      const api = useApi(event.fetch, event.cookies)
      return await api.session()
    }
  }

  const response = await resolve(event)
  response.headers.append('Access-Control-Allow-Origin', `*`)
  return response
}) satisfies Handle
