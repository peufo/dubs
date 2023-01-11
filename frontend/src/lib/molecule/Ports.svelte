<script lang="ts">
  import type { State as IState } from 'types'

  export let states: IState[]
  /** Chose the direction to develop next actions */
  export let type: 'input' | 'output'
</script>

<div
  class="
    flex justify-center h-0 items-center gap-2 
    {type === 'input' ? '-translate-y-1/2' : 'translate-y-1/2'}
  "
>
  {#each states as state}
    <div
      title={state.name}
      class="border w-4 h-4 bg-white border-primary-dark rounded-full"
    />
  {/each}
</div>
