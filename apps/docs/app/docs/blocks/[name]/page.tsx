import { notFound } from 'next/navigation'
import { getBlock, getAllBlocks } from '@/lib/block-registry'
import { CodeBlock } from '@/components/code-block'
import { BlockPreview } from '@/components/block-preview'

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
  login: 'Authentication',
  signup: 'Registration',
  sidebar: 'Navigation',
  dashboard: 'Dashboard',
  originals: 'Cross-Platform',
}

const categoryDescriptions: Record<string, string> = {
  login:
    'Login blocks provide ready-made authentication forms with various UX patterns — from simple email/password to passwordless and social login.',
  signup:
    'Signup blocks provide registration forms with various flows — standard forms, multi-step wizards, invite-based, and social-first.',
  sidebar:
    'Sidebar blocks provide navigation patterns ranging from simple flat lists to complex nested trees, file browsers, and calendar views.',
  dashboard:
    'Dashboard blocks combine metrics, charts, and layout components into ready-made analytics views.',
  originals:
    'Original cross-platform blocks work on both web and React Native with adaptive layouts.',
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
      </div>

      {/* Preview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <BlockPreview name={block.name} slug={block.slug} code={block.code} />
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
