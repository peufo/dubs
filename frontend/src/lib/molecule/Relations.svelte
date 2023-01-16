<script lang="ts">
  import type { Relation } from 'types'

  export let relations: Relation[]
  /** Chose the direction to develop next actions */
  export let type: 'input' | 'output'
  export let elements: HTMLElement[]
</script>

<div
  class="
    flex justify-center h-0 items-center gap-2 
    {type === 'input' ? '-translate-y-1/2' : 'translate-y-1/2'}
  "
>
  {#each relations as relation, index}
    <div
      title={relation.name}
      class="border w-4 h-4 bg-white border-primary-dark rounded-full"
      bind:this={elements[index]}
    />
  {/each}
</div>
