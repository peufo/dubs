<script lang="ts">
  import type { PageData } from './$types'
  import Actions from '$lib/Actions.svelte'
  import ActionsLayout from '$lib/ActionsLayout.svelte'
  import Button from '$lib/material/Button.svelte'

  export let data: PageData
  //
</script>

{#if data.action}
  <ActionsLayout>
    <Actions actions={[data.action]} />
  </ActionsLayout>
{:else}
  <div class="grid place-content-center p-10">
    <a href="/admin/globals/process">
      <Button secondary>Sélectioner l'action racine à afficher ici</Button>
    </a>
  </div>
{/if}
