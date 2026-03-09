import { useState } from 'react'
import { Section, DemoCard, DemoRow } from '../components/Section'
import { Button } from '@vlting/ui/components'

const blocks = [
  { name: 'AuthBlock', desc: 'Login, signup, forgot password flows' },
  { name: 'DashboardBlock', desc: 'Dashboard layout with metrics and charts' },
  { name: 'DataTableBlock', desc: 'Full data table with sorting, filtering, pagination' },
  { name: 'SettingsBlock', desc: 'Settings page with form sections' },
  { name: 'PricingBlock', desc: 'Pricing cards with feature comparison' },
  { name: 'AppShellBlock', desc: 'Application shell with sidebar navigation' },
  { name: 'SidebarBlock', desc: 'Sidebar navigation layout' },
  { name: 'HeroBlock', desc: 'Hero section with CTA' },
  { name: 'FeedBlock', desc: 'Activity feed / timeline' },
  { name: 'EmptyStateBlock', desc: 'Empty state with illustration and action' },
]

export function BlocksPage() {
  const [activeBlock, setActiveBlock] = useState<string | null>(null)

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Blocks</h1>
      <p style={{ color: '#666', marginBottom: 24, fontSize: 14 }}>
        Pre-built page layouts composed from primitives and components. Each block is a complete, production-ready UI section.
      </p>

      <Section title="Available Blocks">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {blocks.map(block => (
            <DemoCard key={block.name} label={block.name}>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>{block.desc}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveBlock(activeBlock === block.name ? null : block.name)}
              >
                {activeBlock === block.name ? 'Hide Preview' : 'Show Preview'}
              </Button>
              {activeBlock === block.name && (
                <div style={{
                  marginTop: 12,
                  padding: 16,
                  background: 'var(--stl-surface1, #f8f8f8)',
                  borderRadius: 8,
                  border: '1px dashed #ddd',
                  textAlign: 'center',
                  color: '#888',
                  fontSize: 14,
                }}>
                  Block preview — {block.name} renders here when imported from @vlting/ui/blocks
                </div>
              )}
            </DemoCard>
          ))}
        </div>
      </Section>

      <Section title="Block Architecture">
        <DemoCard label="How blocks are structured">
          <pre style={{ fontSize: 12, padding: 12, background: '#f5f5f5', borderRadius: 6, overflow: 'auto' }}>
{`// Import a block
import { AuthBlock } from '@vlting/ui/blocks'

// Blocks are self-contained compositions
<AuthBlock
  mode="signin"
  onSubmit={handleAuth}
  brandLogo={<Logo />}
/>

// Each block uses:
// - STL primitives (Box, Text, Stack)
// - Components (Button, Input, Card)
// - Headless hooks (useDisclosure, useListState)
// - Design tokens (colors, spacing, typography)`}
          </pre>
        </DemoCard>
      </Section>
    </div>
  )
}
