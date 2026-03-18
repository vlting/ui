import { Button, ButtonGroup } from '@vlting/ui'

import { DemoCard, SectionHeading, SectionTitle, StackY, type SectionProps } from './shared'

export function ButtonGroupSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="ButtonGroup">
      <SectionHeading>ButtonGroup</SectionHeading>
      <StackY>
        <SectionTitle>Horizontal (default)</SectionTitle>
        <ButtonGroup aria-label="Actions">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>

        <SectionTitle>Vertical</SectionTitle>
        <ButtonGroup orientation="vertical" aria-label="Vertical actions">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>

        <SectionTitle>Mixed variants</SectionTitle>
        <ButtonGroup aria-label="Mixed">
          <Button variant="solid">Save</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Reset</Button>
        </ButtonGroup>
      </StackY>
    </DemoCard>
  )
}
