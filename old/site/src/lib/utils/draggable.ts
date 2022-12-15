export function draggable(node: HTMLDivElement) {
  let oX = 0
  let oY = 0
  let offsetX = 0
  let offsetY = 0

  node.addEventListener('mousedown', handleMouseDown)

  function handleMouseDown(event: MouseEvent) {
    oX = event.pageX
    oY = event.pageY
    const style = getComputedStyle(node)
    const [x, y] = style.translate.replace(/px/g, '').split(' ').map(Number)
    if (!isNaN(x) && !isNaN(y)) {
      offsetX = x
      offsetY = y
    }
    node.classList.add('drop-shadow-xl')
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp, { once: true })
  }

  function handleMouseMove(event: MouseEvent) {
    const { pageX, pageY } = event
    const deltaX = pageX - oX + offsetX
    const deltaY = pageY - oY + offsetY
    node.dispatchEvent(new CustomEvent('move', { detail: { deltaX, deltaY } }))
    node.style.translate = `${deltaX}px ${deltaY}px`
  }

  function handleMouseUp(event: MouseEvent) {
    handleMouseMove(event)
    node.classList.remove('drop-shadow-xl')
    document.removeEventListener('mousemove', handleMouseMove)
  }

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    },
  }
}
