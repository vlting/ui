import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import {
  ScrollArea,
  Resizable,
  Carousel,
  Calendar,
  Sidebar,
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

export function LayoutPage() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">Layout Components</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        ScrollArea, Resizable, Carousel, Calendar, and Sidebar.
      </Text>

      {/* ScrollArea */}
      <Section title="ScrollArea">
        <DemoCard label="Scrollable area with custom scrollbar">
          <ScrollArea.Root style={{ height: 200 }}>
            <ScrollArea.Viewport>
              <YStack gap="$2" padding="$2">
                {Array.from({ length: 20 }, (_, i) => (
                  <Text key={i} fontFamily="$body" fontSize="$3" padding="$2" backgroundColor="$color3" borderRadius="$2">
                    Item {i + 1}
                  </Text>
                ))}
              </YStack>
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </DemoCard>
      </Section>

      {/* Calendar */}
      <Section title="Calendar">
        <DemoCard label="Date selection">
          <Calendar.Root value={calendarDate} onValueChange={setCalendarDate} />
          <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
            Selected: {calendarDate ? calendarDate.toLocaleDateString() : '(none)'}
          </Text>
        </DemoCard>
      </Section>

      {/* Carousel */}
      <Section title="Carousel">
        <DemoCard label="Swipeable carousel">
          <Carousel.Root>
            {[1, 2, 3, 4, 5].map((i) => (
              <Carousel.Item key={i}>
                <View
                  backgroundColor="$color4"
                  borderRadius="$4"
                  padding="$6"
                  alignItems="center"
                  justifyContent="center"
                  minHeight={160}
                >
                  <Text fontFamily="$heading" fontSize="$6" fontWeight="$4">
                    Slide {i}
                  </Text>
                </View>
              </Carousel.Item>
            ))}
          </Carousel.Root>
        </DemoCard>
      </Section>

      {/* Resizable */}
      <Section title="Resizable">
        <DemoCard label="Resizable panels">
          <View height={200} borderRadius="$4" overflow="hidden" borderWidth={1} borderColor="$borderColor">
            <Resizable.PanelGroup direction="horizontal">
              <Resizable.Panel defaultSize={50}>
                <View flex={1} backgroundColor="$color3" alignItems="center" justifyContent="center" padding="$3">
                  <Text fontFamily="$body" fontSize="$3">Panel A</Text>
                </View>
              </Resizable.Panel>
              <Resizable.Handle />
              <Resizable.Panel defaultSize={50}>
                <View flex={1} backgroundColor="$color2" alignItems="center" justifyContent="center" padding="$3">
                  <Text fontFamily="$body" fontSize="$3">Panel B</Text>
                </View>
              </Resizable.Panel>
            </Resizable.PanelGroup>
          </View>
        </DemoCard>
      </Section>

      {/* Sidebar */}
      <Section title="Sidebar">
        <DemoCard label="App sidebar with groups">
          <View height={300} borderRadius="$4" overflow="hidden" borderWidth={1} borderColor="$borderColor">
            <XStack flex={1}>
              <Sidebar.Root>
                <Sidebar.Group label="Dashboard">
                  <Sidebar.MenuItem label="Overview" active />
                  <Sidebar.MenuItem label="Analytics" />
                  <Sidebar.MenuItem label="Reports" />
                </Sidebar.Group>
                <Sidebar.Group label="Settings">
                  <Sidebar.MenuItem label="General" />
                  <Sidebar.MenuItem label="Team" />
                  <Sidebar.MenuItem label="Billing" />
                </Sidebar.Group>
              </Sidebar.Root>
              <View flex={1} backgroundColor="$background" padding="$4" alignItems="center" justifyContent="center">
                <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">Main content area</Text>
              </View>
            </XStack>
          </View>
        </DemoCard>
      </Section>
    </YStack>
  )
}
