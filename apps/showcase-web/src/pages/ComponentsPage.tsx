import { Section, DemoCard, DemoRow } from '../components/Section'
import { Card } from '@vlting/ui/components'
import { Alert } from '@vlting/ui/components'
import { Avatar } from '@vlting/ui/components'
import { Button } from '@vlting/ui/components'
import { ButtonGroup } from '@vlting/ui/components'
import { Typography } from '@vlting/ui/components'
import { Empty } from '@vlting/ui/components'
import { Progress } from '@vlting/ui/components'
import { Loader } from '@vlting/ui/components'

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
          <ButtonGroup>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
        </DemoCard>
      </Section>

      <Section title="Card">
        <DemoCard label="Card component">
          <div style={{ maxWidth: 400 }}>
            <Card>
              <Card.Header>
                <Card.Title>Card Title</Card.Title>
                <Card.Description>This is a description for the card component.</Card.Description>
              </Card.Header>
              <Card.Content>
                <p>Card content goes here. It can contain any elements.</p>
              </Card.Content>
              <Card.Footer>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </Card.Footer>
            </Card>
          </div>
        </DemoCard>
      </Section>

      <Section title="Alert">
        <DemoCard label="Alert variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}>
            <Alert>
              <Alert.Title>Default Alert</Alert.Title>
              <Alert.Description>This is a default alert message.</Alert.Description>
            </Alert>
            <Alert variant="destructive">
              <Alert.Title>Destructive Alert</Alert.Title>
              <Alert.Description>Something went wrong.</Alert.Description>
            </Alert>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
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
          <Empty>
            <Empty.Title>No results found</Empty.Title>
            <Empty.Description>Try adjusting your search or filter criteria.</Empty.Description>
          </Empty>
        </DemoCard>
      </Section>

      <Section title="Typography">
        <DemoCard label="Typography components">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Typography.H1>Heading 1</Typography.H1>
            <Typography.H2>Heading 2</Typography.H2>
            <Typography.H3>Heading 3</Typography.H3>
            <Typography.H4>Heading 4</Typography.H4>
            <Typography.P>Paragraph text with normal line height and spacing.</Typography.P>
            <Typography.Lead>Lead text — slightly larger introductory text.</Typography.Lead>
            <Typography.Large>Large text</Typography.Large>
            <Typography.Small>Small text</Typography.Small>
            <Typography.Muted>Muted text for secondary content.</Typography.Muted>
          </div>
        </DemoCard>
      </Section>
    </div>
  )
}
