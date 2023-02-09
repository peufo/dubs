import { derived } from 'svelte/store'
import { page } from '$app/stores'
import qs from 'qs'

export const query = derived(page, ({ url }) => {
  return qs.parse(url.searchParams.toString())
})
