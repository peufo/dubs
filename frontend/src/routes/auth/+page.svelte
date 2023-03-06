<script lang="ts">
  import { signIn, signOut } from '@auth/sveltekit/client'
  import {
    mdiApple,
    mdiFacebook,
    mdiGithub,
    mdiGoogle,
    mdiInstagram,
  } from '@mdi/js'

  import type { PageData } from './$types'
  import Icon from '$lib/material/Icon.svelte'
  import Title from '$lib/Title.svelte'
  import Label from '$lib/material/Label.svelte'
  import Button from '$lib/material/Button.svelte'

  export let data: PageData

  let email = ''
  let password = ''
  let errorMessage = ''

  const providers = [
    { id: 'google', icon: mdiGoogle },
    { id: 'facebook', icon: mdiFacebook },
    { id: 'apple', icon: mdiApple },
  ]

  async function handleSubmitCredentials() {
    const res = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/auth',
      email,
      password,
    })

    const { url } = await res?.json()
    if (!url) return
    const error = new URL(url).searchParams.get('error')
    errorMessage = error ? 'Mauvais identifants' : ''
  }
</script>

<Title subtitle="Authentification" />

<div class="p-4 sm:grid place-content-center min-h-[500px]">
  <div
    class="p-8 w-full sm:w-[360px] flex flex-col gap-4 border bg-white shadow-md rounded-lg"
  >
    {#if errorMessage}
      <div
        class="p-2 rounded border border-orange-700 text-orange-700 text-center"
      >
        {errorMessage}
      </div>
    {/if}

    {#if data.session?.user}
      <div class="font-semibold text-lg text-center">
        Bonjour {data.session.user.name} 👋
      </div>
      <Button secondary on:click={signOut}>Déconnexion</Button>
    {:else}
      <form
        on:submit|preventDefault={handleSubmitCredentials}
        class="flex flex-col gap-4 font-semibold"
      >
        <input type="hidden" name="csrfToken" value={data.csrfToken} />
        <Label key="email">
          <input
            type="email"
            name="email"
            bind:value={email}
            class="w-full px-4 py-2 rounded-md border font-normal"
          />
        </Label>
        <Label key="password" label="Mot de passe">
          <input
            type="password"
            name="password"
            bind:value={password}
            class="w-full px-4 py-2 rounded-md border font-normal"
          />
        </Label>
        <Button primary>Connexion</Button>
      </form>

      <div class="flex gap-2">
        <hr class="grow translate-y-3" />
        <div class="text-sm opacity-50">Ou continuer avec</div>
        <hr class="grow translate-y-3" />
      </div>

      <div class="flex gap-4 justify-center">
        {#each providers as { id, icon }}
          <button
            title="Connexion avec {id.toUpperCase()}"
            on:click={() => signIn(id)}
            class="
            rounded px-8 py-2 bg-red 
            bg-primary-light
            fill-primary-dark hover:ring-1 ring-primary-dark
          "
          >
            <Icon path={icon} />
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>
