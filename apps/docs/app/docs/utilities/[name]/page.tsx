import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getUtility, getAllUtilities } from '@/lib/utility-registry'
import { CodeBlock } from '@/components/code-block'

interface PageProps {
  params: Promise<{ name: string }>
}

export async function generateStaticParams() {
  return getAllUtilities().map((u) => ({ name: u.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params
  const util = getUtility(name)
  if (!util) return { title: 'Not Found' }
  return {
    title: `${util.name} — @vlting/ui`,
    description: util.description,
  }
}

export default async function UtilityPage({ params }: PageProps) {
  const { name } = await params
  const util = getUtility(name)
  if (!util) notFound()

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-mono">{util.name}</h1>
        <p className="text-lg text-foreground-secondary mb-4">
          {util.description}
        </p>
        <div className="inline-block">
          <CodeBlock code={util.importPath} language="typescript" />
        </div>
      </div>

      {/* Signature */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Signature</h2>
        <CodeBlock code={util.signature} language="typescript" />
      </section>

      {/* Usage */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <CodeBlock code={util.usage} language="tsx" />
      </section>

      {/* Parameters */}
      {util.params.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Parameters</h2>
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="text-left py-2 px-4 font-medium">Name</th>
                  <th className="text-left py-2 px-4 font-medium">Type</th>
                  <th className="text-left py-2 px-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {util.params.map((p) => (
                  <tr key={p.name} className="border-b border-border-muted last:border-0">
                    <td className="py-2 px-4 font-mono text-xs">{p.name}</td>
                    <td className="py-2 px-4 font-mono text-xs">{p.type}</td>
                    <td className="py-2 px-4 text-foreground-secondary">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Returns */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Returns</h2>
        <p className="text-foreground-secondary">{util.returns}</p>
      </section>
    </div>
  )
}
