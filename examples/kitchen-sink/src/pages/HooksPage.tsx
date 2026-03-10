import {
  Box,
  Heading,
  Input,
  Text,
  VStack,
  useControllableState,
  useFocusTrap,
  useKeyboardNavigation,
} from '@vlting/ui'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { DemoCard, Section } from '../components/Section'

const BUTTON_RESET: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
}

function ControllableStateDemo() {
  const [controlled, setControlled] = useState('Hello')
  const [uncontrolledValue, setUncontrolledValue] = useControllableState({
    defaultProp: 'Default value',
    onChange: (val: string) => console.log('Uncontrolled changed:', val),
  })

  return (
    <VStack style={{ gap: 16 }}>
      <DemoCard label="Controlled (value managed externally)">
        <VStack style={{ gap: 8 }}>
          <Input
            value={controlled}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setControlled(e.target.value)}
          />
          <Text size="xs" tone="muted">Current value: "{controlled}"</Text>
        </VStack>
      </DemoCard>
      <DemoCard label="Uncontrolled (internal state with onChange callback)">
        <VStack style={{ gap: 8 }}>
          <Input
            value={uncontrolledValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUncontrolledValue(e.target.value)}
          />
          <Text size="xs" tone="muted">Current value: "{uncontrolledValue}" (check console for onChange)</Text>
        </VStack>
      </DemoCard>
    </VStack>
  )
}

function FocusTrapDemo() {
  const [active, setActive] = useState(false)
  const trapRef = useFocusTrap(active)

  return (
    <DemoCard label="Focus trap — Tab key cycles within the box when active">
      <VStack style={{ gap: 12 }}>
        <button
          type="button"
          onClick={() => setActive(!active)}
          style={{ ...BUTTON_RESET, alignSelf: 'flex-start' }}
        >
          <Box
            style={{
              backgroundColor: active ? 'var(--vlt-color-10)' : 'var(--vlt-color-4)',
              paddingInline: 16,
              paddingBlock: 8,
              borderRadius: 6,
            }}
          >
            <Text size="sm" style={{ color: active ? 'var(--vlt-color-1)' : 'var(--vlt-color-12)' }}>
              {active ? 'Deactivate Trap' : 'Activate Trap'}
            </Text>
          </Box>
        </button>
        <div
          ref={trapRef}
          style={{
            border: `2px ${active ? 'solid' : 'dashed'} ${active ? 'var(--vlt-color-10)' : 'var(--vlt-color-5)'}`,
            borderRadius: 8,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <button type="button" style={BUTTON_RESET}>
            <Box style={{ backgroundColor: 'var(--vlt-color-3)', padding: 8, borderRadius: 4 }}>
              <Text size="sm">Focusable 1</Text>
            </Box>
          </button>
          <button type="button" style={BUTTON_RESET}>
            <Box style={{ backgroundColor: 'var(--vlt-color-3)', padding: 8, borderRadius: 4 }}>
              <Text size="sm">Focusable 2</Text>
            </Box>
          </button>
          <button type="button" style={BUTTON_RESET}>
            <Box style={{ backgroundColor: 'var(--vlt-color-3)', padding: 8, borderRadius: 4 }}>
              <Text size="sm">Focusable 3</Text>
            </Box>
          </button>
        </div>
        <Text size="xs" tone="muted">
          {active
            ? 'Trap is active — Tab and Shift+Tab cycle within the box.'
            : 'Trap is inactive — focus moves normally.'}
        </Text>
      </VStack>
    </DemoCard>
  )
}

function KeyboardNavDemo() {
  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasFocus, setHasFocus] = useState(false)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  const handleKeyDown = useKeyboardNavigation(items.length, activeIndex, setActiveIndex, {
    orientation: 'vertical',
    loop: true,
    onSelect: (index) => alert(`Selected: ${items[index]}`),
  })

  useEffect(() => {
    if (hasFocus) {
      itemRefs.current[activeIndex]?.focus()
    }
  }, [activeIndex, hasFocus])

  return (
    <DemoCard label="Arrow key navigation — click an item then use Up/Down arrows, Enter to select">
      <div
        onKeyDown={handleKeyDown}
        onFocus={() => setHasFocus(true)}
        onBlur={(e: any) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setHasFocus(false)
          }
        }}
        role="listbox"
        aria-label="Fruit list"
      >
        <VStack style={{ gap: 4 }}>
          {items.map((item, i) => (
            <div
              key={item}
              ref={(el: HTMLElement | null) => { itemRefs.current[i] = el }}
              role="option"
              aria-selected={i === activeIndex}
              tabIndex={i === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              style={{
                backgroundColor: i === activeIndex ? 'var(--vlt-color-4)' : 'transparent',
                paddingInline: 12,
                paddingBlock: 8,
                borderRadius: 4,
                cursor: 'pointer',
                outline: hasFocus && i === activeIndex ? '2px solid var(--vlt-color-10)' : 'none',
              }}
            >
              <Text size="sm" weight={i === activeIndex ? 'medium' : 'normal'}>
                {item}
              </Text>
            </div>
          ))}
        </VStack>
      </div>
      <Text size="xs" tone="muted">
        Active: {items[activeIndex]} (press Enter to "select")
      </Text>
    </DemoCard>
  )
}

export function HooksPage() {
  return (
    <VStack style={{ padding: 24, gap: 8, maxWidth: 900, marginInline: 'auto', width: '100%' }}>
      <Heading level={1}>Hooks</Heading>
      <Text tone="muted" style={{ marginBottom: 16 }}>
        Reusable behavioral hooks for building custom components.
      </Text>

      <Section title="useControllableState"><ControllableStateDemo /></Section>
      <Section title="useFocusTrap"><FocusTrapDemo /></Section>
      <Section title="useKeyboardNavigation"><KeyboardNavDemo /></Section>
    </VStack>
  )
}
