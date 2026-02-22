import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator } from 'tamagui'
import { Button, Input, Card, Dialog, Tabs } from '@vlting/ui'

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

export function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">
        Components
      </Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Layer 3 — styled, ready-to-use components.
      </Text>

      <Section title="Button">
        <DemoCard label="Variants">
          <XStack gap="$3" flexWrap="wrap">
            <Button variant="solid"><Button.Text>Solid</Button.Text></Button>
            <Button variant="outline"><Button.Text>Outline</Button.Text></Button>
            <Button variant="ghost"><Button.Text>Ghost</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <XStack gap="$3" alignItems="center" flexWrap="wrap">
            <Button size="sm"><Button.Text>Small</Button.Text></Button>
            <Button size="md"><Button.Text>Medium</Button.Text></Button>
            <Button size="lg"><Button.Text>Large</Button.Text></Button>
          </XStack>
        </DemoCard>
        <DemoCard label="States">
          <XStack gap="$3" flexWrap="wrap">
            <Button disabled><Button.Text>Disabled</Button.Text></Button>
            <Button loading><Button.Text>Loading</Button.Text></Button>
          </XStack>
        </DemoCard>
      </Section>

      <Section title="Input">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Default">
            <Input
              placeholder="Type something..."
              value={inputValue}
              onChangeText={setInputValue}
            />
          </DemoCard>
          <DemoCard label="With label & helper">
            <Input
              label="Email"
              placeholder="you@example.com"
              helperText="We'll never share your email."
            />
          </DemoCard>
          <DemoCard label="Error state">
            <Input
              label="Username"
              placeholder="Choose a username"
              error
              errorMessage="Username is already taken"
            />
          </DemoCard>
          <DemoCard label="Sizes">
            <YStack gap="$3">
              <Input size="sm" placeholder="Small input" />
              <Input size="md" placeholder="Medium input" />
              <Input size="lg" placeholder="Large input" />
            </YStack>
          </DemoCard>
        </XStack>
      </Section>

      <Section title="Card">
        <XStack gap="$4" flexWrap="wrap">
          <Card flex={1} minWidth={260}>
            <Card.Header>
              <Card.Title>Basic Card</Card.Title>
              <Card.Description>A simple card with header and content.</Card.Description>
            </Card.Header>
            <Card.Content>
              <Text fontFamily="$body" fontSize="$3">
                Card content goes here. Cards support header, content, and footer sections.
              </Text>
            </Card.Content>
            <Card.Footer>
              <XStack gap="$2">
                <Button size="sm" variant="outline"><Button.Text>Cancel</Button.Text></Button>
                <Button size="sm"><Button.Text>Save</Button.Text></Button>
              </XStack>
            </Card.Footer>
          </Card>
          <Card flex={1} minWidth={260} elevated>
            <Card.Header>
              <Card.Title>Elevated Card</Card.Title>
              <Card.Description>This card has no border, relying on elevation.</Card.Description>
            </Card.Header>
            <Card.Content>
              <Text fontFamily="$body" fontSize="$3">
                Use the elevated variant for cards that float above the surface.
              </Text>
            </Card.Content>
          </Card>
          <Card flex={1} minWidth={260} interactive onPress={() => alert('Card pressed!')}>
            <Card.Header>
              <Card.Title>Interactive Card</Card.Title>
              <Card.Description>Click me — I have hover and press states.</Card.Description>
            </Card.Header>
          </Card>
        </XStack>
      </Section>

      <Section title="Dialog">
        <DemoCard label="Open/Close">
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger>
              <Button onPress={() => setDialogOpen(true)}>
                <Button.Text>Open Dialog</Button.Text>
              </Button>
            </Dialog.Trigger>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Example Dialog</Dialog.Title>
              <Dialog.Description>
                This is a styled dialog built on the headless Dialog primitive.
              </Dialog.Description>
              <YStack paddingTop="$4">
                <Dialog.Close>
                  <Button variant="outline" onPress={() => setDialogOpen(false)}>
                    <Button.Text>Close</Button.Text>
                  </Button>
                </Dialog.Close>
              </YStack>
            </Dialog.Content>
          </Dialog.Root>
        </DemoCard>
      </Section>

      <Section title="Tabs">
        <DemoCard label="Multi-tab">
          <Tabs.Root defaultValue="tab1">
            <Tabs.List>
              <Tabs.Trigger value="tab1">
                <Text fontFamily="$body" fontSize="$3">Tab 1</Text>
              </Tabs.Trigger>
              <Tabs.Trigger value="tab2">
                <Text fontFamily="$body" fontSize="$3">Tab 2</Text>
              </Tabs.Trigger>
              <Tabs.Trigger value="tab3">
                <Text fontFamily="$body" fontSize="$3">Tab 3</Text>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <Text fontFamily="$body" fontSize="$3">
                Content for the first tab. Tabs support keyboard navigation with arrow keys.
              </Text>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <Text fontFamily="$body" fontSize="$3">
                Content for the second tab. Each tab panel is conditionally rendered.
              </Text>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <Text fontFamily="$body" fontSize="$3">
                Content for the third tab.
              </Text>
            </Tabs.Content>
          </Tabs.Root>
        </DemoCard>
      </Section>
    </YStack>
  )
}
