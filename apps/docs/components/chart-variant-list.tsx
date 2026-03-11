import type { ChartVariant } from '@/lib/chart-registry'
import { CodeBlock } from './code-block'

interface ChartVariantListProps {
  variants: ChartVariant[]
}

export function ChartVariantList({ variants }: ChartVariantListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <div key={variant.name} id={variant.name.toLowerCase().replace(/\s+/g, '-')}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{variant.name}</h3>
          <p style={{ fontSize: 14, color: 'var(--stl-colorSubtitle)', marginBottom: 12 }}>
            {variant.description}
          </p>
          <CodeBlock code={variant.code} language="tsx" title={variant.name} />
        </div>
      ))}
    </div>
  )
}
