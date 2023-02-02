import { readable, writable } from 'svelte/store'
import { browser } from '$app/environment'

export const isTouchScreen = readable(browser && navigator.maxTouchPoints > 0)
export const isMobile = writable(getIsMobile())
export const isLargeScreen = readable(getIsLargeScreen(), (set) => {
  if (!browser) return
  const observer = new ResizeObserver(() => set(getIsLargeScreen()))
  observer.observe(document.body)
  return () => observer.disconnect()
})

function getIsLargeScreen() {
  if (!browser) return false
  return document.body.offsetWidth > 1200
}

function getIsMobile() {
  if (!browser) return false
  // @ts-ignore
  if (navigator.userAgentData) return navigator.userAgentData.mobile
  const isTouch = navigator.maxTouchPoints > 0
  const isSmall = window.screen.availWidth < 768 // https://tailwindcss.com/docs/responsive-design
  const coarse = window.matchMedia('(pointer: coarse)').matches
  return isTouch && isSmall && coarse
}
