<script lang="ts">
  import Icon from './Icon.svelte'

  export let path: string
  export let href = ''
  let klass = ''
  export { klass as class }
  export let classIcon = ''
  export let classSVG = ''
  export let size = 24
  export let padding = 12
  export let buttonProps: Partial<HTMLButtonElement> = {}
  export let linkProps: Partial<HTMLAnchorElement> = {}
</script>

<button
  class="{klass} relative border border-primary rounded-full hover:bg-primary"
  style="width: {size + padding}px; height: {size + padding}px;"
  on:click
  on:dblclick
  on:blur
  on:focus
  {...buttonProps}
>
  {#if href}
    <a {href} class="inset-0 absolute" {...linkProps}>{' '}</a>
  {/if}
  <Icon class={classIcon} {classSVG} {path} {size} />
</button>
