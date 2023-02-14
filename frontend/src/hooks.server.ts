import { SvelteKitAuth } from '@auth/sveltekit'

export const handle = SvelteKitAuth({
  theme: {
    colorScheme: 'light',
    logo: '/favicon.ico',
    brandColor: '#FFA400',
    buttonText: '#8A5200',
  },
  providers: [
    {
      id: 'payload',
      name: 'Payload',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      options: {},
      async authorize(credentials, req) {
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    },
  ],
})
