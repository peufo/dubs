import type { Handle } from '@sveltejs/kit'
import { SvelteKitAuth } from '@auth/sveltekit'
import z from 'zod'

import { useApi } from '$lib/api'
import { payloadAdapter } from '$lib/utils/adapter'

export const handle = (({ event, resolve }) =>
  SvelteKitAuth({
    trustHost: true,
    adapter: payloadAdapter,
    session: {
      strategy: 'jwt',
    },

    providers: [
      {
        id: 'credentials',
        name: 'Credentials',
        type: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Mot de passe', type: 'password' },
        },
        async authorize(credentials) {
          try {
            const credentialsShema = z.object({
              email: z.string(),
              password: z.string(),
            })
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
