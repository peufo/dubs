import type { PageLoad } from './$types'

export const load = (async ({ fetch }) => {
  const res = await fetch('/auth/csrf')
  const { csrfToken } = (await res.json()) as { csrfToken: string }
  return { csrfToken }
}) satisfies PageLoad
