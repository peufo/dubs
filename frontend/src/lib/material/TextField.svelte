<script lang="ts">
  import Label from '$lib/material/Label.svelte'

  interface $$Props extends Partial<HTMLInputElement> {
    label: string
    value: string
    class?: string
  }

  let klass = ''
  export { klass as class }
  export let label: string
  export let value = ''
</script>

<Label class={klass}>
  {label}
  <input
    on:input
    type="text"
    bind:value
    class="w-full px-4 py-2 rounded-md border font-normal"
    {...$$restProps}
  />
</Label>
