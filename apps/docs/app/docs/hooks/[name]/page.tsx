import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { codeToHtml } from 'shiki'
import { getHook, getAllHooks } from '@/lib/hook-registry'

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
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-mono mb-2">{hook.name}</h1>
        <p className="text-lg text-foreground-secondary mb-4">{hook.description}</p>
        <div className="rounded-lg border border-border overflow-hidden">
          <div
            className="block dark:hidden overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!text-sm"
            dangerouslySetInnerHTML={{ __html: importHtml.light }}
          />
          <div
            className="hidden dark:block overflow-x-auto p-4 text-sm bg-surface [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!text-sm"
            dangerouslySetInnerHTML={{ __html: importHtml.dark }}
          />
        </div>
      </div>

      {/* Signature */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Signature</h2>
        <code className="block p-3 bg-surface-muted rounded-lg text-sm font-mono overflow-x-auto">
          {hook.signature}
        </code>
      </section>

      {/* Parameters */}
      {hook.parameters.length > 0 && (
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
                {hook.parameters.map((param) => (
                  <tr key={param.name} className="border-b border-border-muted last:border-0">
                    <td className="py-2 px-4 font-mono text-xs">{param.name}</td>
                    <td className="py-2 px-4 font-mono text-xs">{param.type}</td>
                    <td className="py-2 px-4 text-foreground-secondary">{param.description}</td>
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
        <p className="text-foreground-secondary">{hook.returns}</p>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <div
            className="block dark:hidden overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!text-sm"
            dangerouslySetInnerHTML={{ __html: usageHtml.light }}
          />
          <div
            className="hidden dark:block overflow-x-auto p-4 text-sm bg-surface [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!text-sm"
            dangerouslySetInnerHTML={{ __html: usageHtml.dark }}
          />
        </div>
      </section>
    </div>
  )
}
