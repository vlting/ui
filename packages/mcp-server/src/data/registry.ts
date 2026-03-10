import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..', '..', '..', '..')

export interface RegistryComponent {
  name: string
  layer: 'primitive' | 'component' | 'block'
  category: string
  import: string
  platforms: string[]
  props?: Record<string, { type: string; values?: string[] }>
  whenToUse?: string
  whenNotToUse?: string
  accessibility?: { role: string; keyboard: string[] }
  notes?: string[]
  migration?: Array<{ from: string; to: string; reason: string }>
}

export interface Registry {
  version: string
  library: string
  description: string
  install: string
  totalCount: number
  components: RegistryComponent[]
}

let _registry: Registry | null = null

export function getRegistry(): Registry {
  if (!_registry) {
    const raw = readFileSync(resolve(root, 'docs/ai/registry.json'), 'utf8')
    _registry = JSON.parse(raw) as Registry
  }
  return _registry
}

export function findComponent(name: string): RegistryComponent | undefined {
  return getRegistry().components.find((c) => c.name.toLowerCase() === name.toLowerCase())
}

export function listComponents(opts?: {
  category?: string
  layer?: string
}): RegistryComponent[] {
  let result = getRegistry().components
  if (opts?.category) {
    result = result.filter((c) => c.category === opts.category)
  }
  if (opts?.layer) {
    result = result.filter((c) => c.layer === opts.layer)
  }
  return result
}
