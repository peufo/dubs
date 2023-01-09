<script lang="ts">
  import type { State as IState } from 'types'
  import State from './State.svelte'

  export let states: IState[]
</script>

<div class="flex justify-center items-center gap-2 -translate-y-1/2">
  {#each states as { from }}
    <div
      class="border w-4 h-4 bg-white border-primary-dark rounded-full"
      class:border-dashed={!from.required}
    />
  {/each}
</div>

<div class="flex justify-center items-center gap-2">
  {#each states as state}
    <State {state} />
  {/each}
</div>

<div class="flex justify-center items-center gap-2 translate-y-1/2">
  {#each states as { to }}
    <div
      class="border w-4 h-4 bg-white border-primary-dark rounded-full"
      class:border-dashed={!to.required}
    />
  {/each}
</div>
