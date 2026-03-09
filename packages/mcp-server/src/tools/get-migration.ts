import { getMigrationMapping } from '../data/mappings.js'

export function handleGetMigration(args: { component: string }) {
  const mapping = getMigrationMapping(args.component)
  if (!mapping) {
    return { error: `No migration mapping found for "${args.component}"` }
  }
  return mapping
}
