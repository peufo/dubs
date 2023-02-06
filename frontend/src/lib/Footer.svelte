<script lang="ts">
  import Icon from './material/Icon.svelte'

  interface Link {
    label: string
    href: string
    icon: string
  }

  export let links: Link[] = []
</script>

<footer>
  <div class="flex justify-center gap-4 flex-wrap">
    {#each links as link}
      <a
        href={link.href}
        data-sveltekit-reload
        class="
          border hover:outline rounded py-1 px-3 text-xl shrink-0 shadow-lg
          bg-primary-light text-primary-dark border-primary-dark fill-primary-dark
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
