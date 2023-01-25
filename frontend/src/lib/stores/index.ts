import { readable } from 'svelte/store'
import { browser } from '$app/environment'

export const isTouchScreen = readable(browser && navigator.maxTouchPoints > 0)
export const isMobile = readable(
  browser &&
    // @ts-ignore
    (!!navigator.userAgentData?.mobile ||
      (navigator.maxTouchPoints > 0 && window.screen.availWidth < 900))
)
