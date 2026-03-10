import { Index } from 'flexsearch'
import { getAllBlocks } from './block-registry'
import { getAllCharts } from './chart-registry'
import { icons } from './icon-data'
import { getAllComponents } from './registry'

export type SearchItemType = 'component' | 'block' | 'chart' | 'icon' | 'page'

export interface SearchItem {
  id: number
  type: SearchItemType
  name: string
  description: string
  href: string
  category?: string
}

let searchIndex: Index | null = null
let searchItems: SearchItem[] = []

function buildIndex() {
  if (searchIndex) return

  searchIndex = new Index({ tokenize: 'forward', resolution: 9 })
  searchItems = []
  let id = 0

  // Components
  for (const c of getAllComponents()) {
    searchItems.push({
      id,
      type: 'component',
      name: c.name,
      description: c.description,
      href: `/docs/components/${c.slug}`,
      category: c.category,
    })
    searchIndex.add(id, `${c.name} ${c.description}`)
    id++
  }

  // Blocks
  for (const b of getAllBlocks()) {
    searchItems.push({
      id,
      type: 'block',
      name: b.name,
      description: b.description,
      href: `/docs/blocks/${b.slug}`,
      category: b.category,
    })
    searchIndex.add(id, `${b.name} ${b.description}`)
    id++
  }

  // Charts
  for (const ch of getAllCharts()) {
    searchItems.push({
      id,
      type: 'chart',
      name: ch.name,
      description: ch.description,
      href: `/docs/charts/${ch.slug}`,
    })
    searchIndex.add(id, `${ch.name} ${ch.description}`)
    id++
  }

  // Icons (index by name + category only — too many to include descriptions)
  for (const icon of icons) {
    searchItems.push({
      id,
      type: 'icon',
      name: icon.name,
      description: `${icon.category} icon`,
      href: `/docs/icons?q=${encodeURIComponent(icon.name)}`,
      category: icon.category,
    })
    searchIndex.add(id, `${icon.name} ${icon.category}`)
    id++
  }

  // Static pages
  const pages: Array<{ name: string; description: string; href: string }> = [
    { name: 'Getting Started', description: 'Introduction to @vlting/ui', href: '/docs' },
    {
      name: 'Theming',
      description: 'Brand system, palettes, tokens, and fonts',
      href: '/docs/theming',
    },
    {
      name: 'Migration Guide',
      description: 'Migrate from shadcn/ui to @vlting/ui',
      href: '/docs/migration',
    },
    {
      name: 'Icons',
      description: 'Browse 3200+ Remix icons with search and filter',
      href: '/docs/icons',
    },
  ]
  for (const p of pages) {
    searchItems.push({
      id,
      type: 'page',
      name: p.name,
      description: p.description,
      href: p.href,
    })
    searchIndex.add(id, `${p.name} ${p.description}`)
    id++
  }
}

export function search(query: string, limit = 20): SearchItem[] {
  buildIndex()
  if (!query.trim() || !searchIndex) return []
  const ids = searchIndex.search(query, { limit }) as number[]
  return ids.map((id) => searchItems[id]).filter(Boolean)
}
