export function HomePage() {
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
        @vlting/stl Showcase
      </h1>
      <p
        style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 24,
          maxWidth: 600,
          lineHeight: 1.6,
        }}
      >
        A comprehensive kitchen-sink demo of the STL (Style Token Layer) design system.
        Browse every primitive, component, hook, and block available in the library.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {[
          {
            label: 'Styling & Tokens',
            desc: 'Color scales, spacing, typography',
            href: '/styling',
          },
          {
            label: 'Primitives',
            desc: 'Box, Text, Stack, Badge, etc.',
            href: '/primitives',
          },
          { label: 'Components', desc: 'Card, Alert, Avatar, etc.', href: '/components' },
          { label: 'Forms', desc: 'Input, Select, Checkbox, etc.', href: '/forms' },
          { label: 'Overlays', desc: 'Dialog, Sheet, Toast, etc.', href: '/overlays' },
          {
            label: 'Data Display',
            desc: 'Table, Accordion, Chart, etc.',
            href: '/data-display',
          },
          {
            label: 'Navigation',
            desc: 'Tabs, Breadcrumb, Menu, etc.',
            href: '/navigation',
          },
          { label: 'Hooks', desc: '23 hooks across 3 packages', href: '/hooks' },
          { label: 'Blocks', desc: '10 pre-built page layouts', href: '/blocks' },
          { label: 'Icons', desc: '3,200+ Remixicon set', href: '/icons' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              display: 'block',
              padding: 20,
              borderRadius: 8,
              border: '1px solid var(--stl-borderColor, #e5e5e5)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>{item.desc}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
