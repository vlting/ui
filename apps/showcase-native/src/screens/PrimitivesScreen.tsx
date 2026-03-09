import { ScrollView, View, Text as RNText, StyleSheet } from 'react-native'

// Import stl-native primitives
import {
  Box,
  Row,
  Column,
  Text,
  Heading,
  SubHeading,
  Image,
  Pressable,
  Grid,
} from '../../../packages/stl-native/src/primitives'

export function PrimitivesScreen() {
  return (
    <ScrollView style={styles.container}>
      <RNText style={styles.title}>Primitives</RNText>
      <RNText style={styles.subtitle}>
        STL Native primitives — cross-platform styled components.
      </RNText>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Box</RNText>
        <View style={styles.demo}>
          <Box css={{ width: 80, height: 80, backgroundColor: '$primary4', borderRadius: 8 }} />
          <Box css={{ width: 80, height: 80, backgroundColor: '$primary6', borderRadius: 8 }} />
          <Box css={{ width: 80, height: 80, backgroundColor: '$primary8', borderRadius: 8 }} />
        </View>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Row</RNText>
        <Row css={{ gap: 8 }}>
          <Box css={{ width: 50, height: 50, backgroundColor: '$green4', borderRadius: 4 }} />
          <Box css={{ width: 50, height: 50, backgroundColor: '$green5', borderRadius: 4 }} />
          <Box css={{ width: 50, height: 50, backgroundColor: '$green6', borderRadius: 4 }} />
          <Box css={{ width: 50, height: 50, backgroundColor: '$green7', borderRadius: 4 }} />
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Column</RNText>
        <Column css={{ gap: 8 }}>
          <Box css={{ width: 200, height: 32, backgroundColor: '$blue4', borderRadius: 4 }} />
          <Box css={{ width: 200, height: 32, backgroundColor: '$blue5', borderRadius: 4 }} />
          <Box css={{ width: 200, height: 32, backgroundColor: '$blue6', borderRadius: 4 }} />
        </Column>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Text & Heading</RNText>
        <Heading>Heading Component</Heading>
        <SubHeading>SubHeading Component</SubHeading>
        <Text>Regular Text component for body content.</Text>
        <Text css={{ fontWeight: '700', color: '$primary8' }}>Bold colored text</Text>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Grid</RNText>
        <Grid css={{ gap: 8 }} columns={3}>
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={i} css={{ height: 50, backgroundColor: '$purple4', borderRadius: 4 }} />
          ))}
        </Grid>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Pressable</RNText>
        <Pressable
          onPress={() => {}}
          css={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: '$primary6',
            borderRadius: 8,
            alignSelf: 'flex-start',
          }}
        >
          <Text css={{ color: '#fff', fontWeight: '600' }}>Press Me</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Image</RNText>
        <Image
          source={{ uri: 'https://picsum.photos/200/150' }}
          css={{ width: 200, height: 150, borderRadius: 8 }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  demo: { flexDirection: 'row', gap: 12 },
})
