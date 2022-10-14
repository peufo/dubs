import type { Collections } from '$types/index'

export const directusUrl = 'http://localhost:8055'

type Preset = 'square240' | 'height240'

/** @deprecated */
export function getAssetUrl(id: string, preset: Preset) {
  return `${'TODO'}/assets/${id}?key=${preset}`
}
