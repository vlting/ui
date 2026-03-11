import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { codeToHtml } from 'shiki'
import { getAllHooks, getHook } from '@/lib/hook-registry'

interface PageProps {
  params: Promise<{ name: string }>
}

export async function generateStaticParams() {
  return getAllHooks().map((h) => ({ name: h.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params
  const hook = getHook(name)
  if (!hook) return { title: 'Not Found' }
  return {
    title: `${hook.name} — @vlting/ui`,
    description: hook.description,
  }
}

async function highlight(code: string, lang = 'tsx') {
  const trimmed = code.trim()
  const [light, dark] = await Promise.all([
    codeToHtml(trimmed, { lang, theme: 'github-light-default' }),
    codeToHtml(trimmed, { lang, theme: 'github-dark' }),
  ])
  return { light, dark }
}

export default async function HookPage({ params }: PageProps) {
  const { name } = await params
  const hook = getHook(name)
  if (!hook) notFound()

  const importHtml = await highlight(hook.importPath, 'typescript')
  const usageHtml = await highlight(hook.usage)

  return (
    <div style={{ maxWidth: 896 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, fontFamily: 'monospace', marginBottom: 8 }}>{hook.name}</h1>
        <p style={{ fontSize: 18, color: 'var(--stl-colorSubtitle)', marginBottom: 16 }}>{hook.description}</p>
        <div style={{ borderRadius: 8, border: '1px solid var(--stl-borderColor)', overflow: 'hidden' }}>
          <div
            className="code-light"
            style={{ overflowX: 'auto', padding: 16, fontSize: 14 }}
            dangerouslySetInnerHTML={{ __html: importHtml.light }}
          />
          <div
            className="code-dark"
            style={{ overflowX: 'auto', padding: 16, fontSize: 14, background: 'var(--stl-surface)' }}
            dangerouslySetInnerHTML={{ __html: importHtml.dark }}
          />
        </div>
      </div>

      {/* Signature */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Signature</h2>
        <code style={{ display: 'block', padding: 12, background: 'var(--stl-surface1)', borderRadius: 8, fontSize: 14, fontFamily: 'monospace', overflowX: 'auto' }}>
          {hook.signature}
        </code>
      </section>

      {/* Parameters */}
      {hook.parameters.length > 0 && (
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
                {hook.parameters.map((param, i) => (
                  <tr
                    key={param.name}
                    style={{ borderBottom: i < hook.parameters.length - 1 ? '1px solid var(--stl-borderColor)' : 'none' }}
                  >
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontFamily: 'monospace', fontSize: 12 }}>{param.name}</td>
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, fontFamily: 'monospace', fontSize: 12 }}>{param.type}</td>
                    <td style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, color: 'var(--stl-colorSubtitle)' }}>
                      {param.description}
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
        <p style={{ color: 'var(--stl-colorSubtitle)' }}>{hook.returns}</p>
      </section>

      {/* Usage */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Usage</h2>
        <div style={{ borderRadius: 8, border: '1px solid var(--stl-borderColor)', overflow: 'hidden' }}>
          <div
            className="code-light"
            style={{ overflowX: 'auto', padding: 16, fontSize: 14 }}
            dangerouslySetInnerHTML={{ __html: usageHtml.light }}
          />
          <div
            className="code-dark"
            style={{ overflowX: 'auto', padding: 16, fontSize: 14, background: 'var(--stl-surface)' }}
            dangerouslySetInnerHTML={{ __html: usageHtml.dark }}
          />
        </div>
      </section>

      <style>{`
        [data-color-mode="light"] .code-dark,
        :root:not([data-color-mode]) .code-dark { display: none; }
        [data-color-mode="dark"] .code-light { display: none; }
        .code-light pre, .code-dark pre { background: transparent !important; margin: 0 !important; padding: 0 !important; }
        .code-light code, .code-dark code { font-size: 14px !important; }
      `}</style>
    </div>
  )
}
