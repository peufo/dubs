<script lang="ts">
  import { goto } from '$app/navigation'
  import type { ActionData, PageData } from './$types'
  import Button from '$lib/material/Button.svelte'
  import { api } from '$lib/api'
  import Profile from './Profile.svelte'

  async function handleLogout() {
    await api.logout()
    goto('/profile', { invalidateAll: true })
  }

  export let data: PageData
  export let form: ActionData
  //
</script>

<div class="flex-grow flex flex-col gap-4 px-4">
  {#if data.session.user}
    <div class="font-semibold text-lg text-center">
      Bonjour {data.session.user.name} 👋
    </div>

    <Profile user={data.session.user} {...form?.profile} />
    <div class="text-center">
      <Button secondary on:click={handleLogout}>Déconnexion</Button>
    </div>
  {/if}
</div>
