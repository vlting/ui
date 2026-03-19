import { Text as RNText, ScrollView, StyleSheet, View } from 'react-native'

import {
  AspectRatio,
  Badge,
  Box,
  Column,
  Divider,
  Grid,
  Heading,
  Image,
  Kbd,
  Pressable,
  Row,
  Separator,
  Skeleton,
  Spacer,
  Spinner,
  SubHeading,
  Text,
  VisuallyHidden,
} from '../../../../packages/stl-native/src/primitives'

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
          <Box
            stl={{ width: 80, height: 80, backgroundColor: '$primary4', borderRadius: 8 }}
          />
          <Box
            stl={{ width: 80, height: 80, backgroundColor: '$primary6', borderRadius: 8 }}
          />
          <Box
            stl={{ width: 80, height: 80, backgroundColor: '$primary8', borderRadius: 8 }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Row</RNText>
        <Row stl={{ gap: 8 }}>
          <Box
            stl={{ width: 50, height: 50, backgroundColor: '$forest4', borderRadius: 4 }}
          />
          <Box
            stl={{ width: 50, height: 50, backgroundColor: '$forest5', borderRadius: 4 }}
          />
          <Box
            stl={{ width: 50, height: 50, backgroundColor: '$forest6', borderRadius: 4 }}
          />
          <Box
            stl={{ width: 50, height: 50, backgroundColor: '$forest7', borderRadius: 4 }}
          />
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Column</RNText>
        <Column stl={{ gap: 8 }}>
          <Box
            stl={{ width: 200, height: 32, backgroundColor: '$aqua4', borderRadius: 4 }}
          />
          <Box
            stl={{ width: 200, height: 32, backgroundColor: '$aqua5', borderRadius: 4 }}
          />
          <Box
            stl={{ width: 200, height: 32, backgroundColor: '$aqua6', borderRadius: 4 }}
          />
        </Column>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Text & Heading</RNText>
        <Heading>Heading Component</Heading>
        <SubHeading>SubHeading Component</SubHeading>
        <Text>Regular Text component for body content.</Text>
        <Text stl={{ fontWeight: '700', color: '$primary8' }}>Bold colored text</Text>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Grid</RNText>
        <Grid stl={{ gap: 8 }} columns={3}>
          {Array.from({ length: 6 }, (_, i) => (
            <Box
              key={i}
              stl={{ height: 50, backgroundColor: '$plum4', borderRadius: 4 }}
            />
          ))}
        </Grid>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Pressable</RNText>
        <Pressable
          onPress={() => {}}
          stl={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: '$primary6',
            borderRadius: 8,
            alignSelf: 'flex-start',
          }}
        >
          <Text stl={{ color: '#fff', fontWeight: '600' }}>Press Me</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Image</RNText>
        <Image
          source={{ uri: 'https://picsum.photos/200/150' }}
          stl={{ width: 200, height: 150, borderRadius: 8 }}
        />
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>AspectRatio</RNText>
        <AspectRatio ratio={16 / 9} style={{ maxWidth: 240 }}>
          <Box stl={{ flex: 1, backgroundColor: '$primary4', borderRadius: 8 }} />
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
        <Row stl={{ height: 40, backgroundColor: '$color3', borderRadius: 4 }}>
          <Box
            stl={{ width: 40, height: 40, backgroundColor: '$primary6', borderRadius: 4 }}
          />
          <Spacer />
          <Box
            stl={{ width: 40, height: 40, backgroundColor: '$primary6', borderRadius: 4 }}
          />
        </Row>
        <RNText style={styles.label}>flex: 1 spacer between two boxes</RNText>
        <Row stl={{ gap: 4, marginTop: 8 }}>
          <Box
            stl={{ width: 20, height: 20, backgroundColor: '$aqua5', borderRadius: 2 }}
          />
          <Spacer size="xs" />
          <Box
            stl={{ width: 20, height: 20, backgroundColor: '$aqua5', borderRadius: 2 }}
          />
          <Spacer size="md" />
          <Box
            stl={{ width: 20, height: 20, backgroundColor: '$aqua5', borderRadius: 2 }}
          />
          <Spacer size="xl" />
          <Box
            stl={{ width: 20, height: 20, backgroundColor: '$aqua5', borderRadius: 2 }}
          />
        </Row>
        <RNText style={styles.label}>xs → md → xl fixed spacers</RNText>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Skeleton</RNText>
        <Column stl={{ gap: 8 }}>
          <Skeleton width="100%" height={20} />
          <Skeleton width="75%" height={20} />
          <Skeleton width="50%" height={20} />
          <Row stl={{ gap: 12, marginTop: 4 }}>
            <Skeleton circle width={48} height={48} />
            <Column stl={{ flex: 1, gap: 8 }}>
              <Skeleton width="60%" height={14} />
              <Skeleton width="40%" height={14} />
            </Column>
          </Row>
        </Column>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Spinner</RNText>
        <Row stl={{ gap: 24 }}>
          <Column stl={{ alignItems: 'center', gap: 4 }}>
            <Spinner size="small" />
            <RNText style={styles.label}>Small</RNText>
          </Column>
          <Column stl={{ alignItems: 'center', gap: 4 }}>
            <Spinner size="large" />
            <RNText style={styles.label}>Large</RNText>
          </Column>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Kbd</RNText>
        <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
          <Kbd>⌘</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
          <Text stl={{ alignSelf: 'center' }}> = Command Palette</Text>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Badge</RNText>
        <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>VisuallyHidden</RNText>
        <Text>The text below is visually hidden but accessible to screen readers:</Text>
        <VisuallyHidden>
          <Text>This text is only visible to assistive technology</Text>
        </VisuallyHidden>
        <Text stl={{ fontStyle: 'italic', color: '$color8' }}>
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
