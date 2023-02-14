<script lang="ts">
  import { signIn, signOut } from '@auth/sveltekit/client'
  import { page } from '$app/stores'
</script>

<button
  class="px-2 py-1 border bg-primary-dark text-white rounded"
  on:click={() => signIn('payload', { username: 'jonas', password: 'prout' })}
>
  Sign in
</button>

<button
  class="px-2 py-1 border bg-primary-dark text-white rounded"
  on:click={() => signOut('payload')}>Logout</button
>

<pre>{JSON.stringify($page.data.session, null, 2)}</pre>
