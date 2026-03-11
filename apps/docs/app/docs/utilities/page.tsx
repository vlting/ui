import type { Metadata } from 'next'
import Link from 'next/link'
import { getUtilitiesByCategory, utilityCategories } from '@/lib/utility-registry'

export const metadata: Metadata = {
  title: 'Utilities — @vlting/ui',
  description: 'Utility functions and helpers included in @vlting/ui.',
}

export default function UtilitiesPage() {
  return (
    <div style={{ maxWidth: 896 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Utilities</h1>
        <p style={{ fontSize: 18, color: 'var(--stl-colorSubtitle)' }}>
          Helper functions and hooks for common patterns.
        </p>
      </div>

      {utilityCategories.map((cat) => {
        const items = getUtilitiesByCategory(cat.key)
        if (items.length === 0) return null
        return (
          <section key={cat.key} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>{cat.label}</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {items.map((util) => (
                <Link
                  key={util.slug}
                  href={`/docs/utilities/${util.slug}`}
                  style={{
                    display: 'block',
                    padding: 16,
                    border: '1px solid var(--stl-borderColor)',
                    borderRadius: 8,
                    transition: 'color 0.15s, background 0.15s',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 500 }}>{util.name}</span>
                  <p style={{ fontSize: 14, color: 'var(--stl-colorSubtitle)', marginTop: 4 }}>
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
