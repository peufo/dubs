<script lang="ts">
  import type { LayoutData } from './$types'
  import Icon from '$lib/material/Icon.svelte'

  export let links: LayoutData['links'] = []
</script>

<footer class="mt-10 pt-6shadow-4xl ">
  <div class="flex justify-center gap-4 flex-wrap">
    {#each links as link}
      <a
        href={link.href}
        data-sveltekit-reload
        class="
          rounded py-1 px-3 text-xl shrink-0 shadow-lg border
          bg-white text-secondary-dark border-secondary-dark fill-secondary-dark
          hover:shadow-xl transition-all
        "
      >
        <Icon path={link.icon} class="mr-1 inline-block -translate-y-[2px]" />
        {link.label}
      </a>
    {/each}
  </div>

  <div class="text-center p-4 opacity-60">
    Site réalisé par
    <a href="https://github.com/peufo" class="underline" data-sveltekit-reload>
      peufo
    </a>
  </div>
</footer>
