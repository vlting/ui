import type { PropDef } from '@/lib/api-mapping'

interface PropTableProps {
  props: Record<string, PropDef>
  title?: string
}

export function PropTable({ props, title }: PropTableProps) {
  const entries = Object.entries(props)
  if (entries.length === 0) return null

  return (
    <div className="my-6">
      {title && <h4 className="text-base font-semibold mb-3 font-mono">{title}</h4>}
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              <th className="text-left py-2 px-4 font-medium">Prop</th>
              <th className="text-left py-2 px-4 font-medium">Type</th>
              <th className="text-left py-2 px-4 font-medium">Default</th>
              <th className="text-left py-2 px-4 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([name, def]) => (
              <tr key={name} className="border-b border-border-muted last:border-0">
                <td className="py-2 px-4 font-mono text-sm">
                  {name}
                  {def.required && (
                    <span
                      className="text-destructive ml-0.5"
                      title="Required"
                      aria-label="required"
                    >
                      *
                    </span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {def.values && def.values.length > 0 ? (
                    <span className="font-mono text-xs">
                      {def.values.map((v) => `"${v}"`).join(' | ')}
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-foreground-secondary">
                      {def.type}
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 font-mono text-xs text-muted-foreground">
                  {def.default || '—'}
                </td>
                <td className="py-2 px-4 text-foreground-secondary">
                  {def.description || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface CompoundPropTablesProps {
  propsMap: Map<string, Record<string, PropDef>>
}

export function CompoundPropTables({ propsMap }: CompoundPropTablesProps) {
  const entries = Array.from(propsMap.entries())
  if (entries.length === 0) return null

  return (
    <div>
      {entries.map(([subComponent, props]) => (
        <PropTable key={subComponent} title={subComponent} props={props} />
      ))}
    </div>
  )
}
