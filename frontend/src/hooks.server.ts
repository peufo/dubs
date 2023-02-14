import type { Handle } from '@sveltejs/kit'
import { SvelteKitAuth } from '@auth/sveltekit'
import z from 'zod'
import { useApi } from '$lib/api'

const credentialsShema = z.object({
  email: z.string(),
  password: z.string(),
})

export const handle = (({ event, resolve }) =>
  SvelteKitAuth({
    theme: {
      colorScheme: 'light',
      logo: '/favicon.ico',
      brandColor: '#FFA400',
      buttonText: '#8A5200',
    },
    trustHost: true,
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
          const api = useApi(event.fetch)
          try {
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
