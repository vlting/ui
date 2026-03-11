import { notFound } from 'next/navigation'
import { ChartVariantList } from '@/components/chart-variant-list'
import { CodeBlock } from '@/components/code-block'
import { getAllCharts, getChart } from '@/lib/chart-registry'
import { ChartPreview } from '../chart-preview'

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>{chart.name}</h1>
        <p style={{ color: 'var(--stl-colorSubtitle)' }}>{chart.description}</p>
      </div>

      {/* Live Preview */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Preview</h2>
        <ChartPreview type={chart.slug} />
      </section>

      {/* Import */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Import</h2>
        <CodeBlock code={chart.importPath} language="tsx" />
      </section>

      {/* When to use */}
      {chart.whenToUse && chart.whenToUse.length > 0 && (
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>When to use</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {chart.whenToUse.map((item) => (
                <li
                  key={item}
                  style={{ fontSize: 14, color: 'var(--stl-colorSubtitle)', display: 'flex', alignItems: 'flex-start', gap: 8 }}
                >
                  <span style={{ color: 'var(--stl-success)', marginTop: 2 }}>+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {chart.whenNotToUse && chart.whenNotToUse.length > 0 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>When NOT to use</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {chart.whenNotToUse.map((item) => (
                  <li
                    key={item}
                    style={{ fontSize: 14, color: 'var(--stl-colorSubtitle)', display: 'flex', alignItems: 'flex-start', gap: 8 }}
                  >
                    <span style={{ color: 'var(--stl-destructive)', marginTop: 2 }}>-</span>
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
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Variants ({chart.variants.length})</h2>
        <ChartVariantList variants={chart.variants} />
      </section>

      {/* Cross-platform note */}
      <section style={{
        border: '1px solid var(--stl-primary3, #b3d4fc)',
        background: 'var(--stl-primary1, #f0f7ff)',
        borderRadius: 8,
        padding: 16,
      }}>
        <p style={{ fontSize: 14, color: 'var(--stl-primary9, #0066cc)' }}>
          <strong>Cross-platform:</strong> Charts use Victory with react-native-svg for
          cross-platform rendering. The same component code works on both web and React
          Native.
        </p>
      </section>
    </div>
  )
}
