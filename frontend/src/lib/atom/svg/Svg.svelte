<script lang="ts">
  export let size = 50

  /** Ensure all "a" elements inside an SVG node belong to the correct namespace */
  function ensureSVGA(node: SVGSVGElement) {
    const namespaceSVG = 'http://www.w3.org/2000/svg'
    const links = node.querySelectorAll<HTMLLinkElement>('a')
    for (const link of links) {
      if (link.namespaceURI === namespaceSVG) continue
      const a = document.createElementNS(namespaceSVG, 'a')
      for (const { name, value } of link.attributes) {
        a.setAttribute(name, value)
      }
      a.append(...link.children)
      link.insertAdjacentElement('beforebegin', a)
      link.remove()
    }
  }
</script>

<svg
  use:ensureSVGA
  width={size}
  height={size}
  viewBox="0 0 1000 1000"
  class="overflow-visible fill-primary stroke-primary-dark"
>
  <slot />
</svg>
