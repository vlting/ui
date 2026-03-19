import { Button, ButtonGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { DemoCard, SectionHeading, SectionTitle, type SectionProps } from './shared'

const ColumnRow = styled('div', {
  display: 'flex', gap: '$24', overflowX: 'auto',
}, { name: 'ColumnRow' })

const Column = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12', flex: '1',
}, { name: 'Column' })

export function ButtonGroupSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="ButtonGroup">
      <SectionHeading>ButtonGroup</SectionHeading>
      <ColumnRow>
        <Column>
          <SectionTitle>Horizontal (default)</SectionTitle>
          <ButtonGroup aria-label="Actions">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Column>

        <Column>
          <SectionTitle>Vertical</SectionTitle>
          <ButtonGroup orientation="vertical" aria-label="Vertical actions" stl={{ maxWidth: '$menuMin' }}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Column>

        <Column>
          <SectionTitle>Mixed variants</SectionTitle>
          <ButtonGroup aria-label="Mixed">
            <Button variant="solid">Save</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="ghost">Reset</Button>
          </ButtonGroup>
        </Column>
      </ColumnRow>
    </DemoCard>
  )
}
