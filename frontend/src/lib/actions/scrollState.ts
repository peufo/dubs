import { debounce } from 'debounce'

export function scrollState(node: HTMLElement) {
  const firstChild = node.children[0]
  const lastChild = node.children[node.children.length - 1]
  if (!firstChild || !lastChild) return

  let isStart = false
  let isEnd = false

  const options: IntersectionObserverInit = {
    root: node,
    threshold: 0.8,
  }
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (target === firstChild) isStart = isIntersecting
      if (target === lastChild) isEnd = isIntersecting
    }
    console.log({ isStart, isEnd })
  }, options)

  observer.observe(firstChild)
  observer.observe(lastChild)
  return {
    destroy() {
      observer.disconnect()
    },
  }
}
