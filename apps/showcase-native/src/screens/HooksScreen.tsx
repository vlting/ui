// headless hooks
import {
  useDisclosure,
  useListState,
  useTabs,
  useToastQueue,
} from '../../../../packages/headless/src'
// stl-native hooks
import { useColorMode } from '../../../../packages/stl-native/src/hooks/useColorMode'
import { useConditions } from '../../../../packages/stl-native/src/hooks/useConditions'
import { useMediaQuery } from '../../../../packages/stl-native/src/hooks/useMediaQuery'
import { useRTL } from '../../../../packages/stl-native/src/hooks/useRTL'
import { useTokens } from '../../../../packages/stl-native/src/hooks/useTokens'
import { Box, Heading, Pressable, Row, ScrollView, Text } from '../../../../packages/stl-native/src/primitives'

export function HooksScreen() {
  return (
    <ScrollView stl={{ flex: 1, p: 20 }}>
      <Heading stl={{ fontSize: 24, fontWeight: '$700', mb: 4 }}>
        Hooks
      </Heading>
      <Text stl={{ fontSize: 14, color: '$neutral6', mb: 24 }}>Native and headless hooks.</Text>

      <Section title="useColorMode">
        <UseColorModeDemo />
      </Section>

      <Section title="useConditions">
        <UseConditionsDemo />
      </Section>

      <Section title="useMediaQuery">
        <UseMediaQueryDemo />
      </Section>

      <Section title="useTokens">
        <UseTokensDemo />
      </Section>

      <Section title="useRTL">
        <UseRTLDemo />
      </Section>

      <Section title="useDisclosure (headless)">
        <UseDisclosureDemo />
      </Section>

      <Section title="useListState (headless)">
        <UseListStateDemo />
      </Section>

      <Section title="useTabs (headless)">
        <UseTabsDemo />
      </Section>

      <Section title="useToastQueue (headless)">
        <UseToastQueueDemo />
      </Section>
    </ScrollView>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box stl={{ mb: 28 }}>
      <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 8 }}>{title}</Text>
      {children}
    </Box>
  )
}

function UseColorModeDemo() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Row stl={{ flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Text>Mode: {colorMode}</Text>
      <Pressable onPress={toggleColorMode} stl={{ px: 12, py: 6, radius: 6, bg: '$primary9' }}>
        <Text stl={{ color: '$panel', fontWeight: '$600', fontSize: 13 }}>Toggle</Text>
      </Pressable>
    </Row>
  )
}

function UseConditionsDemo() {
  const conditions = useConditions()
  return (
    <Box stl={{ bg: '$neutral2', p: 12, radius: 8 }}>
      <Text stl={{ fontSize: 11, fontFamily: 'monospace' }}>{JSON.stringify(conditions, null, 2)}</Text>
    </Box>
  )
}

function UseMediaQueryDemo() {
  const isTablet = useMediaQuery('(min-width: 768px)', false, true)
  return <Text>isTablet (>=768px): {String(isTablet)}</Text>
}

function UseTokensDemo() {
  const { tokenValue } = useTokens()
  return (
    <Box stl={{ bg: '$neutral2', p: 12, radius: 8 }}>
      <Text stl={{ fontSize: 11, fontFamily: 'monospace' }}>
        {tokenValue ? 'Theme tokens resolved' : 'No tokens available'}
      </Text>
    </Box>
  )
}

function UseRTLDemo() {
  const isRTL = useRTL()
  return <Text>isRTL: {String(isRTL)}</Text>
}

function UseDisclosureDemo() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  return (
    <Box>
      <Row stl={{ flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <Pressable onPress={onOpen} stl={{ px: 12, py: 6, radius: 6, bg: '$primary9' }}>
          <Text stl={{ color: '$panel', fontWeight: '$600', fontSize: 13 }}>Open</Text>
        </Pressable>
        <Pressable onPress={onClose} stl={{ px: 12, py: 6, radius: 6, bg: '$neutral6' }}>
          <Text stl={{ color: '$panel', fontWeight: '$600', fontSize: 13 }}>Close</Text>
        </Pressable>
        <Text>isOpen: {String(isOpen)}</Text>
      </Row>
      {isOpen && (
        <Box stl={{ mt: 8, p: 12, bg: '$grass2', radius: 8 }}>
          <Text>Disclosed content</Text>
        </Box>
      )}
    </Box>
  )
}

function UseListStateDemo() {
  const items = ['Apple', 'Banana', 'Cherry', 'Date']
  const { highlightIndex, highlightedItem, setHighlightIndex } = useListState({ items })
  return (
    <Box>
      <Text>
        Highlighted: {highlightedItem ?? 'none'} (index {highlightIndex})
      </Text>
      {items.map((item, i) => (
        <Pressable
          key={item}
          onPress={() => setHighlightIndex(i)}
          stl={{ py: 6 }}
        >
          <Text>
            {highlightIndex === i ? '>' : '  '} {item}
          </Text>
        </Pressable>
      ))}
    </Box>
  )
}

function UseTabsDemo() {
  const tabs = ['Overview', 'Features', 'Pricing']
  const { activeValue, setActiveValue } = useTabs({ defaultValue: 'Overview' })
  return (
    <Box>
      <Row stl={{ flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveValue(tab)}
            stl={{
              px: 12,
              py: 6,
              radius: 6,
              bg: activeValue === tab ? '$primary9' : '$neutral4',
            }}
          >
            <Text
              stl={{
                fontSize: 13,
                ...(activeValue === tab
                  ? { color: '$panel', fontWeight: '$600' }
                  : { color: '$neutral6' }),
              }}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </Row>
      <Box stl={{ mt: 8, p: 12, bg: '$neutral2', radius: 6 }}>
        <Text>Active: {activeValue}</Text>
      </Box>
    </Box>
  )
}

function UseToastQueueDemo() {
  const { toasts, add, remove } = useToastQueue()
  return (
    <Box>
      <Pressable
        onPress={() => add({ message: `Toast ${Date.now() % 1000}`, duration: 3000 })}
        stl={{ px: 12, py: 6, radius: 6, bg: '$primary9', alignSelf: 'flex-start' }}
      >
        <Text stl={{ color: '$panel', fontWeight: '$600', fontSize: 13 }}>Add Toast</Text>
      </Pressable>
      {toasts.map((toast) => (
        <Row key={toast.id} stl={{ justifyContent: 'space-between', alignItems: 'center', p: 8, bg: '$neutral2', radius: 4, mt: 4 }}>
          <Text>{toast.message}</Text>
          <Pressable onPress={() => remove(toast.id)}>
            <Text stl={{ fontSize: 18 }}>x</Text>
          </Pressable>
        </Row>
      ))}
    </Box>
  )
}
