<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  let node: HTMLDivElement
  const dispatch = createEventDispatcher<{ click_outside: void }>()

  onMount(() => {
    const handleClick = (event: MouseEvent) => {
      console.log('prout')
      if (!node) return
      if (!event.target) return
      if (node.contains(event.target as Node)) return
      if (event.defaultPrevented) return
      dispatch('click_outside')
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
</script>

<div bind:this={node} class="contents">
  <slot />
</div>
