import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { codeToHtml } from 'shiki'
import { getComponent, getAllComponents } from '@/lib/registry'
import { loadApiMapping, flattenProps } from '@/lib/api-mapping'
import { CodeBlock } from '@/components/code-block'
import { CompoundPropTables } from '@/components/prop-table'
import { ComponentExamples } from '@/components/component-examples'
import { PlaygroundSection } from '@/components/playground-section'

interface PageProps {
  params: Promise<{ name: string }>
}

export async function generateStaticParams() {
  return getAllComponents().map((c) => ({ name: c.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params
  const component = getComponent(name)
  if (!component) return { title: 'Not Found' }
  return {
    title: `${component.name} — @vlting/ui`,
    description: component.description,
  }
}

export default async function ComponentPage({ params }: PageProps) {
  const { name } = await params
  const component = getComponent(name)
  if (!component) notFound()

  const apiMapping = await loadApiMapping(name)

  const propsMap = apiMapping
    ? flattenProps(apiMapping.component, apiMapping.vlting.props)
    : null

  // Pre-highlight example code server-side for Shiki rendering
  const highlightedExamples = await Promise.all(
    component.examples.map(async (example) => {
      const trimmed = example.code.trim()
      const [light, dark] = await Promise.all([
        codeToHtml(trimmed, { lang: 'tsx', theme: 'github-light-default' }),
        codeToHtml(trimmed, { lang: 'tsx', theme: 'github-dark' }),
      ])
      return { ...example, codeHtml: { light, dark } }
    }),
  )

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{component.name}</h1>
        <p className="text-lg text-foreground-secondary mb-4">
          {component.description}
        </p>
        <div className="inline-block">
          <CodeBlock code={component.importPath} language="typescript" />
        </div>
      </div>

      {/* Examples */}
      {component.examples.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Examples</h2>
          <ComponentExamples
            componentSlug={component.slug}
            examples={highlightedExamples}
          />
        </section>
      )}

      {/* Playground */}
      <PlaygroundSection slug={component.slug} />

      {/* API Reference */}
      {propsMap && propsMap.size > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">API Reference</h2>
          <CompoundPropTables propsMap={propsMap} />
        </section>
      )}

      {/* Notes */}
      {apiMapping && apiMapping.notes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <ul className="list-disc list-inside space-y-1 text-foreground-secondary">
            {apiMapping.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Migration from shadcn */}
      {apiMapping && apiMapping.breaking.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Migration from shadcn
          </h2>
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="text-left py-2 px-4 font-medium">shadcn</th>
                  <th className="text-left py-2 px-4 font-medium">
                    @vlting/ui
                  </th>
                  <th className="text-left py-2 px-4 font-medium">Reason</th>
                </tr>
              </thead>
              <tbody>
                {apiMapping.breaking.map((b, i) => (
                  <tr
                    key={i}
                    className="border-b border-border-muted last:border-0"
                  >
                    <td className="py-2 px-4 font-mono text-xs">
                      {b.shadcn}
                    </td>
                    <td className="py-2 px-4 font-mono text-xs">
                      {b.vlting}
                    </td>
                    <td className="py-2 px-4 text-foreground-secondary">
                      {b.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* When to use / not use */}
      {(component.whenToUse || component.whenNotToUse) && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {component.whenToUse && (
              <div>
                <h3 className="text-sm font-semibold text-success mb-2">
                  When to use
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground-secondary">
                  {component.whenToUse.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {component.whenNotToUse && (
              <div>
                <h3 className="text-sm font-semibold text-destructive mb-2">
                  When NOT to use
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground-secondary">
                  {component.whenNotToUse.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Accessibility */}
      {component.a11yNotes && component.a11yNotes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
          <ul className="list-disc list-inside space-y-1 text-foreground-secondary">
            {component.a11yNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
