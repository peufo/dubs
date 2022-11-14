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
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  function handleMouseMove(event: MouseEvent) {
    const { pageX, pageY } = event
    node.style.translate = `${pageX - oX + offsetX}px ${pageY - oY + offsetY}px`
  }

  function handleMouseUp() {
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
