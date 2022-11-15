<script lang="ts">
  import { mdiLightningBolt } from '@mdi/js'

  import { api } from '$lib/api'
  import Icon from '$src/material/Icon.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import type { Action } from 'types'

  export let id: string | undefined
  export let action: Action | undefined = undefined

  $: if (id) api.getById('action', id).then((res) => (action = res))

  let outputs: { from: HTMLElement; to: HTMLElement }[] = []
</script>

{#if !!action}
  <div
    class="px-4 py-2 min-w-[50%] border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark"
  >
    <header class="pb-2">
      <Icon path={mdiLightningBolt} classSVG="rotate-12" />
      <span class="text-lg">{action.name}</span>
    </header>
    {#if action.description}
      {@html serialize(action.description)}
    {/if}
  </div>

  <!-- Outputs -->
  {#if action.outputs}
    <div class="flex justify-center gap-4 -translate-y-1/2">
      {#each action.outputs as { relationTo }}
        {#if relationTo === 'action'}
          <div class="border w-4 h-4 bg-white border-primary-dark rounded" />
        {:else}
          <div
            class="border w-4 h-4 bg-white border-primary-dark rounded-full"
          />
        {/if}
      {/each}
    </div>

    <div class="flex gap-2 pt-14 overflow-visible">
      {#each action.outputs as { value, relationTo }}
        {#if typeof value === 'string'}
          <div>goto {value}</div>
        {:else if relationTo === 'action'}
          <svelte:self action={value} />
        {:else}
          <div>TODO: Product</div>
        {/if}
      {/each}
    </div>
  {/if}
{/if}
