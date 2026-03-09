import { suggestComponents } from '../data/suggestions.js'

export function handleSuggestComponent(args: { intent: string }) {
  const suggestions = suggestComponents(args.intent)
  if (suggestions.length === 0) {
    return {
      suggestions: [],
      hint: 'No matching components found. Try describing the UI pattern (e.g., "confirmation dialog", "date picker", "sidebar navigation")',
    }
  }
  return { suggestions }
}
