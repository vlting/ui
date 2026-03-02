import { readFile } from 'fs/promises'
import { join } from 'path'
import { getComponent } from './registry'

export interface PropDef {
  type: string
  values?: string[]
  required?: boolean
  default?: string
  description?: string
}

export interface ApiMapping {
  component: string
  shadcn: {
    import: string
    props: Record<string, PropDef | Record<string, PropDef>>
  }
  vlting: {
    import: string
    props: Record<string, PropDef | Record<string, PropDef>>
  }
  notes: string[]
  breaking: Array<{ shadcn: string; vlting: string; reason: string }>
}

/**
 * Load the api-mapping.json for a component by its slug.
 * Returns null if the component has no mapping file.
 */
export async function loadApiMapping(
  componentSlug: string,
): Promise<ApiMapping | null> {
  const entry = getComponent(componentSlug)
  if (!entry?.apiMappingPath) return null

  try {
    const filePath = join(process.cwd(), '..', '..', entry.apiMappingPath)
    const raw = await readFile(filePath, 'utf-8')
    return JSON.parse(raw) as ApiMapping
  } catch {
    return null
  }
}

/**
 * Check if a value is a PropDef (leaf node) vs a nested sub-component map.
 */
function isPropDef(
  value: PropDef | Record<string, PropDef>,
): value is PropDef {
  return typeof (value as PropDef).type === 'string'
}

/**
 * Flatten the vlting props from an api-mapping into a map of
 * sub-component name → props.
 *
 * Two formats exist:
 * 1. Flat (e.g. Button): { variant: PropDef, size: PropDef }
 *    → Map { "Button" → { variant, size } }
 *
 * 2. Compound (e.g. Dialog): { "Dialog.Root": { open: PropDef }, "Dialog.Content": { size: PropDef } }
 *    → Map { "Dialog.Root" → { open }, "Dialog.Content" → { size } }
 */
export function flattenProps(
  componentName: string,
  props: Record<string, PropDef | Record<string, PropDef>>,
): Map<string, Record<string, PropDef>> {
  const result = new Map<string, Record<string, PropDef>>()

  // Check the first entry to detect format
  const entries = Object.entries(props)
  if (entries.length === 0) return result

  const [, firstValue] = entries[0]

  if (isPropDef(firstValue)) {
    // Flat format — all entries are PropDefs for the root component
    const flat: Record<string, PropDef> = {}
    for (const [key, value] of entries) {
      if (isPropDef(value)) {
        flat[key] = value
      }
    }
    result.set(componentName, flat)
  } else {
    // Compound format — each key is a sub-component name
    for (const [key, value] of entries) {
      if (!isPropDef(value) && typeof value === 'object') {
        result.set(key, value as Record<string, PropDef>)
      }
    }
  }

  return result
}
