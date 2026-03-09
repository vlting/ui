import { listComponents } from '../data/registry.js'

export function handleListComponents(args: {
  category?: string
  layer?: string
}) {
  const components = listComponents({
    category: args.category,
    layer: args.layer,
  })

  return components.map((c) => ({
    name: c.name,
    category: c.category,
    layer: c.layer,
    platforms: c.platforms,
    whenToUse: c.whenToUse,
  }))
}
