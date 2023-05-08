export function env(name: string, fallback?: string | number) {
  const isDefined = name in process.env
  if (isDefined) return process.env[name]
  if (fallback) return String(fallback)
  return undefined
}
