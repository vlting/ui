import type { ChartVariant } from '@/lib/chart-registry'
import { CodeBlock } from './code-block'

interface ChartVariantListProps {
  variants: ChartVariant[]
}

export function ChartVariantList({ variants }: ChartVariantListProps) {
  return (
    <div className="space-y-8">
      {variants.map((variant) => (
        <div key={variant.name} id={variant.name.toLowerCase().replace(/\s+/g, '-')}>
          <h3 className="text-lg font-semibold mb-1">{variant.name}</h3>
          <p className="text-sm text-foreground-secondary mb-3">
            {variant.description}
          </p>
          <CodeBlock code={variant.code} language="tsx" title={variant.name} />
        </div>
      ))}
    </div>
  )
}
