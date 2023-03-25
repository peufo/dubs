<script lang="ts">
  import Label from '$lib/material/Label.svelte'

  interface $$Props extends Partial<HTMLInputElement> {
    name: string
    label?: string
    value?: string
    class?: string
  }

  let klass = ''
  export { klass as class }
  export let name: string
  export let label: string = name
  export let value = ''
</script>

<Label class={klass}>
  {label}
  <input
    {name}
    on:input
    type="text"
    bind:value
    class="w-full px-4 py-2 rounded-md border font-normal"
    {...$$restProps}
  />
</Label>
