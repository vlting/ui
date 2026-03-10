import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllUtilities, utilityCategories, getUtilitiesByCategory } from '@/lib/utility-registry'

export const metadata: Metadata = {
  title: 'Utilities — @vlting/ui',
  description: 'Utility functions and helpers included in @vlting/ui.',
}

export default function UtilitiesPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Utilities</h1>
        <p className="text-lg text-foreground-secondary">
          Helper functions and hooks for common patterns.
        </p>
      </div>

      {utilityCategories.map((cat) => {
        const items = getUtilitiesByCategory(cat.key)
        if (items.length === 0) return null
        return (
          <section key={cat.key} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">{cat.label}</h2>
            <div className="grid gap-3">
              {items.map((util) => (
                <Link
                  key={util.slug}
                  href={`/docs/utilities/${util.slug}`}
                  className="block p-4 border border-border rounded-lg hover:bg-surface-muted transition-colors"
                >
                  <span className="font-mono text-sm font-medium">{util.name}</span>
                  <p className="text-sm text-foreground-secondary mt-1">
                    {util.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
