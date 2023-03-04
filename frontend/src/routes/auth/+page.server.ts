import type { Actions, HttpError } from '@sveltejs/kit'
import z from 'zod'
import { signIn } from '@auth/sveltekit/client'
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
      // const api = useApi(fetch)
      // const resLogin = await api.login(credentials)
      // return resLogin
      /*
      const res = await fetch(_signInUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Return-Redirect": "1",
        },
        // @ts-expect-error -- ignore
        body: new URLSearchParams({
          ...options,
          csrfToken,
          callbackUrl,
        }),
      })
      */

      const res = await fetch('/auth/callback/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Return-Redirect': '1',
        },
        body: JSON.stringify({ ...credentials }),
      })

      console.log({
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        redirected: res.redirected,
        headers: [...res.headers.entries()],
        json: await res.json(),
      })

      return { success: true }
    } catch (error: any) {
      console.log(error)
      return { success: false, error: (error.message as string) || 'Erreur' }
    }
  },
} satisfies Actions
