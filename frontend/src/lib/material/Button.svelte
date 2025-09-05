<script lang="ts">
  let klass = "";
  export { klass as class };
  export let type: "button" | "submit" | "reset" | undefined = undefined;
  export let primary = false;
  export let secondary = false;
  export let disabled = false;
</script>

<button
  {type}
  on:click
  {disabled}
  class="
    {klass}
    px-4 py-2 rounded text-lg hover:ring-1
    {primary ? 'bg-primary-light text-primary-dark ring-primary-dark' : ''}
    {secondary
    ? 'bg-secondary-light/50 text-secondary-dark ring-secondary-dark'
    : ''}
  "
>
  <slot />
</button>
