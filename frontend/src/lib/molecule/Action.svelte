<script lang="ts">
  import { mdiLightningBolt, mdiPencil } from '@mdi/js'

  import type { Action } from 'types'
  import { api } from '$lib/api'
  import Icon from '$lib/atom/Icon.svelte'
  import IconButton from '$lib/atom/IconButton.svelte'
  import { serialize } from '$lib/utils/serializeSlate'
  import Relations from '$lib/molecule/Relations.svelte'

  export let id: string | undefined
  export let action: Action | undefined = undefined

  $: if (id) api.getById('action', id).then((res) => (action = res))

  $: console.log(action?.inputs)
</script>

{#if !!action}
  <div class="translate-y-1/2">
    <Relations relations={action.inputs} direction="up" />
  </div>

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

  <div class="-translate-y-1/2">
    <Relations relations={action.outputs} direction="down" />
  </div>
{/if}
