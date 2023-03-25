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
  export let title = ''
  export let primary = false
  export let secondary = false
</script>

<button
  class="{klass}
    relative rounded-full
    {primary ? 'fill-primary-dark hover:bg-primary' : ''}
    {secondary ? 'fill-secondary hover:bg-secondary-light/50' : ''}
  "
  style="width: {size + padding}px; height: {size + padding}px;"
  {title}
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
