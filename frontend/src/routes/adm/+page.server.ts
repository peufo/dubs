import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.getSession()
  const role = session.user?.role
  if (role !== 'admin' && role !== 'editor') throw redirect(303, '/')
  return {}
}
