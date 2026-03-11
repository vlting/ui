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
    <div style={{ maxWidth: 1024, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24, paddingTop: 64, paddingBottom: 64 }}>
      <section style={{ marginBottom: 64, textAlign: 'center' }}>
        <h1 style={{ marginBottom: 16, fontSize: 36, fontWeight: 700, letterSpacing: '-0.025em' }}>@vlting/ui</h1>
        <p style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 32, maxWidth: 672, fontSize: 18, color: 'var(--stl-colorSubtitle)' }}>
          Cross-platform design system built on @vlting/stl. Works on web and React
          Native. Brand theming, accessibility-first, and fully tree-shakeable.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Link
            href="/docs"
            style={{
              borderRadius: 8,
              background: 'var(--stl-color)',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--stl-background)',
              transition: 'opacity 0.15s',
              textDecoration: 'none',
            }}
          >
            Get Started
          </Link>
          <Link
            href="/docs/components/button"
            style={{
              borderRadius: 8,
              border: '1px solid var(--stl-borderColor)',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 14,
              fontWeight: 500,
              transition: 'color 0.15s, background 0.15s',
              textDecoration: 'none',
              color: 'var(--stl-color)',
            }}
          >
            Components
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: 64 }}>
        <div style={{ marginBottom: 32, borderRadius: 8, border: '1px solid var(--stl-borderColor)', background: 'var(--stl-surface1)', padding: 16 }}>
          <code style={{ fontSize: 14 }}>
            <span style={{ color: 'var(--stl-placeholderColor)' }}>$</span> yarn add @vlting/ui
          </code>
        </div>
      </section>

      <section style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            style={{
              display: 'block',
              borderRadius: 8,
              border: '1px solid var(--stl-borderColor)',
              padding: 24,
              transition: 'color 0.15s, background 0.15s',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h2 style={{ marginBottom: 8, fontSize: 18, fontWeight: 600 }}>
              {feature.title}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--stl-colorSubtitle)' }}>{feature.description}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
