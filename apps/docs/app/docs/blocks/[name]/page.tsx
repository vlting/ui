import { notFound } from 'next/navigation'
import { BlockPreview } from '@/components/block-preview'
import { CodeBlock } from '@/components/code-block'
import { getAllBlocks, getBlock } from '@/lib/block-registry'

interface PageProps {
  params: Promise<{ name: string }>
}

export async function generateStaticParams() {
  return getAllBlocks().map((block) => ({ name: block.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { name } = await params
  const block = getBlock(name)
  if (!block) return { title: 'Block Not Found' }
  return {
    title: `${block.name} — @vlting/ui Blocks`,
    description: block.description,
  }
}

const categoryLabels: Record<string, string> = {
  auth: 'Authentication',
  sidebar: 'Navigation',
  dashboard: 'Dashboard',
  'data-table': 'Data Display',
  settings: 'Settings',
  pricing: 'Marketing',
  hero: 'Marketing',
  feed: 'Content',
  'app-shell': 'Layout',
  'empty-state': 'Feedback',
}

const categoryDescriptions: Record<string, string> = {
  auth: 'Authentication blocks provide login and signup forms with multiple UX patterns — standard, OTP, magic link, social-only, and combined flows.',
  sidebar:
    'Sidebar blocks provide navigation patterns from simple flat lists to complex nested trees, file browsers, and calendar views.',
  dashboard:
    'Dashboard blocks combine metrics, charts, and layout components into ready-made analytics views.',
  'data-table':
    'Data table blocks display structured data with search, sorting, pagination, and expandable row support.',
  settings:
    'Settings blocks provide profile editing, app preferences, and account management panels.',
  pricing:
    'Pricing blocks display subscription tiers, comparison tables, and billing options.',
  hero: 'Hero blocks provide landing page sections with centered, split, and image background layouts.',
  feed: 'Feed blocks display activity timelines, notification lists, and threaded comment systems.',
  'app-shell':
    'App shell blocks provide full application layouts with sidebar, tab, and split-pane navigation.',
  'empty-state':
    'Empty state blocks display placeholder content for empty data, errors, and coming-soon features.',
}

export default async function BlockPage({ params }: PageProps) {
  const { name } = await params
  const block = getBlock(name)

  if (!block) notFound()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{block.name}</h1>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {categoryLabels[block.category] || block.category}
          </span>
        </div>
        <p className="text-foreground-secondary">{block.description}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {block.variants.length} variant{block.variants.length !== 1 ? 's' : ''}:{' '}
          {block.variants.join(', ')}
        </p>
      </div>

      {/* Preview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <BlockPreview
          name={block.name}
          slug={block.slug}
          code={block.code}
          variants={block.variants}
          defaultVariant={block.defaultVariant}
        />
      </section>

      {/* Code Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <CodeBlock code={block.code} language="tsx" title="Example" />
      </section>

      {/* Category Info */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          About {categoryLabels[block.category]} Blocks
        </h2>
        <p className="text-foreground-secondary">
          {categoryDescriptions[block.category]}
        </p>
      </section>
    </div>
  )
}
