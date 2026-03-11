import {
  Alert,
  Avatar,
  Button,
  ButtonGroup,
  Card as CardBase,
  Empty,
  Item,
  Loader,
  Progress,
  Typography,
} from '@vlting/ui/components'
import type { ComponentType, ReactNode } from 'react'
import { DemoCard, DemoRow, Section } from '../components/Section'

const Card = CardBase as unknown as ComponentType<
  Parameters<typeof CardBase>[0] & { children?: ReactNode }
> &
  typeof CardBase

export function ComponentsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Components</h1>

      <Section title="Button">
        <DemoCard label="Button variants">
          <DemoRow>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </DemoRow>
        </DemoCard>
        <DemoCard label="Button sizes">
          <DemoRow>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </DemoRow>
        </DemoCard>
        <DemoCard label="Button states">
          <DemoRow>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="ButtonGroup">
        <DemoCard label="Grouped buttons">
          <ButtonGroup.Root>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup.Root>
        </DemoCard>
      </Section>

      <Section title="Card">
        <DemoCard label="Card component">
          <div style={{ maxWidth: 400 }}>
            <Card>
              <Card.Header>
                <Card.Title>Card Title</Card.Title>
                <Card.Description>
                  This is a description for the card component.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <p>Card content goes here. It can contain any elements.</p>
              </Card.Content>
              <Card.Footer>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </Card.Footer>
            </Card>
          </div>
        </DemoCard>
      </Section>

      <Section title="Alert">
        <DemoCard label="Alert variants">
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}
          >
            <Alert.Root>
              <Alert.Title>Default Alert</Alert.Title>
              <Alert.Description>This is a default alert message.</Alert.Description>
            </Alert.Root>
            <Alert.Root variant="destructive">
              <Alert.Title>Destructive Alert</Alert.Title>
              <Alert.Description>Something went wrong.</Alert.Description>
            </Alert.Root>
          </div>
        </DemoCard>
      </Section>

      <Section title="Avatar">
        <DemoCard label="Avatar sizes and fallback">
          <DemoRow>
            <Avatar size="sm">
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <Avatar size="md">
              <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar>
            <Avatar size="lg">
              <Avatar.Fallback>XY</Avatar.Fallback>
            </Avatar>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Progress">
        <DemoCard label="Progress bar">
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}
          >
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={75} />
            <Progress value={100} />
          </div>
        </DemoCard>
      </Section>

      <Section title="Loader">
        <DemoCard label="Loading indicators">
          <DemoRow>
            <Loader />
            <Loader size="lg" />
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Empty">
        <DemoCard label="Empty state">
          <Empty.Root>
            <Empty.Title>No results found</Empty.Title>
            <Empty.Description>
              Try adjusting your search or filter criteria.
            </Empty.Description>
          </Empty.Root>
        </DemoCard>
      </Section>

      <Section title="Typography">
        <DemoCard label="Headings">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Typography.H1>Heading 1</Typography.H1>
            <Typography.H2>Heading 2</Typography.H2>
            <Typography.H3>Heading 3</Typography.H3>
            <Typography.H4>Heading 4</Typography.H4>
          </div>
        </DemoCard>
        <DemoCard label="Body text variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Typography.Lead>
              Lead text — slightly larger introductory text.
            </Typography.Lead>
            <Typography.P>
              Paragraph text with normal line height and spacing.
            </Typography.P>
            <Typography.Large>Large text</Typography.Large>
            <Typography.Small>Small text</Typography.Small>
            <Typography.Muted>Muted text for secondary content.</Typography.Muted>
          </div>
        </DemoCard>
      </Section>

      <Section title="Item">
        <DemoCard label="List item with leading, content, and trailing">
          <div
            style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <Item>
              <Item.Leading>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#e0e7ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  A
                </div>
              </Item.Leading>
              <Item.Content>
                <Item.Title>Alice Johnson</Item.Title>
                <Item.Description>alice@example.com</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </Item.Trailing>
            </Item>
            <Item>
              <Item.Leading>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  B
                </div>
              </Item.Leading>
              <Item.Content>
                <Item.Title>Bob Smith</Item.Title>
                <Item.Description>bob@example.com</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </Item.Trailing>
            </Item>
          </div>
        </DemoCard>
      </Section>
    </div>
  )
}
