import { useState } from 'react'
import { Card, Collapsible, Toggle } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { CardText, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

export function CollapsibleSection({ sectionRef }: SectionProps) {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Collapsible">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Collapsible</Card.Title>
        <ControlRow>
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Read more</SectionTitle>
          <Collapsible.Root disabled={disabled} open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger>About the registry</Collapsible.Trigger>
            <Collapsible.Content>
              <CardText>
                The vlt serverless registry is a next-generation package hosting solution
                built on edge infrastructure. Packages are served from the nearest point of
                presence, reducing install times by up to 10x compared to traditional registries.
                It supports granular access controls, package signing, and real-time vulnerability
                scanning out of the box.
              </CardText>
            </Collapsible.Content>
          </Collapsible.Root>
          <StatusLabel>open: {String(open)}</StatusLabel>

          <SectionTitle>Default open</SectionTitle>
          <Collapsible.Root defaultOpen>
            <Collapsible.Trigger>Advanced settings</Collapsible.Trigger>
            <Collapsible.Content>
              <CardText>
                Cache directory, registry mirrors, network timeouts, and retry policies
                can be configured per-project or globally. These settings are rarely needed
                but available when you need fine-grained control over package resolution.
              </CardText>
            </Collapsible.Content>
          </Collapsible.Root>

          <SectionTitle>No indicator</SectionTitle>
          <Collapsible.Root>
            <Collapsible.Trigger indicator={false}>Show release notes</Collapsible.Trigger>
            <Collapsible.Content>
              <CardText>
                v2.0 introduces workspace-aware dependency deduplication, a new lockfile
                format with content-addressable integrity, and native support for
                conditional exports resolution.
              </CardText>
            </Collapsible.Content>
          </Collapsible.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
