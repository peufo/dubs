import type { Handle, HandleFetch } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

import { useApi } from '$lib/api'

const backendUrl = env.BACKEND_URL || 'http://localhost:5555'

export const handle = (async ({ event, resolve }) => {
  if (!event.locals.getSession) {
    event.locals.getSession = async () => {
      const api = useApi(event.fetch, event.cookies)
      return await api.session()
    }
  }

  const response = await resolve(event)

  return response
}) satisfies Handle

// Pendant le rendu serveur, les appels à /api partent directement vers le backend
export const handleFetch = (async ({ event, request, fetch }) => {
  const url = new URL(request.url)
  if (url.origin === event.url.origin && url.pathname.startsWith('/api/')) {
    request = new Request(`${backendUrl}${url.pathname}${url.search}`, request)
  }
  return fetch(request)
}) satisfies HandleFetch
