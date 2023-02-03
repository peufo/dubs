<script lang="ts">
  import type { Relation } from 'types'

  export let relations: Relation[]
  /** Chose the direction to develop next actions */
  export let type: 'input' | 'output'
  export let elements: HTMLElement[]

  const showName = ({ name, action }: Relation) =>
    !!name && (type === 'output' || !action)
</script>

<div
  class="
    flex justify-center h-0 items-center gap-2
    {type === 'input' ? '-translate-y-1/2' : 'translate-y-1/2'}
  "
>
  {#each relations as relation, index (relation.id)}
    <div
      title={relation.name}
      class="border bg-white border-primary-dark rounded-full text-xs"
      class:w-2={!showName(relation)}
      class:h-2={!showName(relation)}
      class:px-1={showName(relation)}
      bind:this={elements[index]}
      data-relation-id={relation.id}
    >
      {#if showName(relation)}
        {relation.name}
      {/if}
    </div>
  {/each}
</div>
