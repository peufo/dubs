import qs from 'qs'

export function updateQS(
  url: URL,
  key: string,
  value: string | number
): string {
  const query = qs.parse(url.searchParams.toString())
  const queryUpdated = { ...query, [key]: String(value) }
  return `${url.pathname}?${qs.stringify(queryUpdated)}`
}
