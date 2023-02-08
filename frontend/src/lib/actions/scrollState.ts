import type { Action } from 'svelte/action'

interface State {
  isStart: boolean
  isEnd: boolean
}
type CallBack = (state: State) => void

export const scrollState: Action<HTMLElement, CallBack> = (node, cb) => {
  if (!cb) return
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
    cb({ isStart, isEnd })
  }, options)

  observer.observe(firstChild)
  observer.observe(lastChild)
  return {
    destroy() {
      observer.disconnect()
    },
  }
}
