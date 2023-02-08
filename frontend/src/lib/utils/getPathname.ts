export const getPathname = (url?: string) => {
  if (!url) return '/favicon.ico'
  return new URL(url).pathname
}
