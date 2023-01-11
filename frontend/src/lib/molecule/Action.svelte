<script lang="ts">
  import { mdiPencilOutline } from '@mdi/js'

  import type { Action, State } from 'types'
  import IconButton from '$lib/atom/IconButton.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import Ports from '$lib/molecule/Ports.svelte'

  export let action: Action
  export let inputs: State[] = []
  export let outputs: State[] = []
</script>

{#if !!action}
  <div
    class="border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark group"
  >
    <Ports states={inputs} type="input" />

    <div class="px-4 py-2">
      <header class="pb-2 flex gap-4">
        <h3 class="text-lg">{action.name}</h3>
        <IconButton
          class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
          path={mdiPencilOutline}
          href="/admin/collections/action/{action.id}"
          external
        />
      </header>
      {#if action.description}
        {@html serialize(action.description)}
      {/if}
    </div>

    <Ports states={outputs} type="output" />
  </div>
{/if}

<!--
  {#if direction === 'backward'}
    <div class="flex justify-center items-center gap-2">
      {#each states as { from }}
        {#if typeof from.action === 'object'}
          <Action action={from.action} />
        {/if}
      {/each}
    </div>
  {/if}
-->
