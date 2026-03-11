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
    <div className="max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold">Documentation</h1>
      <p className="mb-8 text-foreground-secondary">
        Welcome to the @vlting/ui documentation. Choose a section below to get started, or
        browse the sidebar for individual components.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group rounded-lg border border-border p-4 transition-colors hover:border-foreground-secondary/30 hover:bg-surface-muted"
          >
            <h2 className="mb-1 text-base font-semibold group-hover:underline">
              {section.title}
            </h2>
            <p className="text-sm text-foreground-secondary">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
