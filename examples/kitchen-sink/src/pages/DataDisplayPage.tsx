import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import {
  Card,
  Table,
  Alert,
  Avatar,
  Progress,
  Loader,
  Accordion,
  Collapsible,
  Carousel,
  Breadcrumb,
  Button,
  H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote, InlineCode, List, ListItem,
  Kbd,
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

export function DataDisplayPage() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">Data Display</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Card, Table, Avatar, Alert, Progress, Loader, Accordion, Collapsible, Carousel, Breadcrumb, Typography, and Kbd.
      </Text>

      {/* Card */}
      <Section title="Card">
        <XStack gap="$4" flexWrap="wrap">
          <Card flex={1} minWidth={260}>
            <Card.Header>
              <Card.Title>Basic Card</Card.Title>
              <Card.Description>A simple card with header and content.</Card.Description>
            </Card.Header>
            <Card.Content>
              <Text fontFamily="$body" fontSize="$3">Card content goes here.</Text>
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
              <Card.Description>This card uses elevation instead of border.</Card.Description>
            </Card.Header>
            <Card.Content>
              <Text fontFamily="$body" fontSize="$3">Use the elevated variant for floating cards.</Text>
            </Card.Content>
          </Card>
          <Card flex={1} minWidth={260} interactive onPress={() => alert('Card pressed!')}>
            <Card.Header>
              <Card.Title>Interactive Card</Card.Title>
              <Card.Description>Click me — hover and press states.</Card.Description>
            </Card.Header>
          </Card>
        </XStack>
      </Section>

      {/* Table */}
      <Section title="Table">
        <DemoCard label="Basic table">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Role</Table.Head>
                <Table.Head>Status</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Alice Johnson</Table.Cell>
                <Table.Cell>Engineer</Table.Cell>
                <Table.Cell>Active</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bob Smith</Table.Cell>
                <Table.Cell>Designer</Table.Cell>
                <Table.Cell>Active</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Carol Williams</Table.Cell>
                <Table.Cell>PM</Table.Cell>
                <Table.Cell>On leave</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={2}>Total</Table.Cell>
                <Table.Cell>3 members</Table.Cell>
              </Table.Row>
            </Table.Footer>
            <Table.Caption>Team members overview</Table.Caption>
          </Table.Root>
        </DemoCard>
      </Section>

      {/* Alert */}
      <Section title="Alert">
        <DemoCard label="Default variant">
          <Alert.Root variant="default">
            <Alert.Title>Heads up!</Alert.Title>
            <Alert.Description>This is a default informational alert.</Alert.Description>
          </Alert.Root>
        </DemoCard>
        <DemoCard label="Destructive variant">
          <Alert.Root variant="destructive">
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>Something went wrong. Please try again.</Alert.Description>
          </Alert.Root>
        </DemoCard>
      </Section>

      {/* Avatar */}
      <Section title="Avatar">
        <DemoCard label="Sizes and fallbacks">
          <XStack gap="$3" alignItems="center">
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
            <Avatar size="xl" fallback="XL" />
          </XStack>
        </DemoCard>
      </Section>

      {/* Progress */}
      <Section title="Progress">
        <DemoCard label="Default">
          <YStack gap="$2">
            <Progress value={65} aria-label="Task completion" />
            <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">65% complete</Text>
          </YStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <YStack gap="$3">
            <Progress size="sm" value={25} aria-label="Small progress" />
            <Progress size="md" value={50} aria-label="Medium progress" />
            <Progress size="lg" value={75} aria-label="Large progress" />
          </YStack>
        </DemoCard>
      </Section>

      {/* Loader */}
      <Section title="Loader">
        <DemoCard label="Sizes">
          <XStack gap="$4" alignItems="center">
            <Loader size="sm" />
            <Loader size="md" />
            <Loader size="lg" />
          </XStack>
        </DemoCard>
        <DemoCard label="Variants">
          <XStack gap="$4" alignItems="center">
            <Loader variant="primary" />
            <Loader variant="light" />
            <Loader variant="dark" />
          </XStack>
        </DemoCard>
      </Section>

      {/* Accordion */}
      <Section title="Accordion">
        <DemoCard label="Single collapsible">
          <Accordion.Root type="single" defaultValue={['item1']} collapsible>
            <Accordion.Item value="item1">
              <Accordion.Trigger>What is @vlting/ui?</Accordion.Trigger>
              <Accordion.Content>
                <Text fontFamily="$body" fontSize="$3">A cross-platform, open-source design system built on Tamagui.</Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item2">
              <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
              <Accordion.Content>
                <Text fontFamily="$body" fontSize="$3">Yes — all components follow WAI-ARIA guidelines.</Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item3">
              <Accordion.Trigger>Can I customize the theme?</Accordion.Trigger>
              <Accordion.Content>
                <Text fontFamily="$body" fontSize="$3">Absolutely. Use the brand config system to define palettes, shadows, fonts, and more.</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </DemoCard>
        <DemoCard label="Multiple open">
          <Accordion.Root type="multiple" defaultValue={['a', 'b']}>
            <Accordion.Item value="a">
              <Accordion.Trigger>Section A</Accordion.Trigger>
              <Accordion.Content>
                <Text fontFamily="$body" fontSize="$3">Content for section A.</Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="b">
              <Accordion.Trigger>Section B</Accordion.Trigger>
              <Accordion.Content>
                <Text fontFamily="$body" fontSize="$3">Content for section B.</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </DemoCard>
      </Section>

      {/* Collapsible */}
      <Section title="Collapsible">
        <DemoCard label="Toggle content visibility">
          <Collapsible.Root open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <Collapsible.Trigger>
              <Button variant="outline">
                <Button.Text>{collapsibleOpen ? 'Hide' : 'Show'} content</Button.Text>
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <YStack padding="$3" marginTop="$2" backgroundColor="$color3" borderRadius="$3">
                <Text fontFamily="$body" fontSize="$3">
                  This content is revealed when the collapsible is open.
                </Text>
              </YStack>
            </Collapsible.Content>
          </Collapsible.Root>
        </DemoCard>
      </Section>

      {/* Carousel */}
      <Section title="Carousel">
        <DemoCard label="Swipeable carousel">
          <Carousel.Root>
            {[1, 2, 3, 4, 5].map((i) => (
              <Carousel.Item key={i}>
                <View backgroundColor="$color4" borderRadius="$4" padding="$6" alignItems="center" justifyContent="center" minHeight={160}>
                  <Text fontFamily="$heading" fontSize="$6" fontWeight="$4">Slide {i}</Text>
                </View>
              </Carousel.Item>
            ))}
          </Carousel.Root>
        </DemoCard>
      </Section>

      {/* Breadcrumb */}
      <Section title="Breadcrumb">
        <DemoCard label="Basic breadcrumb">
          <Breadcrumb.Root>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Products</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Widget Pro</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.Root>
        </DemoCard>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <DemoCard label="Headings and text">
          <YStack gap="$3">
            <H1>Heading 1</H1>
            <H2>Heading 2</H2>
            <H3>Heading 3</H3>
            <H4>Heading 4</H4>
            <P>This is a paragraph of body text.</P>
            <Lead>This is a lead paragraph for introductions.</Lead>
            <Large>Large text for emphasis.</Large>
            <Small>Small text for captions.</Small>
            <Muted>Muted text for de-emphasized content.</Muted>
            <Blockquote>A blockquote for highlighted passages.</Blockquote>
            <P>Use <InlineCode>InlineCode</InlineCode> for code references.</P>
            <List>
              <ListItem>First list item</ListItem>
              <ListItem>Second list item</ListItem>
              <ListItem>Third list item</ListItem>
            </List>
          </YStack>
        </DemoCard>
      </Section>

      {/* Kbd */}
      <Section title="Kbd">
        <DemoCard label="Keyboard shortcuts">
          <XStack gap="$3" alignItems="center" flexWrap="wrap">
            <Kbd>Ctrl</Kbd>
            <Text fontFamily="$body" fontSize="$3">+</Text>
            <Kbd>C</Kbd>
            <Text fontFamily="$body" fontSize="$3" marginLeft="$3">to copy</Text>
          </XStack>
          <XStack gap="$3" alignItems="center" flexWrap="wrap" marginTop="$2">
            <Kbd>Cmd</Kbd>
            <Text fontFamily="$body" fontSize="$3">+</Text>
            <Kbd>Shift</Kbd>
            <Text fontFamily="$body" fontSize="$3">+</Text>
            <Kbd>P</Kbd>
            <Text fontFamily="$body" fontSize="$3" marginLeft="$3">command palette</Text>
          </XStack>
        </DemoCard>
      </Section>
    </YStack>
  )
}
