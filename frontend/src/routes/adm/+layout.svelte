<script lang="ts">
  import Title from '$lib/Title.svelte'
  import { page } from '$app/stores'
</script>

<Title subtitle="Administration">
  <a
    href="/adm/orders"
    class="hover:underline"
    class:underline={$page.route.id?.startsWith('/adm/orders')}
  >
    Commandes
  </a>
  <a
    href="/adm/process"
    class="hover:underline"
    class:underline={$page.route.id?.startsWith('/adm/process')}
  >
    Processus de fabrication
  </a>
</Title>

<slot />
