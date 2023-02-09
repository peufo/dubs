<script lang="ts">
  import Title from '$lib/Title.svelte'
</script>

<svelte:head>
  <meta name="description" content="Acheter notre miel de Coeuve." />
</svelte:head>

<Title subtitle="La boutique" subtitleUrl="/shop" />

<div class="mx-auto my-10 px-2 max-w-5xl ">
  <slot />
</div>
