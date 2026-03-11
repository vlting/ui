import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useColorMode } from '../../../../packages/stl-native/src/hooks/useColorMode'

const palettes = ['primary', 'red', 'green', 'blue', 'orange', 'purple']
const steps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

export function StylingScreen() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Styling & Tokens</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Mode</Text>
        <View style={styles.row}>
          <Text>Current: {colorMode}</Text>
          <Pressable onPress={toggleColorMode} style={styles.button}>
            <Text style={styles.buttonText}>Toggle</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Palettes</Text>
        <Text style={styles.note}>
          Token references ($primary1-12, $red1-12, etc.) resolve at runtime via the style
          resolver.
        </Text>
        {palettes.map((palette) => (
          <View key={palette} style={styles.paletteRow}>
            <Text style={styles.paletteLabel}>{palette}</Text>
            <View style={styles.swatchRow}>
              {steps.slice(0, 6).map((step) => (
                <View
                  key={step}
                  style={[
                    styles.swatch,
                    {
                      backgroundColor: `hsl(${palette === 'red' ? 0 : palette === 'green' ? 120 : palette === 'blue' ? 220 : palette === 'orange' ? 30 : palette === 'purple' ? 280 : 210}, ${40 + Number(step) * 5}%, ${95 - Number(step) * 7}%)`,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Space Scale</Text>
        {['1', '2', '3', '4', '5', '6', '7', '8'].map((step) => (
          <View key={step} style={styles.spaceItem}>
            <Text style={styles.spaceLabel}>${step}</Text>
            <View style={[styles.spaceBar, { width: Number(step) * 20 }]} />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Radius</Text>
        <View style={styles.row}>
          {['0', '4', '8', '12', '16', '9999'].map((r) => (
            <View key={r} style={[styles.radiusBox, { borderRadius: Number(r) }]}>
              <Text style={styles.radiusLabel}>{r}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Sizes</Text>
        {[12, 14, 16, 18, 20, 24, 32].map((size) => (
          <Text key={size} style={{ fontSize: size, marginBottom: 8 }}>
            ${size} — The quick brown fox
          </Text>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  note: { fontSize: 13, color: '#888', marginBottom: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#0066ff',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  paletteRow: { marginBottom: 12 },
  paletteLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  swatchRow: { flexDirection: 'row', gap: 4 },
  swatch: { width: 40, height: 40, borderRadius: 4 },
  spaceItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  spaceLabel: { width: 30, fontSize: 12 },
  spaceBar: { height: 20, backgroundColor: '#0066ff', borderRadius: 4 },
  radiusBox: {
    width: 48,
    height: 48,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiusLabel: { fontSize: 10 },
})
