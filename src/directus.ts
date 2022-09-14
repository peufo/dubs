import { Directus } from '@directus/sdk'
import type { Collections } from '$types/index'

export const directusUrl = 'http://localhost:8055'
export const directus = new Directus<Collections>(directusUrl)

type Preset = 'square240' | 'height240'

export function getAssetUrl(id: string, preset: Preset) {
  return `${directusUrl}/assets/${id}?key=${preset}`
}
