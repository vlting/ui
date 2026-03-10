import type { ReactNode } from 'react'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 id={slugify(title)} style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        {title}
      </h2>
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid var(--stl-borderColor, #e5e5e5)',
          marginBottom: 16,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </section>
  )
}

export function DemoCard({
  label,
  children,
  testId,
}: {
  label: string
  children: ReactNode
  testId?: string
}) {
  return (
    <div
      data-testid={testId}
      style={{
        border: '1px solid var(--stl-borderColor, #e5e5e5)',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#888',
          marginBottom: 12,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

export function DemoRow({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {children}
    </div>
  )
}
