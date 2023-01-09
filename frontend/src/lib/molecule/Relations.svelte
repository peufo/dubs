<script lang="ts">
  import type { Action } from 'types'
  import State from './State.svelte'
  import Order from './layout/Order.svelte'

  export let relations: Action['inputs']
  export let direction: 'up' | 'down' = 'down'
</script>

<Order reverse={direction === 'up'}>
  <div
    slot="a"
    class="flex justify-center items-center border-primary gap-2 
      {direction === 'up' ? 'translate-y-1/2' : '-translate-y-1/2'}
    "
  >
    {#each relations as { required }}
      <div
        class="border w-4 h-4 bg-white border-primary-dark rounded-full"
        class:border-dashed={!required}
      />
    {/each}
  </div>

  <div slot="b" class="flex justify-center items-center border-primary gap-2">
    {#each relations as { state }}
      <State {state} />
    {/each}
  </div>
</Order>
