import {
  Accordion,
  Alert,
  Avatar,
  Blockquote,
  Box,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Collapsible,
  H1,
  H2,
  H3,
  H4,
  HStack,
  Heading,
  InlineCode,
  Kbd,
  Large,
  Lead,
  List,
  ListItem,
  Loader,
  Muted,
  P,
  Progress,
  Small,
  Table,
  Text,
  VStack,
} from '@vlting/ui'
import { useState } from 'react'
import { DemoCard, Section } from '../components/Section'

export function DataDisplayPage() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

  return (
    <VStack style={{ padding: 24, gap: 8, maxWidth: 900, marginInline: 'auto', width: '100%' }}>
      <Heading level={1}>Data Display</Heading>
      <Text tone="muted" style={{ marginBottom: 16 }}>
        Accordion, Alert, Avatar, Breadcrumb, Card, Carousel, Collapsible, Kbd, Loader,
        Progress, Table, and Typography.
      </Text>

      <Section title="Accordion">
        <DemoCard label="Single collapsible">
          <Accordion.Root type="single" defaultValue={['item1']} collapsible>
            <Accordion.Item value="item1">
              <Accordion.Trigger>What is @vlting/ui?</Accordion.Trigger>
              <Accordion.Content>
                <Text size="sm">A cross-platform, open-source design system.</Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item2">
              <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
              <Accordion.Content>
                <Text size="sm">Yes — all components follow WAI-ARIA guidelines.</Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item3">
              <Accordion.Trigger>Can I customize the theme?</Accordion.Trigger>
              <Accordion.Content>
                <Text size="sm">Absolutely. Use the brand config system to define palettes, shadows, fonts, and more.</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </DemoCard>
        <DemoCard label="Multiple open">
          <Accordion.Root type="multiple" defaultValue={['a', 'b']}>
            <Accordion.Item value="a">
              <Accordion.Trigger>Section A</Accordion.Trigger>
              <Accordion.Content><Text size="sm">Content for section A.</Text></Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="b">
              <Accordion.Trigger>Section B</Accordion.Trigger>
              <Accordion.Content><Text size="sm">Content for section B.</Text></Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </DemoCard>
      </Section>

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

      <Section title="Avatar">
        <DemoCard label="Sizes and fallbacks">
          <HStack style={{ gap: 12, alignItems: 'center' }}>
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
            <Avatar size="xl" fallback="XL" />
          </HStack>
        </DemoCard>
      </Section>

      <Section title="Breadcrumb">
        <DemoCard label="Basic breadcrumb">
          <Breadcrumb.Root>
            <Breadcrumb.Item><Breadcrumb.Link href="#">Home</Breadcrumb.Link></Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item><Breadcrumb.Link href="#">Products</Breadcrumb.Link></Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item><Breadcrumb.Page>Widget Pro</Breadcrumb.Page></Breadcrumb.Item>
          </Breadcrumb.Root>
        </DemoCard>
      </Section>

      <Section title="Card">
        <HStack style={{ gap: 16, flexWrap: 'wrap' }}>
          <Card flex={1} minWidth={260}>
            <Card.Header>
              <Card.Title>Basic Card</Card.Title>
              <Card.Description>A simple card with header and content.</Card.Description>
            </Card.Header>
            <Card.Content><Text size="sm">Card content goes here.</Text></Card.Content>
            <Card.Footer>
              <HStack style={{ gap: 8 }}>
                <Button size="sm" variant="outline"><Button.Text>Cancel</Button.Text></Button>
                <Button size="sm"><Button.Text>Save</Button.Text></Button>
              </HStack>
            </Card.Footer>
          </Card>
          <Card flex={1} minWidth={260} elevated>
            <Card.Header>
              <Card.Title>Elevated Card</Card.Title>
              <Card.Description>This card uses elevation instead of border.</Card.Description>
            </Card.Header>
            <Card.Content><Text size="sm">Use the elevated variant for floating cards.</Text></Card.Content>
          </Card>
          <Card flex={1} minWidth={260} interactive onPress={() => alert('Card pressed!')}>
            <Card.Header>
              <Card.Title>Interactive Card</Card.Title>
              <Card.Description>Click me — hover and press states.</Card.Description>
            </Card.Header>
          </Card>
        </HStack>
      </Section>

      <Section title="Carousel">
        <DemoCard label="Swipeable carousel">
          <Carousel.Root>
            {[1, 2, 3, 4, 5].map((i) => (
              <Carousel.Item key={i}>
                <Box
                  centered
                  style={{
                    backgroundColor: 'var(--vlt-color-4)',
                    borderRadius: 8,
                    padding: 24,
                    minHeight: 160,
                  }}
                >
                  <Text size="xl" weight="semibold" style={{ fontFamily: 'var(--vlt-font-heading)' }}>
                    Slide {i}
                  </Text>
                </Box>
              </Carousel.Item>
            ))}
          </Carousel.Root>
        </DemoCard>
      </Section>

      <Section title="Collapsible">
        <DemoCard label="Toggle content visibility">
          <Collapsible.Root open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <Collapsible.Trigger>
              <Button variant="outline">
                <Button.Text>{collapsibleOpen ? 'Hide' : 'Show'} content</Button.Text>
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <VStack style={{ padding: 12, marginTop: 8, backgroundColor: 'var(--vlt-color-3)', borderRadius: 6 }}>
                <Text size="sm">This content is revealed when the collapsible is open.</Text>
              </VStack>
            </Collapsible.Content>
          </Collapsible.Root>
        </DemoCard>
      </Section>

      <Section title="Kbd">
        <DemoCard label="Keyboard shortcuts">
          <HStack style={{ gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Kbd>Ctrl</Kbd>
            <Text size="sm">+</Text>
            <Kbd>C</Kbd>
            <Text size="sm" style={{ marginLeft: 12 }}>to copy</Text>
          </HStack>
          <HStack style={{ gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <Kbd>Cmd</Kbd>
            <Text size="sm">+</Text>
            <Kbd>Shift</Kbd>
            <Text size="sm">+</Text>
            <Kbd>P</Kbd>
            <Text size="sm" style={{ marginLeft: 12 }}>command palette</Text>
          </HStack>
        </DemoCard>
      </Section>

      <Section title="Loader">
        <DemoCard label="Sizes">
          <HStack style={{ gap: 16, alignItems: 'center' }}>
            <Loader size="sm" />
            <Loader size="md" />
            <Loader size="lg" />
          </HStack>
        </DemoCard>
        <DemoCard label="Variants">
          <HStack style={{ gap: 16, alignItems: 'center' }}>
            <Loader variant="primary" />
            <Loader variant="light" />
            <Loader variant="dark" />
          </HStack>
        </DemoCard>
      </Section>

      <Section title="Progress">
        <DemoCard label="Default">
          <VStack style={{ gap: 8 }}>
            <Progress value={65} aria-label="Task completion" />
            <Text size="xs" tone="muted">65% complete</Text>
          </VStack>
        </DemoCard>
        <DemoCard label="Sizes">
          <VStack style={{ gap: 12 }}>
            <Progress size="sm" value={25} aria-label="Small progress" />
            <Progress size="md" value={50} aria-label="Medium progress" />
            <Progress size="lg" value={75} aria-label="Large progress" />
          </VStack>
        </DemoCard>
      </Section>

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
              <Table.Row><Table.Cell>Alice Johnson</Table.Cell><Table.Cell>Engineer</Table.Cell><Table.Cell>Active</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Bob Smith</Table.Cell><Table.Cell>Designer</Table.Cell><Table.Cell>Active</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Carol Williams</Table.Cell><Table.Cell>PM</Table.Cell><Table.Cell>On leave</Table.Cell></Table.Row>
            </Table.Body>
            <Table.Footer>
              <Table.Row><Table.Cell colSpan={2}>Total</Table.Cell><Table.Cell>3 members</Table.Cell></Table.Row>
            </Table.Footer>
            <Table.Caption>Team members overview</Table.Caption>
          </Table.Root>
        </DemoCard>
      </Section>

      <Section title="Typography">
        <DemoCard label="Headings and text">
          <VStack style={{ gap: 12 }}>
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
          </VStack>
        </DemoCard>
      </Section>
    </VStack>
  )
}
