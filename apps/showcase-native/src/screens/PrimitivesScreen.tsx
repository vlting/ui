import { ScrollView, View, Text as RNText, StyleSheet } from 'react-native'

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
  AspectRatio,
  Divider,
  Separator,
  Spacer,
  Skeleton,
  Spinner,
  Kbd,
  Badge,
  VisuallyHidden,
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

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>AspectRatio</RNText>
        <AspectRatio ratio={16 / 9} style={{ maxWidth: 240 }}>
          <Box css={{ flex: 1, backgroundColor: '$primary4', borderRadius: 8 }} />
        </AspectRatio>
        <RNText style={styles.label}>16:9 ratio</RNText>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Divider & Separator</RNText>
        <Text>Content above divider</Text>
        <Divider orientation="horizontal" />
        <Text>Content below divider</Text>
        <Spacer size="md" />
        <Text>Content above separator</Text>
        <Separator orientation="horizontal" />
        <Text>Content below separator (has ARIA role)</Text>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Spacer</RNText>
        <Row css={{ height: 40, backgroundColor: '$color3', borderRadius: 4 }}>
          <Box css={{ width: 40, height: 40, backgroundColor: '$primary6', borderRadius: 4 }} />
          <Spacer />
          <Box css={{ width: 40, height: 40, backgroundColor: '$primary6', borderRadius: 4 }} />
        </Row>
        <RNText style={styles.label}>flex: 1 spacer between two boxes</RNText>
        <Row css={{ gap: 4, marginTop: 8 }}>
          <Box css={{ width: 20, height: 20, backgroundColor: '$blue5', borderRadius: 2 }} />
          <Spacer size="xs" />
          <Box css={{ width: 20, height: 20, backgroundColor: '$blue5', borderRadius: 2 }} />
          <Spacer size="md" />
          <Box css={{ width: 20, height: 20, backgroundColor: '$blue5', borderRadius: 2 }} />
          <Spacer size="xl" />
          <Box css={{ width: 20, height: 20, backgroundColor: '$blue5', borderRadius: 2 }} />
        </Row>
        <RNText style={styles.label}>xs → md → xl fixed spacers</RNText>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Skeleton</RNText>
        <Column css={{ gap: 8 }}>
          <Skeleton width="100%" height={20} />
          <Skeleton width="75%" height={20} />
          <Skeleton width="50%" height={20} />
          <Row css={{ gap: 12, marginTop: 4 }}>
            <Skeleton circle width={48} height={48} />
            <Column css={{ flex: 1, gap: 8 }}>
              <Skeleton width="60%" height={14} />
              <Skeleton width="40%" height={14} />
            </Column>
          </Row>
        </Column>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Spinner</RNText>
        <Row css={{ gap: 24 }}>
          <Column css={{ alignItems: 'center', gap: 4 }}>
            <Spinner size="small" />
            <RNText style={styles.label}>Small</RNText>
          </Column>
          <Column css={{ alignItems: 'center', gap: 4 }}>
            <Spinner size="large" />
            <RNText style={styles.label}>Large</RNText>
          </Column>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Kbd</RNText>
        <Row css={{ gap: 8, flexWrap: 'wrap' }}>
          <Kbd>⌘</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
          <Text css={{ alignSelf: 'center' }}> = Command Palette</Text>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Badge</RNText>
        <Row css={{ gap: 8, flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>VisuallyHidden</RNText>
        <Text>
          The text below is visually hidden but accessible to screen readers:
        </Text>
        <VisuallyHidden>
          <Text>This text is only visible to assistive technology</Text>
        </VisuallyHidden>
        <Text css={{ fontStyle: 'italic', color: '$color8' }}>
          (Enable a screen reader to hear the hidden content)
        </Text>
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
  label: { fontSize: 12, color: '#888', marginTop: 4 },
})
