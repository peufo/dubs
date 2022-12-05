<script lang="ts">
  import type { PortGroup } from 'types'

  export let portGroup: PortGroup | undefined
  export let direction: 'up' | 'down'
  $: console.log(portGroup)
</script>

{#if portGroup?.ports}
  <div
    class="flex gap-14 {direction === 'down' ? 'flex-col' : 'flex-col-reverse'}"
  >
    <div class="flex justify-center gap-4 -translate-y-1/2">
      {#each portGroup.ports as { relationTo }}
        {#if relationTo === 'action'}
          <div class="border w-4 h-4 bg-white border-primary-dark rounded" />
        {:else}
          <div
            class="border w-4 h-4 bg-white border-primary-dark rounded-full"
          />
        {/if}
      {/each}
    </div>
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
  </div>
{/if}

<style>
  .ports-elements::-webkit-scrollbar {
    display: none;
  }
</style>
