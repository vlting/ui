import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..', '..', '..', '..')

interface IconEntry {
  name: string
  category: string
  variants: string[]
  components: Record<string, string>
}

interface IconManifest {
  version: string
  count: number
  categories: string[]
  icons: IconEntry[]
}

let _manifest: IconManifest | null = null

function getManifest(): IconManifest {
  if (!_manifest) {
    const raw = readFileSync(resolve(root, 'packages/icons/manifest.json'), 'utf8')
    _manifest = JSON.parse(raw) as IconManifest
  }
  return _manifest
}

export function searchIcons(opts: {
  query?: string
  category?: string
  style?: 'line' | 'fill'
  limit?: number
}): Array<{ name: string; importName: string; category: string; style: string }> {
  const manifest = getManifest()
  const limit = opts.limit ?? 20
  const results: Array<{
    name: string
    importName: string
    category: string
    style: string
  }> = []

  for (const icon of manifest.icons) {
    if (opts.category && icon.category !== opts.category) continue
    if (opts.query && !icon.name.includes(opts.query.toLowerCase())) continue

    const styles = opts.style ? [opts.style] : icon.variants
    for (const style of styles) {
      const importName = icon.components[style]
      if (importName) {
        results.push({
          name: icon.name,
          importName,
          category: icon.category,
          style,
        })
      }
    }

    if (results.length >= limit) break
  }

  return results.slice(0, limit)
}

export function getIconCategories(): string[] {
  return getManifest().categories
}
