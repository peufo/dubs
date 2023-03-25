<script lang="ts">
  import Card from '$lib/material/Card.svelte'
  import type { User } from 'types'
  import TextField from '$lib/material/TextField.svelte'
  import Button from '$lib/material/Button.svelte'

  export let user: User
  export let success = false
  export let error: string = ''
</script>

<Card title="Mes coordonnées">
  {#if success}
    <div
      class="border rounded px-4 py-2 text-lg text-center border-green-600 text-green-600"
    >
      Sauvegarde réussie
    </div>
  {:else if error}
    <div
      class="border rounded px-4 py-2 text-lg text-center border-red-600 text-red-600"
    >
      {@html error}
    </div>
  {/if}

  <form method="post" action="?/profile" class="flex flex-col gap-4 py-4">
    <input type="hidden" name="id" value={user.id} />
    <div class="grid grid-cols-2 col-auto gap-2">
      <TextField value={user.email} name="email" label="Email" />
      <TextField value={user.phone} name="phone" label="Télépone" />
    </div>
    <div class="grid grid-cols-2 gap-2">
      <TextField value={user.name} name="name" label="Prénom" />
      <TextField value={user.surname} name="surname" label="Nom" />
    </div>
    <TextField value={user.street} name="street" label="Rue et numéro" />
    <div class="grid grid-cols-2 gap-2">
      <TextField value={user.zipCode} name="zipCode" label="Code postal" />
      <TextField value={user.city} name="city" label="Ville" />
    </div>

    <Button primary>Sauvegarder</Button>
  </form>
</Card>
