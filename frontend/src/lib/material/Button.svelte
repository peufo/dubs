<script lang="ts">
  let klass = ''
  export { klass as class }
  export let type: 'button' | 'submit' | 'reset' | undefined = undefined
  export let primary = false
  export let secondary = false
</script>

<button
  {type}
  on:click
  class="{klass} px-4 py-2 rounded text-lg hover:ring-1"
  class:bg-primary-light={primary}
  class:text-primary-dark={primary}
  class:ring-primary-dark={primary}
  class:bg-secondary-light={secondary}
  class:text-secondary-dark={secondary}
  class:ring-secondary-dark={secondary}
>
  <slot />
</button>
