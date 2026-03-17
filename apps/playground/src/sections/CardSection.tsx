import { Button, Card as UiCard } from '@vlting/ui'

import { DemoCard, SectionHeading, SectionTitle, StackY, type SectionProps } from './shared'

export function CardSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard surface="dark" stl={{ mt: '$24' }} ref={sectionRef} data-section="Card">
      <SectionHeading>Card</SectionHeading>
      <StackY>
        <UiCard>
          <UiCard.Header>
            <UiCard.Title>Card Title</UiCard.Title>
            <UiCard.Description>Card description text</UiCard.Description>
          </UiCard.Header>
          <UiCard.Content>
            <p style={{ margin: 0 }}>Card content goes here.</p>
          </UiCard.Content>
          <UiCard.Footer>
            <Button size="sm">Action</Button>
          </UiCard.Footer>
        </UiCard>

        <SectionTitle>Flat</SectionTitle>
        <UiCard variant="flat">
          <UiCard.Header><UiCard.Title>Flat Card</UiCard.Title></UiCard.Header>
          <UiCard.Content><p style={{ margin: 0 }}>Border instead of shadow.</p></UiCard.Content>
        </UiCard>

        <SectionTitle>Raised</SectionTitle>
        <UiCard raised>
          <UiCard.Header><UiCard.Title>Raised Card</UiCard.Title></UiCard.Header>
          <UiCard.Content><p style={{ margin: 0 }}>Higher elevation with larger shadow.</p></UiCard.Content>
        </UiCard>

        <SectionTitle>Interactive</SectionTitle>
        <UiCard interactive onPress={() => {}}>
          <UiCard.Content><p style={{ margin: 0 }}>Click me (hover/focus to see effect)</p></UiCard.Content>
        </UiCard>

        <SectionTitle>Themes (interactive)</SectionTitle>
        {(['neutralMin', 'neutralMax', 'primary', 'secondary'] as const).map(theme => (
          <UiCard key={theme} theme={theme} interactive onPress={() => {}}>
            <UiCard.Content><p style={{ margin: 0 }}>Theme: {theme}</p></UiCard.Content>
          </UiCard>
        ))}

        <SectionTitle>Raised + Interactive</SectionTitle>
        <UiCard raised interactive theme="primary" onPress={() => {}}>
          <UiCard.Header><UiCard.Title>Primary Raised</UiCard.Title></UiCard.Header>
          <UiCard.Content><p style={{ margin: 0 }}>Raised + interactive + primary theme.</p></UiCard.Content>
        </UiCard>

        <SectionTitle>Sizes</SectionTitle>
        {(['sm', 'md', 'lg'] as const).map(size => (
          <UiCard key={size} size={size}>
            <UiCard.Content><p style={{ margin: 0 }}>Size: {size}</p></UiCard.Content>
          </UiCard>
        ))}
      </StackY>
    </DemoCard>
  )
}
