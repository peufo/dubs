<script lang="ts">
  import '../app.css'
  import Header from '$lib/organism/Header.svelte'
</script>

<Header />

<main class="pt-24">
  <slot />
</main>
