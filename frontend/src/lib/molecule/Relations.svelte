<script lang="ts">
  import type { Action } from 'types'

  export let relations: Action['inputs']
  export let direction: 'up' | 'down' = 'down'
</script>

{#if relations}
  <div class="flex justify-center items-center border-primary gap-2">
    {#each relations as { state, required, condition }, index}
      <div
        class="border w-4 h-4 bg-white border-primary-dark rounded-full"
        class:border-dashed={!required}
      />
    {/each}
  </div>
{/if}
