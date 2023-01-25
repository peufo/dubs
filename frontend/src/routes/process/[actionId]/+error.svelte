<script>
  import { page } from '$app/stores'
</script>

<div class="p-4 pt-36 text-center">
  <h1 class="text-4xl">{$page.status}</h1>
  <h3 class="text-2xl">{$page.error?.message}</h3>
</div>
