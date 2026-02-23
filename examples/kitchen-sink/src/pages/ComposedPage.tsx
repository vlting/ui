import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import { Accordion, AlertDialog, Collapsible, Table, Breadcrumb, Form, Button, Input } from '@vlting/ui'

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

function AccordionDemo() {
  return (
    <DemoCard label="Single-select, collapsible accordion with 3 items">
      <Accordion.Root type="single" defaultValue={['item-1']} collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>What is this design system?</Accordion.Trigger>
          <Accordion.Content>
            <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
              A cross-platform, open-source design system built on Tamagui v2. It provides
              layered primitives, headless behaviors, styled components, and composed patterns.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>How does theming work?</Accordion.Trigger>
          <Accordion.Content>
            <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
              Themes are built with a 12-step palette system using @tamagui/theme-builder.
              Brand configs drive all visual tokens including color, typography, and spacing.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Can I use it with React Native?</Accordion.Trigger>
          <Accordion.Content>
            <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
              Yes. Because the system is built on Tamagui, components compile to optimized
              native views on iOS and Android, and to flat CSS on the web.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </DemoCard>
  )
}

function AlertDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <DemoCard label="Destructive confirmation dialog">
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger>
          <Button variant="outline" onPress={() => setOpen(true)}>
            <Button.Text>Delete Project</Button.Text>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Overlay>
          <AlertDialog.Content>
            <AlertDialog.Title>Delete Project</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete this project? This action cannot be undone
              and all associated data will be permanently removed.
            </AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>
                <Button variant="outline" onPress={() => setOpen(false)}>
                  <Button.Text>Cancel</Button.Text>
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button onPress={() => setOpen(false)}>
                  <Button.Text>Delete</Button.Text>
                </Button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Root>
    </DemoCard>
  )
}

function CollapsibleDemo() {
  return (
    <DemoCard label="Toggle to reveal hidden content">
      <Collapsible.Root defaultOpen={false}>
        <Collapsible.Trigger>
          <View
            backgroundColor="$color4"
            paddingHorizontal="$4"
            paddingVertical="$2"
            borderRadius="$3"
            cursor="pointer"
          >
            <Text fontFamily="$body" fontSize="$3">Toggle Details</Text>
          </View>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <YStack paddingTop="$3" gap="$2">
            <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
              This content is hidden by default and revealed when the trigger is clicked.
              The Collapsible component supports controlled and uncontrolled modes via
              open, defaultOpen, and onOpenChange props.
            </Text>
            <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
              Use collapsible sections for progressive disclosure — showing users only
              the information they need, when they need it.
            </Text>
          </YStack>
        </Collapsible.Content>
      </Collapsible.Root>
    </DemoCard>
  )
}

function TableDemo() {
  return (
    <DemoCard label="Data table with header, body, footer, and caption">
      <Table.Root>
        <Table.Caption>Team members and their roles</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head style={{ textAlign: 'right' }}>Hours</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice Johnson</Table.Cell>
            <Table.Cell>Engineering Lead</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell style={{ textAlign: 'right' }}>42</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bob Smith</Table.Cell>
            <Table.Cell>Senior Developer</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell style={{ textAlign: 'right' }}>38</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Carol Williams</Table.Cell>
            <Table.Cell>Designer</Table.Cell>
            <Table.Cell>On Leave</Table.Cell>
            <Table.Cell style={{ textAlign: 'right' }}>0</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>David Lee</Table.Cell>
            <Table.Cell>Backend Developer</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell style={{ textAlign: 'right' }}>40</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Eva Chen</Table.Cell>
            <Table.Cell>QA Engineer</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell style={{ textAlign: 'right' }}>36</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 600 }}>Total</Table.Cell>
            <Table.Cell />
            <Table.Cell />
            <Table.Cell style={{ textAlign: 'right', fontWeight: 600 }}>156</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </DemoCard>
  )
}

function BreadcrumbDemo() {
  return (
    <DemoCard label="3-level navigation breadcrumb">
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#" onPress={() => {}}>Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#" onPress={() => {}}>Projects</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Settings</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    </DemoCard>
  )
}

function FormDemo() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <DemoCard label="Form with validation and error state">
      <Form.Root onSubmit={() => setSubmitted(true)}>
        <Form.Field>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Input placeholder="you@example.com" />
          <Form.Description>We will never share your email.</Form.Description>
        </Form.Field>
        <Form.Field error>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Input placeholder="Choose a username" error />
          <Form.ErrorMessage>This username is already taken.</Form.ErrorMessage>
        </Form.Field>
        <XStack gap="$2" paddingTop="$2">
          <Button onPress={() => setSubmitted(true)}>
            <Button.Text>Submit</Button.Text>
          </Button>
          {submitted && (
            <Text fontFamily="$body" fontSize="$3" color="$green10" alignSelf="center">
              Form submitted!
            </Text>
          )}
        </XStack>
      </Form.Root>
    </DemoCard>
  )
}

export function ComposedPage() {
  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">
        Composed
      </Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Complex multi-part components built from primitives.
      </Text>

      <Section title="Accordion">
        <AccordionDemo />
      </Section>

      <Section title="AlertDialog">
        <AlertDialogDemo />
      </Section>

      <Section title="Collapsible">
        <CollapsibleDemo />
      </Section>

      <Section title="Table">
        <TableDemo />
      </Section>

      <Section title="Breadcrumb">
        <BreadcrumbDemo />
      </Section>

      <Section title="Form">
        <FormDemo />
      </Section>
    </YStack>
  )
}
