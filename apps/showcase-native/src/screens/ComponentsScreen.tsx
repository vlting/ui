import { useNavigation } from '@react-navigation/native'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const SCREENS = [
  { name: 'Display', desc: 'Alert, Avatar, Badge, Card, Empty, Item, Progress, Separator' },
  { name: 'Forms', desc: 'Button, Input, Textarea, Checkbox, Switch, RadioGroup, Toggle, Slider, Field' },
  { name: 'Disclosure', desc: 'Accordion, Collapsible, Dialog, Sheet, Drawer, Toast' },
  { name: 'Overlays', desc: 'Popover, Tooltip, HoverCard, AlertDialog' },
] as const

export function ComponentsScreen() {
  const navigation = useNavigation<any>()

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Components</Text>
      <Text style={styles.subtitle}>
        Native @vlting/ui components organized by category.
      </Text>

      <View style={styles.grid}>
        {SCREENS.map((s) => (
          <Pressable
            key={s.name}
            style={styles.card}
            onPress={() => navigation.navigate(s.name)}
          >
            <Text style={styles.cardTitle}>{s.name}</Text>
            <Text style={styles.cardDesc}>{s.desc}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  grid: { gap: 12 },
  card: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  cardTitle: { fontWeight: '600', fontSize: 16, marginBottom: 4 },
  cardDesc: { fontSize: 13, color: '#888' },
})
