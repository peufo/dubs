<script lang="ts">
  import { api } from '$lib/api'
  import type { State } from 'types'

  export let state: State | string

  $: if (typeof state === 'string')
    api.getById('state', state).then((res) => (state = res))
</script>

<div>
  <div class="border w-4 h-4 bg-white border-primary-dark rounded-full" />

  {#if typeof state !== 'string'}
    <div>{state.name}</div>
  {/if}
</div>
