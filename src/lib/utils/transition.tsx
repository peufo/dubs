import { on, createSignal, createEffect, Accessor } from 'solid-js'

export function createTransition(
  active: Accessor<boolean>,
  duration = 400,
  easing = backInOut
) {
  let start: number | null = null
  let init = true
  let frame = 0
  const [t, setT] = createSignal(0)
  const [u, setU] = createSignal(1)

  createEffect(
    on(active, () =>
      window.requestAnimationFrame((timestamp) => transition(timestamp, true))
    )
  )

  function transition(timestamp: number, change = false) {
    if (init) return (init = false)
    if (!start) start = timestamp
    let elapsed = timestamp - start
    let x = elapsed / duration
    if (elapsed && change) {
      x = 1 - x
      start = timestamp - x * duration
      window.cancelAnimationFrame(frame)
    }
    const next = active() ? x : 1 - x
    const ease = easing(next)
    setT(ease)
    setU(1 - ease)
    const done = timestamp - start > duration
    if (!done) frame = window.requestAnimationFrame(transition)
    if (done) start = null
  }

  return { t, u }
}

// TODO: trouver un moyen propre pour récupérer https://github.com/sveltejs/svelte/blob/master/src/runtime/easing/index.ts
export function backInOut(t: number) {
  const s = 1.70158 * 1.525
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s))
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}
export function circInOut(t: number) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1)
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
}
