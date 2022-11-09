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
    class="p-2 border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark"
  >
    <header>
      <Icon path={mdiLightningBolt} classSVG="rotate-12" />
      <span class="text-large">{action.name}</span>
    </header>
    <p class="mt-2">
      {action.desciption || 'Pas de description'}
    </p>
  </div>

  <!-- Outputs -->
  {#if action.ouputs}
    <div class="border">
      {#each action.ouputs as { value, relationTo }}
        <div>
          {#if typeof value === 'string'}
            id
          {:else}
            {value.name}
          {/if}
        </div>
      {/each}
    </div>
  {/if}
{/if}
