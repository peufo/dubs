<script lang="ts">
  import { api } from '$lib//api'
  import Icon from '$src/material/Icon.svelte'
  import { mdiLightningBolt } from '@mdi/js'
  import type { Action } from 'types'

  export let id: string
  let action: Action | null = null

  $: api.getById('action', id).then((res) => (action = res))
</script>

{#if !!action}
  <div
    class="p-2 pb-4 border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark"
  >
    <header>
      <Icon path={mdiLightningBolt} classSVG="rotate-12" />
      <span class="text-large">{action.name}</span>
    </header>
    <p class="mt-2">
      {(action.desciption && JSON.stringify(action.desciption)) ||
        'Pas de description'}
    </p>
  </div>

  <!-- Outputs -->
  {#if action.outputs}
    <div class="flex justify-center gap-4 -translate-y-1/2">
      {#each action.outputs as { value, relationTo }}
        {#if relationTo === 'action'}
          <div class="border w-4 h-4 bg-white border-primary-dark rounded" />
        {:else}
          <div
            class="border w-4 h-4 bg-white border-primary-dark rounded-full"
          />
        {/if}
      {/each}
    </div>
  {/if}
{/if}
