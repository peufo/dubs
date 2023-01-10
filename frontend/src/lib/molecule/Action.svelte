<script lang="ts">
  import { mdiLightningBolt, mdiPencil } from '@mdi/js'

  import type { Action, State } from 'types'
  import { api } from '$lib/api'
  import Icon from '$lib/atom/Icon.svelte'
  import IconButton from '$lib/atom/IconButton.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import Relations from '$lib/molecule/States.svelte'

  export let action: Action

  //$: getStates(action?.id || id)

  let inputs: State[] = []
  let outputs: State[] = []

  function getStates(actionId: string) {
    api
      .get('state', { where: { 'to.action': { equals: actionId } } })
      .then((res) => (inputs = res.docs))

    api
      .get('state', { where: { 'from.action': { equals: actionId } } })
      .then((res) => (outputs = res.docs))
  }
</script>

{#if !!action}
  <Relations states={inputs} />

  <div
    class="px-4 py-2 min-w-[50%] border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark"
  >
    <header class="pb-2 flex">
      <Icon path={mdiLightningBolt} classSVG="rotate-12" />
      <span class="text-lg">{action.name}</span>
      <IconButton
        class="ml-auto"
        path={mdiPencil}
        href="/admin/collections/action/{action.id}"
        external
      />
    </header>
    {#if action.description}
      {@html serialize(action.description)}
    {/if}
  </div>

  <Relations states={outputs} />
{/if}
