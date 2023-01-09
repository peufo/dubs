<script lang="ts">
  import { mdiLightningBolt, mdiPencil } from '@mdi/js'

  import type { Action, State } from 'types'
  import { api } from '$lib/api'
  import Icon from '$lib/atom/Icon.svelte'
  import IconButton from '$lib/atom/IconButton.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import Relations from '$lib/molecule/Relations.svelte'

  export let id: string | undefined
  export let action: Action | undefined = undefined

  $: load(id)
  //$: getStates(action?.id || id)

  let inputs: State[] = []
  let outputs: State[] = []

  function load(actionId?: string) {
    if (!actionId) return
    loadAction(actionId)
    getStates(actionId)
  }

  function loadAction(actionId: string) {
    api.getById('action', actionId).then((res) => (action = res))
  }

  function getStates(actionId: string) {
    api
      .get('state', { where: { to: { required: { equals: true } } } })
      .then(console.log)
  }
</script>

{#if !!action}
  <Relations relations={inputs} direction="up" />

  <div
    class="px-4 py-2 min-w-[50%] border rounded bg-primary-light border-primary text-primary-dark fill-primary-dark"
  >
    <header class="pb-2 flex">
      <Icon path={mdiLightningBolt} classSVG="rotate-12" />
      <span class="text-lg">{action.name}</span>
      <IconButton
        class="ml-auto"
        path={mdiPencil}
        href="/admin/collections/action/{id}"
      />
    </header>
    {#if action.description}
      {@html serialize(action.description)}
    {/if}
  </div>

  <Relations relations={outputs} direction="down" />
{/if}
