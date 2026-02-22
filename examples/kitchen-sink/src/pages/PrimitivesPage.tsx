import React from 'react'
import { YStack, XStack, Text, Heading, View, Separator } from 'tamagui'
import {
  Box,
  VStack,
  HStack,
  Text as VText,
  Heading as VHeading,
  Divider,
  Spacer,
  Label,
  Badge,
  Skeleton,
  Separator as VSeparator,
  AspectRatio,
  VisuallyHidden,
} from '@vlting/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap="$3" paddingVertical="$4">
      <Heading fontFamily="$heading" fontSize="$6" fontWeight="$4">
        {title}
      </Heading>
      <Separator />
      <YStack gap="$3" paddingTop="$2">
        {children}
      </YStack>
    </YStack>
  )
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <YStack
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      gap="$3"
    >
      <Text fontFamily="$body" fontSize="$2" fontWeight="$3" color="$colorSubtitle">
        {label}
      </Text>
      {children}
    </YStack>
  )
}

export function PrimitivesPage() {
  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">
        Primitives
      </Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Layer 1 — basic building blocks.
      </Text>

      <Section title="Box">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Default">
            <Box padding="$4" backgroundColor="$color3" borderRadius="$3">
              <Text fontFamily="$body">A basic Box</Text>
            </Box>
          </DemoCard>
          <DemoCard label="Centered">
            <Box centered padding="$6" backgroundColor="$color2" borderRadius="$3" minHeight={100}>
              <Text fontFamily="$body">Centered content</Text>
            </Box>
          </DemoCard>
        </XStack>
      </Section>

      <Section title="Stack / VStack / HStack">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="VStack (gap=$3)">
            <VStack gap="$3">
              <View backgroundColor="$color4" padding="$2" borderRadius="$2">
                <Text fontFamily="$body" fontSize="$2">Item 1</Text>
              </View>
              <View backgroundColor="$color4" padding="$2" borderRadius="$2">
                <Text fontFamily="$body" fontSize="$2">Item 2</Text>
              </View>
              <View backgroundColor="$color4" padding="$2" borderRadius="$2">
                <Text fontFamily="$body" fontSize="$2">Item 3</Text>
              </View>
            </VStack>
          </DemoCard>
          <DemoCard label="HStack (gap=$3)">
            <HStack gap="$3">
              <View backgroundColor="$color4" padding="$2" borderRadius="$2">
                <Text fontFamily="$body" fontSize="$2">A</Text>
              </View>
              <View backgroundColor="$color4" padding="$2" borderRadius="$2">
                <Text fontFamily="$body" fontSize="$2">B</Text>
              </View>
              <View backgroundColor="$color4" padding="$2" borderRadius="$2">
                <Text fontFamily="$body" fontSize="$2">C</Text>
              </View>
            </HStack>
          </DemoCard>
        </XStack>
      </Section>

      <Section title="Text">
        <DemoCard label="Sizes & Tones">
          <YStack gap="$2">
            <VText size="xs">Extra small text</VText>
            <VText size="sm">Small text</VText>
            <VText size="md">Medium text (default)</VText>
            <VText size="lg">Large text</VText>
            <VText size="xl">Extra large text</VText>
            <VText tone="muted">Muted tone</VText>
            <VText tone="primary">Primary tone</VText>
            <VText tone="success">Success tone</VText>
            <VText tone="warning">Warning tone</VText>
            <VText tone="danger">Danger tone</VText>
          </YStack>
        </DemoCard>
      </Section>

      <Section title="Heading">
        <DemoCard label="Levels 1-6">
          <YStack gap="$2">
            <VHeading level={1}>Heading Level 1</VHeading>
            <VHeading level={2}>Heading Level 2</VHeading>
            <VHeading level={3}>Heading Level 3</VHeading>
            <VHeading level={4}>Heading Level 4</VHeading>
            <VHeading level={5}>Heading Level 5</VHeading>
            <VHeading level={6}>Heading Level 6</VHeading>
          </YStack>
        </DemoCard>
      </Section>

      <Section title="Label">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Sizes">
            <YStack gap="$3">
              <Label size="sm">Small label</Label>
              <Label size="md">Medium label</Label>
              <Label size="lg">Large label</Label>
            </YStack>
          </DemoCard>
          <DemoCard label="Required indicator">
            <YStack gap="$3">
              <Label required>Required field</Label>
              <Label htmlFor="email-input" required size="md">
                Email address
              </Label>
            </YStack>
          </DemoCard>
        </XStack>
      </Section>

      <Section title="Badge">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Variants">
            <XStack gap="$2" flexWrap="wrap" alignItems="center">
              <Badge variant="solid">Solid</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="subtle">Subtle</Badge>
            </XStack>
          </DemoCard>
          <DemoCard label="All variants x tones">
            <YStack gap="$3">
              <XStack gap="$2" flexWrap="wrap" alignItems="center">
                <Badge tone="neutral">Neutral</Badge>
                <Badge tone="primary">Primary</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
              </XStack>
              <XStack gap="$2" flexWrap="wrap" alignItems="center">
                <Badge variant="outline" tone="neutral">Neutral</Badge>
                <Badge variant="outline" tone="primary">Primary</Badge>
                <Badge variant="outline" tone="success">Success</Badge>
                <Badge variant="outline" tone="warning">Warning</Badge>
                <Badge variant="outline" tone="danger">Danger</Badge>
              </XStack>
              <XStack gap="$2" flexWrap="wrap" alignItems="center">
                <Badge variant="subtle" tone="neutral">Neutral</Badge>
                <Badge variant="subtle" tone="primary">Primary</Badge>
                <Badge variant="subtle" tone="success">Success</Badge>
                <Badge variant="subtle" tone="warning">Warning</Badge>
                <Badge variant="subtle" tone="danger">Danger</Badge>
              </XStack>
            </YStack>
          </DemoCard>
          <DemoCard label="Sizes">
            <XStack gap="$2" alignItems="center" flexWrap="wrap">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </XStack>
          </DemoCard>
        </XStack>
      </Section>

      <Section title="Skeleton">
        <DemoCard label="Loading placeholders">
          <YStack gap="$3">
            <Skeleton width="100%" height={20} borderRadius="$2" />
            <Skeleton width="75%" height={20} borderRadius="$2" />
            <XStack gap="$3" alignItems="center">
              <Skeleton circle width={40} height={40} />
              <YStack gap="$2" flex={1}>
                <Skeleton width="60%" height={14} borderRadius="$2" />
                <Skeleton width="40%" height={14} borderRadius="$2" />
              </YStack>
            </XStack>
          </YStack>
        </DemoCard>
      </Section>

      <Section title="Separator">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Horizontal">
            <YStack gap="$3">
              <Text fontFamily="$body" fontSize="$3">Content above</Text>
              <VSeparator orientation="horizontal" />
              <Text fontFamily="$body" fontSize="$3">Content below</Text>
            </YStack>
          </DemoCard>
          <DemoCard label="Vertical">
            <XStack gap="$3" alignItems="center" height={60}>
              <Text fontFamily="$body" fontSize="$3">Left</Text>
              <VSeparator orientation="vertical" />
              <Text fontFamily="$body" fontSize="$3">Right</Text>
            </XStack>
          </DemoCard>
          <DemoCard label="Decorative">
            <YStack gap="$3">
              <Text fontFamily="$body" fontSize="$3">
                A decorative separator (no semantic meaning)
              </Text>
              <VSeparator decorative />
            </YStack>
          </DemoCard>
        </XStack>
      </Section>

      <Section title="Divider">
        <DemoCard label="Horizontal & Vertical">
          <YStack gap="$3">
            <Text fontFamily="$body" fontSize="$3">Above divider</Text>
            <Divider />
            <Text fontFamily="$body" fontSize="$3">Below divider</Text>
            <XStack gap="$3" alignItems="center" height={60}>
              <Text fontFamily="$body" fontSize="$3">Left</Text>
              <Divider orientation="vertical" />
              <Text fontFamily="$body" fontSize="$3">Right</Text>
            </XStack>
          </YStack>
        </DemoCard>
      </Section>

      <Section title="AspectRatio">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="1:1 (Square)">
            <AspectRatio ratio={1}>
              <View
                backgroundColor="$color4"
                borderRadius="$3"
                width="100%"
                height="100%"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontFamily="$body" fontSize="$3">1:1</Text>
              </View>
            </AspectRatio>
          </DemoCard>
          <DemoCard label="16:9 (Widescreen)">
            <AspectRatio ratio={16 / 9}>
              <View
                backgroundColor="$color4"
                borderRadius="$3"
                width="100%"
                height="100%"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontFamily="$body" fontSize="$3">16:9</Text>
              </View>
            </AspectRatio>
          </DemoCard>
        </XStack>
      </Section>

      <Section title="VisuallyHidden">
        <DemoCard label="Screen-reader-only content">
          <YStack gap="$3">
            <Text fontFamily="$body" fontSize="$3">
              The text below is wrapped in VisuallyHidden. It is present in the DOM and
              accessible to screen readers, but not visible on screen.
            </Text>
            <VisuallyHidden>
              This content is only available to assistive technologies.
            </VisuallyHidden>
            <View
              backgroundColor="$color3"
              borderRadius="$3"
              padding="$3"
              alignItems="center"
            >
              <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
                (hidden content is in the DOM here — inspect to verify)
              </Text>
            </View>
          </YStack>
        </DemoCard>
      </Section>

      <Section title="Spacer">
        <DemoCard label="Between elements">
          <HStack alignItems="center" backgroundColor="$color2" borderRadius="$3" padding="$2">
            <Text fontFamily="$body" fontSize="$3">Start</Text>
            <Spacer />
            <Text fontFamily="$body" fontSize="$3">End</Text>
          </HStack>
        </DemoCard>
      </Section>
    </YStack>
  )
}
