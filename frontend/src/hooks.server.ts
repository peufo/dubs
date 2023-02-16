import type { Handle } from '@sveltejs/kit'
import { SvelteKitAuth } from '@auth/sveltekit'
import { skipCSRFCheck } from '@auth/core'
import z from 'zod'

import { useApi } from '$lib/api'

const credentialsShema = z.object({
  email: z.string(),
  password: z.string(),
})

export const handle = (({ event, resolve }) =>
  SvelteKitAuth({
    skipCSRFCheck,
    providers: [
      {
        id: 'credentials',
        name: 'Credentials',
        type: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Mot de passe', type: 'password' },
        },
        options: {},

        async authorize(credentials) {
          console.log({ credentials })
          try {
            const api = useApi(event.fetch)
            const { user } = await api.login(
              credentialsShema.parse(credentials)
            )
            return user
          } catch (error) {
            return null
          }
        },
      },
    ],
  })({ event, resolve })) satisfies Handle
