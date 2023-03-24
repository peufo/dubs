<script lang="ts">
  import { mdiApple, mdiFacebook, mdiGoogle } from '@mdi/js'
  import Icon from '$lib/material/Icon.svelte'
  const providers = [
    { id: 'google', icon: mdiGoogle },
    { id: 'facebook', icon: mdiFacebook },
    { id: 'apple', icon: mdiApple },
  ]
</script>

<div class="flex gap-2">
  <hr class="grow translate-y-[11px]" />
  <div class="text-sm opacity-50">Ou continuer avec</div>
  <hr class="grow translate-y-[11px]" />
</div>

<div class="flex gap-4 justify-center flex-wrap">
  {#each providers as { id, icon }}
    <button
      title="Connexion avec {id.toUpperCase()}"
      class=" grow
      rounded px-6 py-2 bg-red 
      bg-primary-light
      fill-primary-dark hover:ring-1 ring-primary-dark
    "
    >
      <Icon path={icon} />
    </button>
  {/each}
</div>
