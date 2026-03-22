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
  ScrollView,
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
    <ScrollView stl={{ flex: 1, p: 20 }}>
      <Heading stl={{ fontSize: 24, fontWeight: '$700', mb: 4 }}>
        Primitives
      </Heading>
      <Text stl={{ fontSize: 14, color: '$neutral6', mb: 24 }}>
        STL Native primitives — cross-platform styled components.
      </Text>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Box</Text>
        <Row stl={{ gap: 12 }}>
          <Box
            stl={{ width: 80, height: 80, backgroundColor: '$primary4', borderRadius: 8 }}
          />
          <Box
            stl={{ width: 80, height: 80, backgroundColor: '$primary6', borderRadius: 8 }}
          />
          <Box
            stl={{ width: 80, height: 80, backgroundColor: '$primary8', borderRadius: 8 }}
          />
        </Row>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Row</Text>
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
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Column</Text>
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
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Text & Heading</Text>
        <Heading>Heading Component</Heading>
        <SubHeading>SubHeading Component</SubHeading>
        <Text>Regular Text component for body content.</Text>
        <Text stl={{ fontWeight: '700', color: '$primary8' }}>Bold colored text</Text>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Grid</Text>
        <Grid stl={{ gap: 8 }} columns={3}>
          {Array.from({ length: 6 }, (_, i) => (
            <Box
              key={i}
              stl={{ height: 50, backgroundColor: '$plum4', borderRadius: 4 }}
            />
          ))}
        </Grid>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Pressable</Text>
        <Pressable
          onPress={() => {}}
          stl={{
            px: 16,
            py: 10,
            backgroundColor: '$primary6',
            borderRadius: 8,
            alignSelf: 'flex-start',
          }}
        >
          <Text stl={{ color: '$panel', fontWeight: '600' }}>Press Me</Text>
        </Pressable>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Image</Text>
        <Image
          source={{ uri: 'https://picsum.photos/200/150' }}
          stl={{ width: 200, height: 150, borderRadius: 8 }}
        />
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>AspectRatio</Text>
        <AspectRatio ratio={16 / 9} style={{ maxWidth: 240 }}>
          <Box stl={{ flex: 1, backgroundColor: '$primary4', borderRadius: 8 }} />
        </AspectRatio>
        <Text stl={{ fontSize: 12, color: '$neutral6', mt: 4 }}>16:9 ratio</Text>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Divider & Separator</Text>
        <Text>Content above divider</Text>
        <Divider orientation="horizontal" />
        <Text>Content below divider</Text>
        <Spacer size="md" />
        <Text>Content above separator</Text>
        <Separator orientation="horizontal" />
        <Text>Content below separator (has ARIA role)</Text>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Spacer</Text>
        <Row stl={{ height: 40, backgroundColor: '$color3', borderRadius: 4 }}>
          <Box
            stl={{ width: 40, height: 40, backgroundColor: '$primary6', borderRadius: 4 }}
          />
          <Spacer />
          <Box
            stl={{ width: 40, height: 40, backgroundColor: '$primary6', borderRadius: 4 }}
          />
        </Row>
        <Text stl={{ fontSize: 12, color: '$neutral6', mt: 4 }}>flex: 1 spacer between two boxes</Text>
        <Row stl={{ gap: 4, mt: 8 }}>
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
        <Text stl={{ fontSize: 12, color: '$neutral6', mt: 4 }}>xs → md → xl fixed spacers</Text>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Skeleton</Text>
        <Column stl={{ gap: 8 }}>
          <Skeleton width="100%" height={20} />
          <Skeleton width="75%" height={20} />
          <Skeleton width="50%" height={20} />
          <Row stl={{ gap: 12, mt: 4 }}>
            <Skeleton circle width={48} height={48} />
            <Column stl={{ flex: 1, gap: 8 }}>
              <Skeleton width="60%" height={14} />
              <Skeleton width="40%" height={14} />
            </Column>
          </Row>
        </Column>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Spinner</Text>
        <Row stl={{ gap: 24 }}>
          <Column stl={{ alignItems: 'center', gap: 4 }}>
            <Spinner size="small" />
            <Text stl={{ fontSize: 12, color: '$neutral6' }}>Small</Text>
          </Column>
          <Column stl={{ alignItems: 'center', gap: 4 }}>
            <Spinner size="large" />
            <Text stl={{ fontSize: 12, color: '$neutral6' }}>Large</Text>
          </Column>
        </Row>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Kbd</Text>
        <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
          <Kbd>⌘</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
          <Text stl={{ alignSelf: 'center' }}> = Command Palette</Text>
        </Row>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Badge</Text>
        <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </Row>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>VisuallyHidden</Text>
        <Text>The text below is visually hidden but accessible to screen readers:</Text>
        <VisuallyHidden>
          <Text>This text is only visible to assistive technology</Text>
        </VisuallyHidden>
        <Text stl={{ fontStyle: 'italic', color: '$color8' }}>
          (Enable a screen reader to hear the hidden content)
        </Text>
      </Box>
    </ScrollView>
  )
}
