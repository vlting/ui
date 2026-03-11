import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllHooks } from '@/lib/hook-registry'

export const metadata: Metadata = {
  title: 'Hooks — @vlting/ui',
  description: 'Reusable React hooks for building accessible, interactive components.',
}

export default function HooksPage() {
  const hooks = getAllHooks()

  return (
    <div style={{ maxWidth: 896 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Hooks</h1>
        <p style={{ fontSize: 18, color: 'var(--stl-colorSubtitle)' }}>
          Reusable React hooks for building accessible, interactive components.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {hooks.map((hook) => (
          <Link
            key={hook.slug}
            href={`/docs/hooks/${hook.slug}`}
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
            <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'monospace', marginBottom: 4 }}>{hook.name}</h3>
            <p style={{ fontSize: 14, color: 'var(--stl-colorSubtitle)' }}>{hook.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
