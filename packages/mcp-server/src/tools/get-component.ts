import { findComponent } from '../data/registry.js'

export function handleGetComponent(args: { name: string }) {
  const component = findComponent(args.name)
  if (!component) {
    return { error: `Component "${args.name}" not found` }
  }
  return component
}
