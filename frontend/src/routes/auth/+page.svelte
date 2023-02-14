<script lang="ts">
  import { signIn } from '@auth/sveltekit/client'
  import { page } from '$app/stores'
  import { mdiFacebook, mdiGithub, mdiGoogle } from '@mdi/js'

  import type { PageData } from './$types'
  import Icon from '$lib/material/Icon.svelte'
  import Title from '$lib/Title.svelte'

  export let data: PageData

  const providers = [
    { id: 'google', icon: mdiGoogle },
    { id: 'facebook', icon: mdiFacebook },
    { id: 'github', icon: mdiGithub },
  ]
</script>

<Title subtitle="Authentification" />

<div class="p-4 sm:grid place-content-center min-h-[500px]">
  <div
    class="p-8 w-full sm:w-[360px] flex flex-col gap-4 border bg-white shadow-md rounded-lg"
  >
    {#if $page.url.search.match(/error=CredentialsSignin/)}
      <div
        class="px-4 py-2 rounded bg-secondary text-white text-center font-bold text-lg"
      >
        Mauvais identifiants
      </div>
    {/if}

    <form
      method="POST"
      action="/auth/callback/credentials"
      class="flex flex-col gap-4 font-semibold"
    >
      <input type="hidden" name="csrfToken" value={data.csrfToken} />
      <div>
        <label class="block w-full" for="email"> Email </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder=""
          class="w-full px-4 py-2 rounded-md border font-normal"
        />
      </div>
      <div>
        <label class="block w-full" for="password"> Mot de passe </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder=""
          class="w-full px-4 py-2 rounded-md border"
        />
      </div>
      <button
        type="submit"
        class="
          w-full px-4 py-2 rounded text-lg
          bg-primary-light
          text-primary-dark hover:ring-1 ring-primary-dark
        "
      >
        Connexion
      </button>
    </form>

    <hr />

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
  </div>
</div>
