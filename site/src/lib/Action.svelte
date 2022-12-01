<script lang="ts">
  import { mdiLightningBolt } from '@mdi/js'

  import type { Action } from 'types'
  import { api } from '$lib/api'
  import Icon from '$src/material/Icon.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import Ports from '$lib/Ports.svelte'

  export let id: string | undefined
  export let action: Action | undefined = undefined

  $: if (id) api.getById('action', id).then((res) => (action = res))
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

  <Ports ports={action.outputs} direction="down" />
{/if}
