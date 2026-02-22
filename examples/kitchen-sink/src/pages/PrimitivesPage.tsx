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
        <DemoCard label="Sizes & Weights">
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
