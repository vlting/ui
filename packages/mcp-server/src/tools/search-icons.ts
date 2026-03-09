import { searchIcons, getIconCategories } from '../data/icons.js'

export function handleSearchIcons(args: {
  query?: string
  category?: string
  style?: 'line' | 'fill'
  limit?: number
}) {
  if (!args.query && !args.category) {
    return {
      categories: getIconCategories(),
      hint: 'Provide a query or category to search icons',
    }
  }

  return searchIcons({
    query: args.query,
    category: args.category,
    style: args.style,
    limit: args.limit,
  })
}
