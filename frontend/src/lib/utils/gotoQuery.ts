import type { Page } from '@sveltejs/kit/types'
import type { ParsedQs } from 'qs'
import { goto } from '$app/navigation'
import qs from 'qs'

/* Goto merged query */
export function useGotoQuery({ url }: Page) {
  return (newQuery: ParsedQs) => {
    const query = qs.parse(url.searchParams.toString())
    goto(`${url.pathname}?${qs.stringify({ ...query, ...newQuery })}`, {
      replaceState: true,
    })
  }
}
