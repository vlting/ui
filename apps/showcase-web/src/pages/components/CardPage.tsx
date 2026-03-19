import { Button, Card as CardBase } from '@vlting/ui/components'
import type { ComponentType, ReactNode } from 'react'
import { DemoCard, Section } from '../../components/Section'

// Card's styled() base doesn't expose children in its types
const Card = CardBase as unknown as ComponentType<
  Parameters<typeof CardBase>[0] & { children?: ReactNode }
> &
  typeof CardBase

export function CardPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Card</h1>

      <Section title="Default">
        <DemoCard label="Card with title and description" testId="card-default">
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
            </Card>
          </div>
        </DemoCard>
      </Section>

      <Section title="With Footer">
        <DemoCard label="Card with footer actions" testId="card-with-footer">
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
                <Button variant="outline" size="md">
                  Cancel
                </Button>
                <Button size="md">Save</Button>
              </Card.Footer>
            </Card>
          </div>
        </DemoCard>
      </Section>
    </div>
  )
}
