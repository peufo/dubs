import type { Actions, HttpError } from '@sveltejs/kit'
import z from 'zod'
import { useApi } from '$lib/api'

export const actions = {
  default: async ({ request, fetch }) => {
    try {
      const formData = await request.formData()
      const credentialsShema = z.object({
        email: z.string(),
        password: z.string(),
      })
      const credentials = credentialsShema.parse(Object.fromEntries(formData))
      const api = useApi(fetch)

      const resLogin = await api.login(credentials)
      return resLogin
    } catch (error: any) {
      const { status } = error as HttpError
      const { message } = (error as HttpError).body
      return { error: { status, message } }
    }
  },
} satisfies Actions
