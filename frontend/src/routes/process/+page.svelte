<script lang="ts">
  import Title from '$lib/molecule/Title.svelte'
  import Edit from '$lib/organism/Edit.svelte'
</script>

<svelte:head>
  <meta name="description" content="Édition des flux de travail" />
</svelte:head>

<div class="min-h-screen">
  <Title subtitle="Édition des flux" />

  <Edit />
</div>
