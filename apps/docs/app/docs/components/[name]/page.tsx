import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { codeToHtml } from 'shiki'
import { CodeBlock } from '@/components/code-block'
import { ComponentExamples } from '@/components/component-examples'
import { PlaygroundSection } from '@/components/playground-section'
import { CompoundPropTables } from '@/components/prop-table'
import { flattenProps, loadApiMapping } from '@/lib/api-mapping'
import { getAllComponents, getComponent } from '@/lib/registry'

interface PageProps {
  params: Promise<{ name: string }>
}

export async function generateStaticParams() {
  return getAllComponents().map((c) => ({ name: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
    <div style={{ maxWidth: 896 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>{component.name}</h1>
        <p style={{ fontSize: 18, color: 'var(--stl-colorSubtitle)', marginBottom: 16 }}>{component.description}</p>
        <div style={{ display: 'inline-block' }}>
          <CodeBlock code={component.importPath} language="typescript" />
        </div>
      </div>

      {/* Examples */}
      {component.examples.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Examples</h2>
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
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>API Reference</h2>
          <CompoundPropTables propsMap={propsMap} />
        </section>
      )}

      {/* Notes */}
      {apiMapping && apiMapping.notes.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Notes</h2>
          <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--stl-colorSubtitle)' }}>
            {apiMapping.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Migration from shadcn */}
      {apiMapping && apiMapping.breaking.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Migration from shadcn</h2>
          <div style={{ overflowX: 'auto', border: '1px solid var(--stl-borderColor)', borderRadius: 8 }}>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--stl-borderColor)', background: 'var(--stl-surface1)' }}>
                  <th style={{ textAlign: 'left', paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontWeight: 500 }}>shadcn</th>
                  <th style={{ textAlign: 'left', paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontWeight: 500 }}>@vlting/ui</th>
                  <th style={{ textAlign: 'left', paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontWeight: 500 }}>Reason</th>
                </tr>
              </thead>
              <tbody>
                {apiMapping.breaking.map((b, i) => (
                  <tr key={i} style={{ borderBottom: i < apiMapping.breaking.length - 1 ? '1px solid var(--stl-borderColor)' : 'none' }}>
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontFamily: 'monospace', fontSize: 12 }}>{b.shadcn}</td>
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontFamily: 'monospace', fontSize: 12 }}>{b.vlting}</td>
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, color: 'var(--stl-colorSubtitle)' }}>{b.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* When to use / not use */}
      {(component.whenToUse || component.whenNotToUse) && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Usage Guidelines</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {component.whenToUse && (
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--stl-success)', marginBottom: 8 }}>When to use</h3>
                <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, color: 'var(--stl-colorSubtitle)' }}>
                  {component.whenToUse.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {component.whenNotToUse && (
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--stl-destructive)', marginBottom: 8 }}>
                  When NOT to use
                </h3>
                <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, color: 'var(--stl-colorSubtitle)' }}>
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
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Accessibility</h2>
          <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--stl-colorSubtitle)' }}>
            {component.a11yNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
