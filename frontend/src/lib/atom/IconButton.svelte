<script lang="ts">
  import Icon from './Icon.svelte'

  export let path: string
  export let href = ''
  export let external = false
  let klass = ''
  export { klass as class }
  export let classIcon = ''
  export let classSVG = ''
  export let size = 24
  export let padding = 6
</script>

<button
  class="{klass} relative rounded-full hover:bg-primary"
  style="width: {size + padding}px; height: {size + padding}px;"
  on:click
  on:dblclick
  on:blur
  on:focus
>
  {#if href}
    <a
      {href}
      class="inset-0 absolute"
      data-sveltekit-reload={external ? '' : 'off'}
    >
      {' '}
    </a>
  {/if}
  <Icon class={classIcon} {classSVG} {path} {size} />
</button>
