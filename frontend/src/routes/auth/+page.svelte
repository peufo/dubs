<script lang="ts">
  import { signIn, signOut } from '@auth/sveltekit/client'
  import { enhance } from '$app/forms'
  import { mdiFacebook, mdiGithub, mdiGoogle } from '@mdi/js'

  import type { PageData, ActionData } from './$types'
  import Icon from '$lib/material/Icon.svelte'
  import Title from '$lib/Title.svelte'
  import Input from '$lib/material/Input.svelte'
  import Button from '$lib/material/Button.svelte'

  export let data: PageData
  export let form: ActionData

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
    {#if form?.error}
      <div
        class="p-2 rounded border border-secondary-dark text-secondary-dark text-center"
      >
        {form.error}
      </div>
    {/if}

    {#if data.session?.user}
      <div class="font-semibold text-lg text-center">
        Bonjour {data.session.user.name} 👋
      </div>
      <Button secondary on:click={signOut}>Déconnexion</Button>
    {:else}
      <form method="POST" class="flex flex-col gap-4 font-semibold" use:enhance>
        <input type="hidden" name="csrfToken" value={data.csrfToken} />
        <Input key="email" type="email" />
        <Input key="password" type="password" label="Mot de passe" />
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
