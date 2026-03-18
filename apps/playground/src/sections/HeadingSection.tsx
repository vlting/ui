import { Heading } from '@vlting/ui'

import { DemoCard, SectionHeading, StackY, type SectionProps } from './shared'

export function HeadingSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Heading">
      <SectionHeading>Heading</SectionHeading>
      <StackY>
        <Heading.H1>Heading 1</Heading.H1>
        <Heading.H2>Heading 2</Heading.H2>
        <Heading.H3>Heading 3</Heading.H3>
        <Heading.H4>Heading 4</Heading.H4>
        <Heading.H5>Heading 5</Heading.H5>
        <Heading.H6>Heading 6</Heading.H6>
      </StackY>
    </DemoCard>
  )
}
