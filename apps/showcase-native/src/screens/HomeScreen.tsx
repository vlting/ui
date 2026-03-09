import { ScrollView, View, Text, StyleSheet } from 'react-native'

export function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>@vlting/stl Showcase</Text>
      <Text style={styles.subtitle}>
        Native kitchen-sink demo of the STL design system for React Native.
      </Text>

      <View style={styles.grid}>
        {[
          { label: 'Styling', desc: 'Token scales, colors, themes' },
          { label: 'Primitives', desc: 'Box, Row, Column, Text, Grid' },
          { label: 'Hooks', desc: 'Native hooks: colorMode, conditions, layout' },
        ].map(item => (
          <View key={item.label} style={styles.card}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Platform Coverage</Text>
        <Text style={styles.infoText}>
          This app showcases stl-native primitives, native hooks, and the StlProvider.
          Web-only components (DOM-based) are available in the showcase-web app.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24, lineHeight: 22 },
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
  infoBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f0f0ff',
    borderRadius: 8,
  },
  infoTitle: { fontWeight: '600', fontSize: 14, marginBottom: 4 },
  infoText: { fontSize: 13, color: '#555', lineHeight: 20 },
})
