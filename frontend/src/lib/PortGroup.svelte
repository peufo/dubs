<script lang="ts">
  import type { PortGroup } from 'types'
  import Or from '$lib/atom/Or.svelte'

  export let portGroup: PortGroup | undefined
  export let hooks = false
  export let direction: 'up' | 'down' = 'down'
</script>

{#if portGroup}
  <div
    class="
    flex justify-center items-center border-primary
    {portGroup.condition === 'and' ? 'gap-4' : 'gap-2'}
    {direction === 'down' ? 'rounded-t-md' : 'rounded-b-md'}
    {hooks ? 'border-x-2 px-1' : ''}
    {hooks && direction === 'up' ? 'border-b pb-[2px]' : ''}
    {hooks && direction === 'down' ? 'border-t pt-[2px]' : ''}
  "
  >
    {#if portGroup?.ports}
      {#each portGroup.ports as { relationTo }, index}
        <Or if={portGroup.condition === 'or' && index > 0} />

        {#if relationTo === 'action'}
          <div class="border w-4 h-4 bg-white border-primary-dark rounded" />
        {:else}
          <div
            class="border w-4 h-4 bg-white border-primary-dark rounded-full"
          />
        {/if}
      {/each}
    {/if}

    {#if portGroup.groups && portGroup.groups.length}
      {#each portGroup.groups as group, index}
        <Or
          if={portGroup.condition === 'or' &&
            (!!portGroup.ports?.length || index > 0)}
        />
        <svelte:self portGroup={group} hooks {direction} />
      {/each}
    {/if}
  </div>
{/if}

<!--
    <div class="ports-elements flex gap-2 overflow-x-auto">
      {#each ports as { value, relationTo }}
        {#if typeof value === 'string'}
          <div>goto {value}</div>
        {:else if relationTo === 'action'}
          <Action action={value} />
        {:else}
          <div>TODO: Product</div>
        {/if}
      {/each}
    </div>
  -->
<style>
  .ports-elements::-webkit-scrollbar {
    display: none;
  }
</style>
