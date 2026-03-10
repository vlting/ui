import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..', '..', '..', '..')

export interface MappingEntry {
  component: string
  shadcn: {
    import: string
    props: Record<string, { type: string; values: string[] }>
  } | null
  vlting: {
    import: string
    props: Record<string, { type: string; values: string[] }>
  }
  notes: string[]
  breaking: Array<{ shadcn: string; vlting: string; reason: string }>
}

interface ApiMappings {
  primitives: Record<string, MappingEntry>
  components: Record<string, MappingEntry>
}

let _mappings: ApiMappings | null = null

export function getMappings(): ApiMappings {
  if (!_mappings) {
    const raw = readFileSync(resolve(root, 'api-mappings.json'), 'utf8')
    _mappings = JSON.parse(raw) as ApiMappings
  }
  return _mappings
}

export function getMigrationMapping(component: string): MappingEntry | undefined {
  const mappings = getMappings()
  return (
    mappings.components[component] ??
    mappings.primitives[component] ??
    // Try case-insensitive
    Object.values({ ...mappings.components, ...mappings.primitives }).find(
      (e) => e.component.toLowerCase() === component.toLowerCase(),
    )
  )
}
