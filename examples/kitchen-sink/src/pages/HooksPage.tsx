import React, { useRef, useState } from 'react'
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
          <View
            tag="input"
            value={controlled}
            onChange={(e: any) => setControlled(e.nativeEvent?.text ?? e.target?.value ?? '')}
            fontFamily="$body"
            fontSize="$4"
            padding="$2"
            borderWidth={1}
            borderColor="$borderColor"
            borderRadius="$3"
            color="$color"
            backgroundColor="$background"
          />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
            Current value: "{controlled}"
          </Text>
        </YStack>
      </DemoCard>
      <DemoCard label="Uncontrolled (internal state with onChange callback)">
        <YStack gap="$2">
          <View
            tag="input"
            value={uncontrolledValue}
            onChange={(e: any) => setUncontrolledValue(e.nativeEvent?.text ?? e.target?.value ?? '')}
            fontFamily="$body"
            fontSize="$4"
            padding="$2"
            borderWidth={1}
            borderColor="$borderColor"
            borderRadius="$3"
            color="$color"
            backgroundColor="$background"
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
        <View
          tag="button"
          onPress={() => setActive(!active)}
          backgroundColor={active ? '$color10' : '$color4'}
          paddingHorizontal="$4"
          paddingVertical="$2"
          borderRadius="$3"
          cursor="pointer"
          alignSelf="flex-start"
        >
          <Text fontFamily="$body" fontSize="$3" color={active ? '$color1' : '$color'}>
            {active ? 'Deactivate Trap' : 'Activate Trap'}
          </Text>
        </View>
        <View
          ref={trapRef}
          borderWidth={2}
          borderColor={active ? '$color10' : '$borderColor'}
          borderRadius="$4"
          padding="$4"
          gap="$3"
          borderStyle={active ? 'solid' : 'dashed'}
        >
          <View
            tag="button"
            backgroundColor="$color3"
            padding="$2"
            borderRadius="$2"
            cursor="pointer"
          >
            <Text fontFamily="$body" fontSize="$3">Focusable 1</Text>
          </View>
          <View
            tag="button"
            backgroundColor="$color3"
            padding="$2"
            borderRadius="$2"
            cursor="pointer"
          >
            <Text fontFamily="$body" fontSize="$3">Focusable 2</Text>
          </View>
          <View
            tag="button"
            backgroundColor="$color3"
            padding="$2"
            borderRadius="$2"
            cursor="pointer"
          >
            <Text fontFamily="$body" fontSize="$3">Focusable 3</Text>
          </View>
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
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  const handleKeyDown = useKeyboardNavigation({
    itemCount: items.length,
    activeIndex,
    onActiveIndexChange: setActiveIndex,
    orientation: 'vertical',
    loop: true,
    onSelect: (index) => alert(`Selected: ${items[index]}`),
  })

  return (
    <DemoCard label="Arrow key navigation — use Up/Down arrows, Enter to select">
      <View onKeyDown={handleKeyDown} tag="div" role="listbox" aria-label="Fruit list">
        <YStack gap="$1">
          {items.map((item, i) => (
            <View
              key={item}
              ref={(el: HTMLElement | null) => { itemRefs.current[i] = el }}
              tag="div"
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
              outlineWidth={0}
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
