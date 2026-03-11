import Link from 'next/link'

const features = [
  {
    title: '38+ Components',
    description: 'Full component library with shadcn API compatibility',
    href: '/docs/components/button',
  },
  {
    title: '10 Blocks',
    description:
      'Pre-composed layouts: auth, sidebar, dashboard, pricing, and more — each with multiple variants',
    href: '/docs/blocks/auth',
  },
  {
    title: '6 Chart Types',
    description: 'Area, Bar, Line, Pie, Radar, and Radial charts with 69 variants',
    href: '/docs/charts/bar',
  },
  {
    title: '3200+ Icons',
    description: 'Full Remix Icon set with tree-shakeable imports',
    href: '/docs/icons',
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">@vlting/ui</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-foreground-secondary">
          Cross-platform design system built on @vlting/stl. Works on web and React
          Native. Brand theming, accessibility-first, and fully tree-shakeable.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/docs/components/button"
            className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Components
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 rounded-lg border border-border bg-surface-muted p-4">
          <code className="text-sm">
            <span className="text-muted-foreground">$</span> yarn add @vlting/ui
          </code>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group rounded-lg border border-border p-6 transition-colors hover:border-foreground-secondary/30 hover:bg-surface-muted"
          >
            <h2 className="mb-2 text-lg font-semibold group-hover:underline">
              {feature.title}
            </h2>
            <p className="text-sm text-foreground-secondary">{feature.description}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
