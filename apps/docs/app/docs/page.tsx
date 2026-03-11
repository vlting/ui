import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation — @vlting/ui',
  description:
    'Browse components, blocks, charts, icons, theming, and migration guides for @vlting/ui.',
}

const sections = [
  {
    title: 'Components',
    description:
      '38+ components with shadcn API compatibility, keyboard navigation, and brand theming.',
    href: '/docs/components/button',
  },
  {
    title: 'Blocks',
    description:
      '10 variant-driven blocks: auth, sidebar, dashboard, pricing, hero, and more.',
    href: '/docs/blocks/auth',
  },
  {
    title: 'Charts',
    description:
      '6 chart types with 69 variants, responsive sizing, and accessible data tables.',
    href: '/docs/charts/bar',
  },
  {
    title: 'Icons',
    description:
      '3200+ Remix Icons with tree-shakeable imports, searchable browser, and category filters.',
    href: '/docs/icons',
  },
  {
    title: 'Theming',
    description:
      'Brand system with 4 built-in themes, dark/light mode, font config, and design tokens.',
    href: '/docs/theming',
  },
  {
    title: 'Migration',
    description:
      'Migrate from shadcn/ui with API mapping, import changes, and component equivalents.',
    href: '/docs/migration',
  },
]

export default function DocsPage() {
  return (
    <div style={{ maxWidth: 768 }}>
      <h1 style={{ marginBottom: 16, fontSize: 30, fontWeight: 700 }}>Documentation</h1>
      <p style={{ marginBottom: 32, color: 'var(--stl-colorSubtitle)' }}>
        Welcome to the @vlting/ui documentation. Choose a section below to get started, or
        browse the sidebar for individual components.
      </p>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            style={{
              display: 'block',
              borderRadius: 8,
              border: '1px solid var(--stl-borderColor)',
              padding: 16,
              transition: 'color 0.15s, background 0.15s',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h2 style={{ marginBottom: 4, fontSize: 16, fontWeight: 600 }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--stl-colorSubtitle)' }}>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
