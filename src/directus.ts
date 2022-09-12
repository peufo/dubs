import { Directus } from '@directus/sdk'
import type { Collections } from '$types/index'

export const directus = new Directus<Collections>('http://localhost:8055/')
