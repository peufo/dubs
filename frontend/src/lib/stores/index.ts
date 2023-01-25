import { readable } from 'svelte/store'
import { browser } from '$app/environment'

const smallScreenLimit = 768 // https://tailwindcss.com/docs/responsive-design

export const isTouchScreen = readable(browser && navigator.maxTouchPoints > 0)
export const isSmallScreen = readable(
  browser && document.body.offsetWidth < smallScreenLimit
)
export const isMobile = readable(getIsMobile())

function getIsMobile() {
  if (!browser) return false
  // @ts-ignore
  if (navigator.userAgentData) return navigator.userAgentData.mobile
  const isTouch = navigator.maxTouchPoints > 0
  const isSmall = window.screen.availWidth < smallScreenLimit
  const coarse = window.matchMedia('(pointer: coarse)').matches
  return isTouch && isSmall && coarse
}
