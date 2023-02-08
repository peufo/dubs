export const getPathname = (url?: string) => {
  if (!url) return '/logo.png'
  return new URL(url).pathname
}
