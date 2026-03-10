import { Section, DemoCard, DemoRow } from '../components/Section'
import { Accordion } from '@vlting/ui/components'
import { Table } from '@vlting/ui/components'
import { Tabs } from '@vlting/ui/components'
import { ScrollArea } from '@vlting/ui/components'
import { Calendar } from '@vlting/ui/components'
import { Carousel } from '@vlting/ui/components'
import { Resizable } from '@vlting/ui/components'

export function DataDisplayPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Data Display</h1>

      <Section title="Accordion">
        <DemoCard label="Expandable sections">
          <div style={{ maxWidth: 500 }}>
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="item-1">
                <Accordion.Trigger>What is STL?</Accordion.Trigger>
                <Accordion.Content>
                  STL (Style Token Layer) is a zero-runtime CSS engine built on Vanilla Extract.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-2">
                <Accordion.Trigger>How does the styled() API work?</Accordion.Trigger>
                <Accordion.Content>
                  The styled() function creates components with pre-defined styles and variants,
                  using CSS token references ($token) that resolve at build time.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-3">
                <Accordion.Trigger>Is it cross-platform?</Accordion.Trigger>
                <Accordion.Content>
                  Yes! STL supports both React (web) and React Native through separate bindings packages.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </DemoCard>
      </Section>

      <Section title="Tabs">
        <DemoCard label="Tabbed content">
          <Tabs.Root defaultValue="tab1">
            <Tabs.List>
              <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <p style={{ padding: '16px 0' }}>Account settings and preferences.</p>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <p style={{ padding: '16px 0' }}>Change your password here.</p>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <p style={{ padding: '16px 0' }}>General application settings.</p>
            </Tabs.Content>
          </Tabs.Root>
        </DemoCard>
      </Section>

      <Section title="Table">
        <DemoCard label="Data table">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Role</Table.Head>
                <Table.Head>Email</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {[
                { name: 'Alice Johnson', status: 'Active', role: 'Admin', email: 'alice@example.com' },
                { name: 'Bob Smith', status: 'Active', role: 'Editor', email: 'bob@example.com' },
                { name: 'Carol Williams', status: 'Inactive', role: 'Viewer', email: 'carol@example.com' },
              ].map(row => (
                <Table.Row key={row.email}>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.status}</Table.Cell>
                  <Table.Cell>{row.role}</Table.Cell>
                  <Table.Cell>{row.email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </DemoCard>
      </Section>

      <Section title="ScrollArea">
        <DemoCard label="Custom scrollbar region">
          <div style={{ height: 200, width: 350 }}>
            <ScrollArea.Root>
              <ScrollArea.Viewport>
                <div style={{ padding: 16 }}>
                  {Array.from({ length: 20 }, (_, i) => (
                    <p key={i} style={{ marginBottom: 8 }}>Scroll item {i + 1} — Lorem ipsum dolor sit amet.</p>
                  ))}
                </div>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </div>
        </DemoCard>
      </Section>

      <Section title="Calendar">
        <DemoCard label="Date picker calendar">
          <Calendar.Root />
        </DemoCard>
      </Section>

      <Section title="Carousel">
        <DemoCard label="Content carousel">
          <div style={{ maxWidth: 400 }}>
            <Carousel.Root>
              <Carousel.Content>
                {[1, 2, 3, 4, 5].map(i => (
                  <Carousel.Item key={i}>
                    <div style={{
                      height: 200,
                      backgroundColor: `hsl(${i * 60}, 60%, 85%)`,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      fontWeight: 700,
                    }}>
                      Slide {i}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              <Carousel.Previous />
              <Carousel.Next />
            </Carousel.Root>
          </div>
        </DemoCard>
      </Section>

      <Section title="Resizable">
        <DemoCard label="Resizable panels">
          <div style={{ height: 200, border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
            <Resizable.PanelGroup direction="horizontal">
              <Resizable.Panel defaultSize={50}>
                <div style={{ padding: 16, height: '100%', background: 'var(--stl-surface1, #f8f8f8)' }}>
                  Left Panel
                </div>
              </Resizable.Panel>
              <Resizable.Handle />
              <Resizable.Panel defaultSize={50}>
                <div style={{ padding: 16, height: '100%' }}>
                  Right Panel
                </div>
              </Resizable.Panel>
            </Resizable.PanelGroup>
          </div>
        </DemoCard>
      </Section>
    </div>
  )
}
