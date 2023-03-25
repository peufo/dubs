<script lang="ts">
  import { goto } from '$app/navigation'
  import type { ActionData, PageData } from './$types'
  import Button from '$lib/material/Button.svelte'
  import { api } from '$lib/api'
  import Profile from './Profile.svelte'
  import Orders from '$lib/Orders.svelte'

  async function handleLogout() {
    await api.logout()
    goto('/profile', { invalidateAll: true })
  }

  export let data: PageData
  export let form: ActionData
  //
</script>

<div class="flex flex-col gap-4 px-4 max-w-lg mx-auto">
  {#if data.session.user}
    <div class="font-semibold text-lg text-center">
      Bonjour {data.session.user.name} 👋
    </div>

    <Profile user={data.session.user} {...form?.profile} />

    <Orders orders={data.orders} />

    <div class="text-center">
      <Button secondary on:click={handleLogout}>Déconnexion</Button>
    </div>
  {/if}
</div>
