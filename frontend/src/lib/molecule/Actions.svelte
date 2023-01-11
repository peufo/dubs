<script lang="ts">
  import type { Action as IAction, State } from 'types'
  import Action from '$lib/molecule/Action.svelte'

  export let actions: IAction[]
  export let inputs: State[] = []
  export let outputs: State[] = []
</script>

<div class="flex justify-center items-center gap-2">
  {#each actions as action}
    <Action {action} />
  {/each}
</div>
