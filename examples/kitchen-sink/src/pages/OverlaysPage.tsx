import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import {
  HoverCard,
  Drawer,
  Dialog,
  Tooltip,
  Button,
} from '@vlting/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap="$3" paddingVertical="$4">
      <Heading fontFamily="$heading" fontSize="$6" fontWeight="$4">{title}</Heading>
      <Separator />
      <YStack gap="$3" paddingTop="$2">{children}</YStack>
    </YStack>
  )
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <YStack backgroundColor="$background" borderRadius="$4" borderWidth={1} borderColor="$borderColor" padding="$4" gap="$3">
      <Text fontFamily="$body" fontSize="$2" fontWeight="$3" color="$colorSubtitle">{label}</Text>
      {children}
    </YStack>
  )
}

export function OverlaysPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">Overlays</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        HoverCard, Drawer, and other overlay components.
      </Text>

      {/* HoverCard */}
      <Section title="HoverCard">
        <DemoCard label="Hover over the trigger">
          <HoverCard.Root>
            <HoverCard.Trigger>
              <View
                backgroundColor="$color4"
                paddingHorizontal="$4"
                paddingVertical="$2"
                borderRadius="$3"
                cursor="pointer"
                alignSelf="flex-start"
              >
                <Text fontFamily="$body" fontSize="$3" fontWeight="$3">@vlting</Text>
              </View>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <YStack gap="$2" padding="$3" maxWidth={280}>
                <Text fontFamily="$body" fontSize="$4" fontWeight="$3">@vlting/ui</Text>
                <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                  A cross-platform, open-source design system built on Tamagui.
                </Text>
                <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
                  238 components · MIT licensed
                </Text>
              </YStack>
            </HoverCard.Content>
          </HoverCard.Root>
        </DemoCard>
      </Section>

      {/* Drawer */}
      <Section title="Drawer">
        <DemoCard label="Bottom drawer">
          <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Drawer.Trigger>
              <Button onPress={() => setDrawerOpen(true)}>
                <Button.Text>Open Drawer</Button.Text>
              </Button>
            </Drawer.Trigger>
            <Drawer.Overlay />
            <Drawer.Content>
              <YStack padding="$4" gap="$3">
                <Text fontFamily="$heading" fontSize="$5" fontWeight="$4">Drawer Title</Text>
                <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                  This is a drawer that slides up from the bottom. Great for mobile-friendly actions.
                </Text>
                <Button variant="outline" onPress={() => setDrawerOpen(false)}>
                  <Button.Text>Close</Button.Text>
                </Button>
              </YStack>
            </Drawer.Content>
          </Drawer.Root>
        </DemoCard>
      </Section>

      {/* Tooltip (extended) */}
      <Section title="Tooltip">
        <DemoCard label="All sides">
          <XStack gap="$4" flexWrap="wrap" justifyContent="center">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
                <View
                  backgroundColor="$color4"
                  paddingHorizontal="$4"
                  paddingVertical="$2"
                  borderRadius="$3"
                  cursor="pointer"
                >
                  <Text fontFamily="$body" fontSize="$3" style={{ textTransform: 'capitalize' }}>{side}</Text>
                </View>
              </Tooltip>
            ))}
          </XStack>
        </DemoCard>
      </Section>
    </YStack>
  )
}
