import React, { useEffect, useRef, useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import { useControllableState, useFocusTrap, useKeyboardNavigation } from '@vlting/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap="$3" paddingVertical="$4">
      <Heading fontFamily="$heading" fontSize="$6" fontWeight="$4">
        {title}
      </Heading>
      <Separator />
      <YStack gap="$3" paddingTop="$2">
        {children}
      </YStack>
    </YStack>
  )
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <YStack
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      gap="$3"
    >
      <Text fontFamily="$body" fontSize="$2" fontWeight="$3" color="$colorSubtitle">
        {label}
      </Text>
      {children}
    </YStack>
  )
}

function ControllableStateDemo() {
  const [controlled, setControlled] = useState('Hello')
  const [uncontrolledValue, setUncontrolledValue] = useControllableState({
    defaultProp: 'Default value',
    onChange: (val: string) => console.log('Uncontrolled changed:', val),
  })

  return (
    <YStack gap="$4">
      <DemoCard label="Controlled (value managed externally)">
        <YStack gap="$2">
          <input
            type="text"
            value={controlled}
            onChange={(e) => setControlled(e.target.value)}
            style={{
              fontFamily: 'inherit',
              fontSize: 16,
              padding: 8,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'var(--borderColor)',
              borderRadius: 8,
              color: 'inherit',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
          />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
            Current value: "{controlled}"
          </Text>
        </YStack>
      </DemoCard>
      <DemoCard label="Uncontrolled (internal state with onChange callback)">
        <YStack gap="$2">
          <input
            type="text"
            value={uncontrolledValue}
            onChange={(e) => setUncontrolledValue(e.target.value)}
            style={{
              fontFamily: 'inherit',
              fontSize: 16,
              padding: 8,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'var(--borderColor)',
              borderRadius: 8,
              color: 'inherit',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
          />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
            Current value: "{uncontrolledValue}" (check console for onChange)
          </Text>
        </YStack>
      </DemoCard>
    </YStack>
  )
}

function FocusTrapDemo() {
  const [active, setActive] = useState(false)
  const trapRef = useFocusTrap(active)

  return (
    <DemoCard label="Focus trap — Tab key cycles within the box when active">
      <YStack gap="$3">
        <button
          type="button"
          onClick={() => setActive(!active)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', alignSelf: 'flex-start' }}
        >
          <View
            backgroundColor={active ? '$color10' : '$color4'}
            paddingHorizontal="$4"
            paddingVertical="$2"
            borderRadius="$3"
          >
            <Text fontFamily="$body" fontSize="$3" color={active ? '$color1' : '$color'}>
              {active ? 'Deactivate Trap' : 'Activate Trap'}
            </Text>
          </View>
        </button>
        <View
          ref={trapRef}
          borderWidth={2}
          borderColor={active ? '$color10' : '$borderColor'}
          borderRadius="$4"
          padding="$4"
          gap="$3"
          borderStyle={active ? 'solid' : 'dashed'}
        >
          <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <View backgroundColor="$color3" padding="$2" borderRadius="$2">
              <Text fontFamily="$body" fontSize="$3">Focusable 1</Text>
            </View>
          </button>
          <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <View backgroundColor="$color3" padding="$2" borderRadius="$2">
              <Text fontFamily="$body" fontSize="$3">Focusable 2</Text>
            </View>
          </button>
          <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <View backgroundColor="$color3" padding="$2" borderRadius="$2">
              <Text fontFamily="$body" fontSize="$3">Focusable 3</Text>
            </View>
          </button>
        </View>
        <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
          {active ? 'Trap is active — Tab and Shift+Tab cycle within the box.' : 'Trap is inactive — focus moves normally.'}
        </Text>
      </YStack>
    </DemoCard>
  )
}

function KeyboardNavDemo() {
  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasFocus, setHasFocus] = useState(false)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  const handleKeyDown = useKeyboardNavigation(
    items.length,
    activeIndex,
    setActiveIndex,
    {
      orientation: 'vertical',
      loop: true,
      onSelect: (index) => alert(`Selected: ${items[index]}`),
    },
  )

  useEffect(() => {
    if (hasFocus) {
      itemRefs.current[activeIndex]?.focus()
    }
  }, [activeIndex, hasFocus])

  return (
    <DemoCard label="Arrow key navigation — click an item then use Up/Down arrows, Enter to select">
      <View
        onKeyDown={handleKeyDown}
        onFocus={() => setHasFocus(true)}
        onBlur={(e: any) => {
          // Only blur if focus leaves the entire container
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setHasFocus(false)
          }
        }}
        role="listbox"
        aria-label="Fruit list"
      >
        <YStack gap="$1">
          {items.map((item, i) => (
            <View
              key={item}
              ref={(el: HTMLElement | null) => { itemRefs.current[i] = el }}
              role="option"
              aria-selected={i === activeIndex}
              tabIndex={i === activeIndex ? 0 : -1}
              backgroundColor={i === activeIndex ? '$color4' : 'transparent'}
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius="$2"
              cursor="pointer"
              hoverStyle={{ backgroundColor: '$color3' }}
              onPress={() => setActiveIndex(i)}
              outlineStyle={hasFocus && i === activeIndex ? 'solid' : 'none'}
              outlineWidth={hasFocus && i === activeIndex ? 2 : 0}
              outlineColor="$color10"
            >
              <Text fontFamily="$body" fontSize="$3" fontWeight={i === activeIndex ? '$3' : '$2'}>
                {item}
              </Text>
            </View>
          ))}
        </YStack>
      </View>
      <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
        Active: {items[activeIndex]} (press Enter to "select")
      </Text>
    </DemoCard>
  )
}

export function HooksPage() {
  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">
        Hooks
      </Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Reusable behavioral hooks for building custom components.
      </Text>

      <Section title="useControllableState">
        <ControllableStateDemo />
      </Section>

      <Section title="useFocusTrap">
        <FocusTrapDemo />
      </Section>

      <Section title="useKeyboardNavigation">
        <KeyboardNavDemo />
      </Section>
    </YStack>
  )
}
