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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 30, fontWeight: 700 }}>{block.name}</h1>
          <span style={{
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
            fontSize: 12,
            fontWeight: 500,
            borderRadius: 9999,
            background: 'var(--stl-primary2, #e0f0ff)',
            color: 'var(--stl-primary9, #0066cc)',
          }}>
            {categoryLabels[block.category] || block.category}
          </span>
        </div>
        <p style={{ color: 'var(--stl-colorSubtitle)' }}>{block.description}</p>
        <p style={{ fontSize: 14, color: 'var(--stl-placeholderColor)', marginTop: 8 }}>
          {block.variants.length} variant{block.variants.length !== 1 ? 's' : ''}:{' '}
          {block.variants.join(', ')}
        </p>
      </div>

      {/* Preview */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Preview</h2>
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
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Usage</h2>
        <CodeBlock code={block.code} language="tsx" title="Example" />
      </section>

      {/* Category Info */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
          About {categoryLabels[block.category]} Blocks
        </h2>
        <p style={{ color: 'var(--stl-colorSubtitle)' }}>
          {categoryDescriptions[block.category]}
        </p>
      </section>
    </div>
  )
}
