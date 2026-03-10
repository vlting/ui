import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
// stl-headless hooks
import {
  useDisclosure,
  useListState,
  useTabs,
  useToastQueue,
} from '../../../../packages/stl-headless/src'
// stl-native hooks
import { useColorMode } from '../../../../packages/stl-native/src/hooks/useColorMode'
import { useConditions } from '../../../../packages/stl-native/src/hooks/useConditions'
import { useMediaQuery } from '../../../../packages/stl-native/src/hooks/useMediaQuery'
import { useRTL } from '../../../../packages/stl-native/src/hooks/useRTL'
import { useTokens } from '../../../../packages/stl-native/src/hooks/useTokens'

export function HooksScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hooks</Text>
      <Text style={styles.subtitle}>Native and headless hooks.</Text>

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
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

function UseColorModeDemo() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <View style={styles.row}>
      <Text>Mode: {colorMode}</Text>
      <Pressable onPress={toggleColorMode} style={styles.button}>
        <Text style={styles.buttonText}>Toggle</Text>
      </Pressable>
    </View>
  )
}

function UseConditionsDemo() {
  const conditions = useConditions()
  return (
    <View style={styles.codeBox}>
      <Text style={styles.code}>{JSON.stringify(conditions, null, 2)}</Text>
    </View>
  )
}

function UseMediaQueryDemo() {
  const isTablet = useMediaQuery('(min-width: 768px)', false, true)
  return <Text>isTablet (≥768px): {String(isTablet)}</Text>
}

function UseTokensDemo() {
  const { tokenValue } = useTokens()
  return (
    <View style={styles.codeBox}>
      <Text style={styles.code}>
        {tokenValue ? 'Theme tokens resolved' : 'No tokens available'}
      </Text>
    </View>
  )
}

function UseRTLDemo() {
  const isRTL = useRTL()
  return <Text>isRTL: {String(isRTL)}</Text>
}

function UseDisclosureDemo() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  return (
    <View>
      <View style={styles.row}>
        <Pressable onPress={onOpen} style={styles.button}>
          <Text style={styles.buttonText}>Open</Text>
        </Pressable>
        <Pressable onPress={onClose} style={[styles.button, { backgroundColor: '#888' }]}>
          <Text style={styles.buttonText}>Close</Text>
        </Pressable>
        <Text>isOpen: {String(isOpen)}</Text>
      </View>
      {isOpen && (
        <View style={styles.disclosedBox}>
          <Text>Disclosed content</Text>
        </View>
      )}
    </View>
  )
}

function UseListStateDemo() {
  const items = ['Apple', 'Banana', 'Cherry', 'Date']
  const { highlightIndex, highlightedItem, setHighlightIndex } = useListState({ items })
  return (
    <View>
      <Text>
        Highlighted: {highlightedItem ?? 'none'} (index {highlightIndex})
      </Text>
      {items.map((item, i) => (
        <Pressable
          key={item}
          onPress={() => setHighlightIndex(i)}
          style={styles.listItem}
        >
          <Text>
            {highlightIndex === i ? '▸' : '  '} {item}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

function UseTabsDemo() {
  const tabs = ['Overview', 'Features', 'Pricing']
  const { activeValue, setActiveValue } = useTabs({ defaultValue: 'Overview' })
  return (
    <View>
      <View style={styles.row}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveValue(tab)}
            style={[styles.tabButton, activeValue === tab && styles.tabActive]}
          >
            <Text style={activeValue === tab ? styles.tabTextActive : styles.tabText}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.tabContent}>
        <Text>Active: {activeValue}</Text>
      </View>
    </View>
  )
}

function UseToastQueueDemo() {
  const { toasts, add, remove } = useToastQueue()
  return (
    <View>
      <Pressable
        onPress={() => add({ message: `Toast ${Date.now() % 1000}`, duration: 3000 })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add Toast</Text>
      </Pressable>
      {toasts.map((toast) => (
        <View key={toast.id} style={styles.toastItem}>
          <Text>{toast.message}</Text>
          <Pressable onPress={() => remove(toast.id)}>
            <Text style={{ fontSize: 18 }}>×</Text>
          </Pressable>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#0066ff',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  codeBox: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8 },
  code: { fontSize: 11, fontFamily: 'monospace' },
  disclosedBox: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f0fff0',
    borderRadius: 8,
  },
  listItem: { paddingVertical: 6 },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  tabActive: { backgroundColor: '#0066ff' },
  tabText: { color: '#333', fontSize: 13 },
  tabTextActive: { color: '#fff', fontSize: 13, fontWeight: '600' },
  tabContent: { marginTop: 8, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 6 },
  toastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginTop: 4,
  },
})
