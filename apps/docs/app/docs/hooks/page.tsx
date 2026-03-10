import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllHooks } from '@/lib/hook-registry'

export const metadata: Metadata = {
  title: 'Hooks — @vlting/ui',
  description: 'Reusable React hooks for building accessible, interactive components.',
}

export default function HooksPage() {
  const hooks = getAllHooks()

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hooks</h1>
        <p className="text-lg text-foreground-secondary">
          Reusable React hooks for building accessible, interactive components.
        </p>
      </div>

      <div className="grid gap-3">
        {hooks.map((hook) => (
          <Link
            key={hook.slug}
            href={`/docs/hooks/${hook.slug}`}
            className="block p-4 border border-border rounded-lg hover:bg-surface-muted transition-colors"
          >
            <h3 className="text-base font-semibold font-mono mb-1">
              {hook.name}
            </h3>
            <p className="text-sm text-foreground-secondary">
              {hook.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
