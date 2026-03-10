import {
  AspectRatio,
  Badge,
  Box,
  Divider,
  HStack,
  Heading,
  Label,
  Separator,
  Skeleton,
  Spacer,
  Text,
  VStack,
  VisuallyHidden,
} from '@vlting/ui'
import { DemoCard, Section } from '../components/Section'

export function PrimitivesPage() {
  return (
    <VStack style={{ padding: 24, gap: 8, maxWidth: 900, marginInline: 'auto', width: '100%' }}>
      <Heading level={1}>Primitives</Heading>
      <Text tone="muted" style={{ marginBottom: 16 }}>
        Layer 1 — basic building blocks.
      </Text>

      <Section title="AspectRatio">
        <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
          <DemoCard label="1:1 (Square)">
            <AspectRatio ratio={1}>
              <Box
                centered
                style={{
                  backgroundColor: 'var(--vlt-color-4)',
                  borderRadius: 6,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Text size="sm">1:1</Text>
              </Box>
            </AspectRatio>
          </DemoCard>
          <DemoCard label="16:9 (Widescreen)">
            <AspectRatio ratio={16 / 9}>
              <Box
                centered
                style={{
                  backgroundColor: 'var(--vlt-color-4)',
                  borderRadius: 6,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Text size="sm">16:9</Text>
              </Box>
            </AspectRatio>
          </DemoCard>
        </HStack>
      </Section>

      <Section title="Badge">
        <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
          <DemoCard label="Variants">
            <HStack style={{ gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge variant="solid">Solid</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="subtle">Subtle</Badge>
            </HStack>
          </DemoCard>
          <DemoCard label="All variants x tones">
            <VStack style={{ gap: 12 }}>
              <HStack style={{ gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge tone="neutral">Neutral</Badge>
                <Badge tone="primary">Primary</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
              </HStack>
              <HStack style={{ gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge variant="outline" tone="neutral">Neutral</Badge>
                <Badge variant="outline" tone="primary">Primary</Badge>
                <Badge variant="outline" tone="success">Success</Badge>
                <Badge variant="outline" tone="warning">Warning</Badge>
                <Badge variant="outline" tone="danger">Danger</Badge>
              </HStack>
              <HStack style={{ gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge variant="subtle" tone="neutral">Neutral</Badge>
                <Badge variant="subtle" tone="primary">Primary</Badge>
                <Badge variant="subtle" tone="success">Success</Badge>
                <Badge variant="subtle" tone="warning">Warning</Badge>
                <Badge variant="subtle" tone="danger">Danger</Badge>
              </HStack>
            </VStack>
          </DemoCard>
          <DemoCard label="Sizes">
            <HStack style={{ gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </HStack>
          </DemoCard>
        </HStack>
      </Section>

      <Section title="Box">
        <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
          <DemoCard label="Default">
            <Box style={{ padding: 16, backgroundColor: 'var(--vlt-color-3)', borderRadius: 6 }}>
              <Text>A basic Box</Text>
            </Box>
          </DemoCard>
          <DemoCard label="Centered">
            <Box
              centered
              style={{ padding: 24, backgroundColor: 'var(--vlt-color-2)', borderRadius: 6, minHeight: 100 }}
            >
              <Text>Centered content</Text>
            </Box>
          </DemoCard>
        </HStack>
      </Section>

      <Section title="Divider">
        <DemoCard label="Horizontal & Vertical">
          <VStack style={{ gap: 12 }}>
            <Text size="sm">Above divider</Text>
            <Divider />
            <Text size="sm">Below divider</Text>
            <HStack style={{ gap: 12, alignItems: 'center', height: 60 }}>
              <Text size="sm">Left</Text>
              <Divider orientation="vertical" />
              <Text size="sm">Right</Text>
            </HStack>
          </VStack>
        </DemoCard>
      </Section>

      <Section title="Heading">
        <DemoCard label="Levels 1-6">
          <VStack style={{ gap: 8 }}>
            <Heading level={1}>Heading Level 1</Heading>
            <Heading level={2}>Heading Level 2</Heading>
            <Heading level={3}>Heading Level 3</Heading>
            <Heading level={4}>Heading Level 4</Heading>
            <Heading level={5}>Heading Level 5</Heading>
            <Heading level={6}>Heading Level 6</Heading>
          </VStack>
        </DemoCard>
      </Section>

      <Section title="Label">
        <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
          <DemoCard label="Sizes">
            <VStack style={{ gap: 12 }}>
              <Label size="sm">Small label</Label>
              <Label size="md">Medium label</Label>
              <Label size="lg">Large label</Label>
            </VStack>
          </DemoCard>
          <DemoCard label="Required indicator">
            <VStack style={{ gap: 12 }}>
              <Label required>Required field</Label>
              <Label htmlFor="email-input" required size="md">Email address</Label>
            </VStack>
          </DemoCard>
        </HStack>
      </Section>

      <Section title="Separator">
        <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
          <DemoCard label="Horizontal">
            <VStack style={{ gap: 12 }}>
              <Text size="sm">Content above</Text>
              <Separator orientation="horizontal" />
              <Text size="sm">Content below</Text>
            </VStack>
          </DemoCard>
          <DemoCard label="Vertical">
            <HStack style={{ gap: 12, alignItems: 'center', height: 60 }}>
              <Text size="sm">Left</Text>
              <Separator orientation="vertical" />
              <Text size="sm">Right</Text>
            </HStack>
          </DemoCard>
          <DemoCard label="Decorative">
            <VStack style={{ gap: 12 }}>
              <Text size="sm">A decorative separator (no semantic meaning)</Text>
              <Separator decorative />
            </VStack>
          </DemoCard>
        </HStack>
      </Section>

      <Section title="Skeleton">
        <DemoCard label="Loading placeholders">
          <VStack style={{ gap: 12 }}>
            <Skeleton width="100%" height={20} borderRadius="$2" />
            <Skeleton width="75%" height={20} borderRadius="$2" />
            <HStack style={{ gap: 12, alignItems: 'center' }}>
              <Skeleton circle width={40} height={40} />
              <VStack style={{ gap: 8, flex: 1 }}>
                <Skeleton width="60%" height={14} borderRadius="$2" />
                <Skeleton width="40%" height={14} borderRadius="$2" />
              </VStack>
            </HStack>
          </VStack>
        </DemoCard>
      </Section>

      <Section title="Spacer">
        <DemoCard label="Between elements">
          <HStack style={{ alignItems: 'center', backgroundColor: 'var(--vlt-color-2)', borderRadius: 6, padding: 8 }}>
            <Text size="sm">Start</Text>
            <Spacer />
            <Text size="sm">End</Text>
          </HStack>
        </DemoCard>
      </Section>

      <Section title="Stack / VStack / HStack">
        <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
          <DemoCard label="VStack (gap=12)">
            <VStack style={{ gap: 12 }}>
              <Box style={{ backgroundColor: 'var(--vlt-color-4)', padding: 8, borderRadius: 4 }}>
                <Text size="xs">Item 1</Text>
              </Box>
              <Box style={{ backgroundColor: 'var(--vlt-color-4)', padding: 8, borderRadius: 4 }}>
                <Text size="xs">Item 2</Text>
              </Box>
              <Box style={{ backgroundColor: 'var(--vlt-color-4)', padding: 8, borderRadius: 4 }}>
                <Text size="xs">Item 3</Text>
              </Box>
            </VStack>
          </DemoCard>
          <DemoCard label="HStack (gap=12)">
            <HStack style={{ gap: 12 }}>
              <Box style={{ backgroundColor: 'var(--vlt-color-4)', padding: 8, borderRadius: 4 }}>
                <Text size="xs">A</Text>
              </Box>
              <Box style={{ backgroundColor: 'var(--vlt-color-4)', padding: 8, borderRadius: 4 }}>
                <Text size="xs">B</Text>
              </Box>
              <Box style={{ backgroundColor: 'var(--vlt-color-4)', padding: 8, borderRadius: 4 }}>
                <Text size="xs">C</Text>
              </Box>
            </HStack>
          </DemoCard>
        </HStack>
      </Section>

      <Section title="Text">
        <DemoCard label="Sizes & Tones">
          <VStack style={{ gap: 8 }}>
            <Text size="xs">Extra small text</Text>
            <Text size="sm">Small text</Text>
            <Text size="md">Medium text (default)</Text>
            <Text size="lg">Large text</Text>
            <Text size="xl">Extra large text</Text>
            <Text tone="muted">Muted tone</Text>
            <Text tone="primary">Primary tone</Text>
            <Text tone="success">Success tone</Text>
            <Text tone="warning">Warning tone</Text>
            <Text tone="danger">Danger tone</Text>
          </VStack>
        </DemoCard>
      </Section>

      <Section title="VisuallyHidden">
        <DemoCard label="Screen-reader-only content">
          <VStack style={{ gap: 12 }}>
            <Text size="sm">
              The text below is wrapped in VisuallyHidden. It is present in the DOM and
              accessible to screen readers, but not visible on screen.
            </Text>
            <VisuallyHidden>
              This content is only available to assistive technologies.
            </VisuallyHidden>
            <Box centered style={{ backgroundColor: 'var(--vlt-color-3)', borderRadius: 6, padding: 12 }}>
              <Text size="xs" tone="muted">
                (hidden content is in the DOM here — inspect to verify)
              </Text>
            </Box>
          </VStack>
        </DemoCard>
      </Section>
    </VStack>
  )
}
