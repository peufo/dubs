<script lang="ts">
  import type { LayoutData } from './$types'
  import Icon from '$lib/material/Icon.svelte'

  export let links: LayoutData['links'] = []
</script>

<footer class="mt-12">
  <div class="flex justify-center gap-4 flex-wrap">
    {#each links as link}
      <a
        href={link.href}
        data-sveltekit-reload
        class="
          outline-2 rounded py-1 px-3 text-xl shrink-0 shadow-lg
          bg-primary-light text-primary-dark border-primary-dark fill-primary-dark
          hover:outline hover:shadow-xl
        "
      >
        <Icon path={link.icon} class="mr-1" classSVG="scale-125" />
        {link.label}
      </a>
    {/each}
  </div>

  <div class="text-center p-4 opacity-60">
    Site réalisé par
    <a href="https://github.com/peufo" class="underline" data-sveltekit-reload>
      Jonas Voisard
    </a>
  </div>
</footer>
