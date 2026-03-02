import { notFound } from 'next/navigation'
import { getChart, getAllCharts } from '@/lib/chart-registry'
import { CodeBlock } from '@/components/code-block'
import { ChartVariantList } from '@/components/chart-variant-list'

interface PageProps {
  params: Promise<{ type: string }>
}

export async function generateStaticParams() {
  return getAllCharts().map((chart) => ({ type: chart.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { type } = await params
  const chart = getChart(type)
  if (!chart) return { title: 'Chart Not Found' }
  return {
    title: `${chart.name} — @vlting/ui Charts`,
    description: chart.description,
  }
}

export default async function ChartPage({ params }: PageProps) {
  const { type } = await params
  const chart = getChart(type)

  if (!chart) notFound()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{chart.name}</h1>
        <p className="text-foreground-secondary">{chart.description}</p>
      </div>

      {/* Import */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Import</h2>
        <CodeBlock code={chart.importPath} language="tsx" />
      </section>

      {/* When to use */}
      {chart.whenToUse && chart.whenToUse.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">When to use</h2>
            <ul className="space-y-1">
              {chart.whenToUse.map((item) => (
                <li
                  key={item}
                  className="text-sm text-foreground-secondary flex items-start gap-2"
                >
                  <span className="text-success mt-0.5">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {chart.whenNotToUse && chart.whenNotToUse.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">When NOT to use</h2>
              <ul className="space-y-1">
                {chart.whenNotToUse.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-foreground-secondary flex items-start gap-2"
                  >
                    <span className="text-destructive mt-0.5">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Variants */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Variants ({chart.variants.length})
        </h2>
        <ChartVariantList variants={chart.variants} />
      </section>

      {/* Note about live rendering */}
      <section className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Note:</strong> Charts use Victory Native with react-native-svg
          for cross-platform rendering (web + React Native). Live chart previews
          require the react-native-svg-web bridge which is configured in the main
          application.
        </p>
      </section>
    </div>
  )
}
