import { useState, useRef } from 'react'
import { Section, DemoCard, DemoRow } from '../components/Section'
import { Button } from '@vlting/ui/components'

// stl-react hooks
import {
  useColorMode,
  useConditions,
  useLayout,
  useMediaQuery,
  useRTL,
  useTokens,
  useTransition,
} from '@vlting/stl-react'

// stl-headless hooks
import {
  useDisclosure,
  useListState,
  useSearch,
  useTabs,
  useToastQueue,
} from '@vlting/stl-headless'

// app-level hooks
import { useControllableState } from '@vlting/ui/hooks'
import { useReducedMotion } from '@vlting/ui/hooks'

export function HooksPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Hooks</h1>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#666' }}>stl-react Hooks</h2>

      <Section title="useColorMode">
        <DemoCard label="Color mode state">
          <UseColorModeDemo />
        </DemoCard>
      </Section>

      <Section title="useConditions">
        <DemoCard label="Active responsive conditions">
          <UseConditionsDemo />
        </DemoCard>
      </Section>

      <Section title="useMediaQuery">
        <DemoCard label="Media query match">
          <UseMediaQueryDemo />
        </DemoCard>
      </Section>

      <Section title="useRTL">
        <DemoCard label="RTL direction state">
          <UseRTLDemo />
        </DemoCard>
      </Section>

      <Section title="useTransition">
        <DemoCard label="CSS transition helper">
          <UseTransitionDemo />
        </DemoCard>
      </Section>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, marginTop: 32, color: '#666' }}>stl-headless Hooks</h2>

      <Section title="useDisclosure">
        <DemoCard label="Open/close state management">
          <UseDisclosureDemo />
        </DemoCard>
      </Section>

      <Section title="useListState">
        <DemoCard label="List selection management">
          <UseListStateDemo />
        </DemoCard>
      </Section>

      <Section title="useSearch">
        <DemoCard label="Search/filter helper">
          <UseSearchDemo />
        </DemoCard>
      </Section>

      <Section title="useTabs">
        <DemoCard label="Tab state management">
          <UseTabsDemo />
        </DemoCard>
      </Section>

      <Section title="useToastQueue">
        <DemoCard label="Toast notification queue">
          <UseToastQueueDemo />
        </DemoCard>
      </Section>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, marginTop: 32, color: '#666' }}>App Hooks</h2>

      <Section title="useControllableState">
        <DemoCard label="Controlled/uncontrolled state">
          <UseControllableStateDemo />
        </DemoCard>
      </Section>

      <Section title="useReducedMotion">
        <DemoCard label="Prefers-reduced-motion detection">
          <UseReducedMotionDemo />
        </DemoCard>
      </Section>
    </div>
  )
}

function UseColorModeDemo() {
  const { colorMode, isDark, toggleColorMode } = useColorMode()
  return (
    <DemoRow>
      <span>Mode: <strong>{colorMode}</strong></span>
      <span>isDark: <strong>{String(isDark)}</strong></span>
      <Button variant="outline" size="sm" onClick={toggleColorMode}>Toggle</Button>
    </DemoRow>
  )
}

function UseConditionsDemo() {
  const conditions = useConditions()
  return (
    <div style={{ fontSize: 14 }}>
      <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, overflow: 'auto' }}>
        {JSON.stringify(conditions, null, 2)}
      </pre>
    </div>
  )
}

function UseMediaQueryDemo() {
  const isWide = useMediaQuery('(min-width: 768px)', false, true, false)
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', false, true, false)
  return (
    <DemoRow>
      <span>≥768px: <strong>{String(isWide)}</strong></span>
      <span>prefers-dark: <strong>{String(prefersDark)}</strong></span>
    </DemoRow>
  )
}

function UseRTLDemo() {
  const { isRTL } = useRTL()
  return <span>isRTL: <strong>{String(isRTL)}</strong></span>
}

function UseTransitionDemo() {
  const [visible, setVisible] = useState(true)
  const { styles, isVisible } = useTransition(visible, { duration: 300 })
  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
      {isVisible && (
        <div style={{ ...styles, marginTop: 12, padding: 16, background: '#f0f0ff', borderRadius: 8 }}>
          Animated content
        </div>
      )}
    </div>
  )
}

function UseDisclosureDemo() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  return (
    <div>
      <DemoRow>
        <Button size="sm" onClick={onOpen}>Open</Button>
        <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
        <Button size="sm" variant="outline" onClick={onToggle}>Toggle</Button>
        <span>isOpen: <strong>{String(isOpen)}</strong></span>
      </DemoRow>
      {isOpen && (
        <div style={{ marginTop: 12, padding: 16, background: '#f0fff0', borderRadius: 8 }}>
          Disclosed content
        </div>
      )}
    </div>
  )
}

function UseListStateDemo() {
  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']
  const { selectedKeys, toggleKey, isSelected, selectAll, clearSelection } = useListState(items)
  return (
    <div>
      <DemoRow>
        <Button size="sm" variant="outline" onClick={selectAll}>Select All</Button>
        <Button size="sm" variant="outline" onClick={clearSelection}>Clear</Button>
        <span>Selected: {selectedKeys.size}</span>
      </DemoRow>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map(item => (
          <label key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={isSelected(item)} onChange={() => toggleKey(item)} />
            {item}
          </label>
        ))}
      </div>
    </div>
  )
}

function UseSearchDemo() {
  const items = ['React', 'React Native', 'Next.js', 'Vite', 'TypeScript', 'Vanilla Extract']
  const { query, setQuery, results } = useSearch(items, { keys: [] })
  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search frameworks..."
        style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', width: 300 }}
      />
      <div style={{ marginTop: 8, fontSize: 14 }}>
        {(results.length > 0 ? results : items).map(item => (
          <div key={String(item)} style={{ padding: '4px 0' }}>{String(item)}</div>
        ))}
      </div>
    </div>
  )
}

function UseTabsDemo() {
  const tabs = ['Overview', 'Features', 'Pricing']
  const { activeTab, setActiveTab, isActive } = useTabs(tabs)
  return (
    <div>
      <DemoRow>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              background: isActive(tab) ? '#0066ff' : '#eee',
              color: isActive(tab) ? '#fff' : '#333',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </DemoRow>
      <div style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>
        Active: <strong>{activeTab}</strong>
      </div>
    </div>
  )
}

function UseToastQueueDemo() {
  const { toasts, addToast, removeToast } = useToastQueue()
  return (
    <div>
      <Button size="sm" onClick={() => addToast({ title: `Toast ${Date.now() % 1000}`, duration: 3000 })}>
        Add Toast
      </Button>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
            <span>{toast.title}</span>
            <button onClick={() => removeToast(toast.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function UseControllableStateDemo() {
  const [value, setValue] = useControllableState({ defaultValue: 'Hello' })
  return (
    <DemoRow>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd' }}
      />
      <span>Value: <strong>{value}</strong></span>
    </DemoRow>
  )
}

function UseReducedMotionDemo() {
  const prefersReduced = useReducedMotion()
  return <span>prefers-reduced-motion: <strong>{String(prefersReduced)}</strong></span>
}
