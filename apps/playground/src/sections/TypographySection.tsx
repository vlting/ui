import { Blockquote, Card, Heading, InlineCode, Text } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, type SectionProps } from './shared'

const ColumnRow = styled('div', {
  display: 'flex', gap: '$24', overflowX: 'auto',
}, { name: 'ColumnRow' })

const Column = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12', minWidth: '280px', flex: '1',
}, { name: 'Column' })

export function TypographySection({ sectionRef }: SectionProps) {
  return (
    <Card elevation="flat" flush ref={sectionRef} data-section="Typography" stl={{ mt: '$24' }}>
      <Card.Header>
        <Card.Title>Typography</Card.Title>
      </Card.Header>
      <Card.Content>
        <ColumnRow>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Heading</SectionTitle>
            <Heading.H1>Heading 1</Heading.H1>
            <Heading.H2>Heading 2</Heading.H2>
            <Heading.H3>Heading 3</Heading.H3>
            <Heading.H4>Heading 4</Heading.H4>
            <Heading.H5>Heading 5</Heading.H5>
            <Heading.H6>Heading 6</Heading.H6>
          </Column>

          <Column stl={{ gap: '$6' }}>
            <SectionTitle stl={{ mt: '$0' }}>Text</SectionTitle>
            <Text>Default body text</Text>
            <Text size="xs">Extra small</Text>
            <Text size="sm">Small</Text>
            <Text size="lg">Large</Text>
            <Text size="xl">Extra large</Text>
            <Text tone="muted">Muted tone</Text>
            <Text tone="primary">Primary tone</Text>
            <Text tone="success">Success tone</Text>
            <Text tone="warning">Warning tone</Text>
            <Text tone="danger">Danger tone</Text>
            <Text weight="bold">Bold weight</Text>
          </Column>

          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Other</SectionTitle>
            <Text.Small>Small text element</Text.Small>
            <Text.Code>code snippet</Text.Code>
            <InlineCode>inline code</InlineCode>
            <Blockquote>A blockquote element with italic styling and a left border.</Blockquote>
          </Column>
        </ColumnRow>
      </Card.Content>
    </Card>
  )
}
