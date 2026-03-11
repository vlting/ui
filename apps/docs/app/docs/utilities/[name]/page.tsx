import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CodeBlock } from '@/components/code-block'
import { getAllUtilities, getUtility } from '@/lib/utility-registry'

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
    <div style={{ maxWidth: 896 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8, fontFamily: 'monospace' }}>{util.name}</h1>
        <p style={{ fontSize: 18, color: 'var(--stl-colorSubtitle)', marginBottom: 16 }}>{util.description}</p>
        <div style={{ display: 'inline-block' }}>
          <CodeBlock code={util.importPath} language="typescript" />
        </div>
      </div>

      {/* Signature */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Signature</h2>
        <CodeBlock code={util.signature} language="typescript" />
      </section>

      {/* Usage */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Usage</h2>
        <CodeBlock code={util.usage} language="tsx" />
      </section>

      {/* Parameters */}
      {util.params.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Parameters</h2>
          <div style={{ overflowX: 'auto', border: '1px solid var(--stl-borderColor)', borderRadius: 8 }}>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--stl-borderColor)', background: 'var(--stl-surface1)' }}>
                  <th style={{ textAlign: 'left', paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontWeight: 500 }}>Name</th>
                  <th style={{ textAlign: 'left', paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontWeight: 500 }}>Type</th>
                  <th style={{ textAlign: 'left', paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontWeight: 500 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {util.params.map((p, i) => (
                  <tr key={p.name} style={{ borderBottom: i < util.params.length - 1 ? '1px solid var(--stl-borderColor)' : 'none' }}>
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontFamily: 'monospace', fontSize: 12 }}>{p.name}</td>
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontFamily: 'monospace', fontSize: 12 }}>{p.type}</td>
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, color: 'var(--stl-colorSubtitle)' }}>
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Returns */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Returns</h2>
        <p style={{ color: 'var(--stl-colorSubtitle)' }}>{util.returns}</p>
      </section>
    </div>
  )
}
