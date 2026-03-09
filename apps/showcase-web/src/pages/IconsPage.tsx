import { useState, useMemo } from 'react'
import { Section, DemoCard, DemoRow } from '../components/Section'

// Import a subset of icons for the showcase
// The full set has 3200+ icons — we show a representative sample
const sampleIcons = [
  'home', 'search', 'settings', 'user', 'heart', 'star', 'mail',
  'phone', 'camera', 'edit', 'trash', 'download', 'upload', 'share',
  'lock', 'unlock', 'eye', 'bell', 'calendar', 'clock', 'map',
  'link', 'bookmark', 'folder', 'file', 'image', 'video', 'music',
  'wifi', 'bluetooth', 'battery', 'sun', 'moon', 'cloud', 'thunder',
]

export function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredIcons = useMemo(() =>
    sampleIcons.filter(name => name.includes(searchQuery.toLowerCase())),
    [searchQuery]
  )

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Icons</h1>
      <p style={{ color: '#666', marginBottom: 24, fontSize: 14 }}>
        3,200+ Remixicon icons available via @vlting/ui/icons. Both Line and Fill variants.
      </p>

      <Section title="Icon Browser">
        <DemoCard label="Search icons">
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search icons..."
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', width: '100%', maxWidth: 400, marginBottom: 16 }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8 }}>
            {filteredIcons.map(name => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #eee',
                  cursor: 'pointer',
                  fontSize: 11,
                  textAlign: 'center',
                }}
                title={name}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>
                  {/* Placeholder — actual icons render via @vlting/ui/icons */}
                  ◆
                </div>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{name}</span>
              </div>
            ))}
          </div>
        </DemoCard>
      </Section>

      <Section title="Usage">
        <DemoCard label="How to use icons">
          <pre style={{ fontSize: 12, padding: 12, background: '#f5f5f5', borderRadius: 6, overflow: 'auto' }}>
{`// Import specific icons
import { RiHomeLine, RiSearchLine, RiSettingsFill } from '@vlting/ui/icons'

// Use in JSX
<RiHomeLine size={24} color="currentColor" />

// Dynamic icon loading
import { Icon } from '@vlting/ui/icons/dynamic'
<Icon name="ri-home-line" size={24} />

// Browse by category
import { categories } from '@vlting/ui/icons/categories'
// categories.business, categories.communication, etc.`}
          </pre>
        </DemoCard>
      </Section>

      <Section title="Icon Categories">
        <DemoCard label="Available categories">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              'Business', 'Communication', 'Design', 'Development',
              'Document', 'Editor', 'Finance', 'Health', 'Logos',
              'Map', 'Media', 'Others', 'System', 'User', 'Weather',
            ].map(cat => (
              <span
                key={cat}
                style={{
                  padding: '4px 12px',
                  borderRadius: 16,
                  background: '#f0f0f0',
                  fontSize: 13,
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </DemoCard>
      </Section>
    </div>
  )
}
