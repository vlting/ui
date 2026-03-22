import { useState } from 'react'
import { Button, Card, Field, Input, Sheet, Text } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, ButtonRow, type SectionProps } from './shared'

const ScrollContent = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$16', p: '$16',
}, { name: 'ScrollContent' })

const FormStack = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$16', p: '$16',
}, { name: 'FormStack' })

export function SheetSection({ sectionRef }: SectionProps) {
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [scrollOpen, setScrollOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Sheet">
      <Card.Header>
        <Card.Title>Sheet</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Default</SectionTitle>
          <ButtonRow>
            <Sheet.Root open={defaultOpen} onOpenChange={setDefaultOpen}>
              <Button theme="primary" variant="outline" onClick={() => setDefaultOpen(true)}>Open sheet</Button>
              <Sheet.Content>
                <Sheet.Handle />
                <Sheet.Header>
                  <Sheet.Title>Notifications</Sheet.Title>
                  <Sheet.Description>Review your recent notifications.</Sheet.Description>
                </Sheet.Header>
                <ScrollContent>
                  <Text>You have 3 unread messages and 2 pending invites. Check your inbox for details.</Text>
                </ScrollContent>
                <Sheet.Footer>
                  <Button theme="neutral" variant="outline" onClick={() => setDefaultOpen(false)}>Dismiss</Button>
                  <Button theme="primary" variant="solid" onClick={() => setDefaultOpen(false)}>View all</Button>
                </Sheet.Footer>
              </Sheet.Content>
            </Sheet.Root>
          </ButtonRow>

          <SectionTitle stl={{ mt: '$24' }}>Scrollable content</SectionTitle>
          <ButtonRow>
            <Sheet.Root open={scrollOpen} onOpenChange={setScrollOpen}>
              <Button theme="secondary" variant="outline" onClick={() => setScrollOpen(true)}>Terms of service</Button>
              <Sheet.Content>
                <Sheet.Handle />
                <Sheet.Header>
                  <Sheet.Title>Terms of Service</Sheet.Title>
                  <Sheet.Description>Please review the following terms carefully.</Sheet.Description>
                </Sheet.Header>
                <ScrollContent>
                  <Text>1. Acceptance of Terms. By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.</Text>
                  <Text>2. Use License. Permission is granted to temporarily use this service for personal, non-commercial transitory viewing only.</Text>
                  <Text>3. Disclaimer. The materials on this service are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.</Text>
                  <Text>4. Limitations. In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on this service.</Text>
                  <Text>5. Accuracy of Materials. The materials appearing on this service could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current.</Text>
                  <Text>6. Links. We have not reviewed all of the sites linked to this service and are not responsible for the contents of any such linked site.</Text>
                  <Text>7. Modifications. We may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the then current version of these terms.</Text>
                </ScrollContent>
                <Sheet.Footer>
                  <Button theme="neutral" variant="outline" onClick={() => setScrollOpen(false)}>Decline</Button>
                  <Button theme="primary" variant="solid" onClick={() => setScrollOpen(false)}>Accept</Button>
                </Sheet.Footer>
              </Sheet.Content>
            </Sheet.Root>
          </ButtonRow>

          <SectionTitle stl={{ mt: '$24' }}>With form</SectionTitle>
          <ButtonRow>
            <Sheet.Root open={formOpen} onOpenChange={setFormOpen}>
              <Button theme="neutral" variant="outline" onClick={() => setFormOpen(true)}>Add address</Button>
              <Sheet.Content>
                <Sheet.Handle />
                <Sheet.Header>
                  <Sheet.Title>Shipping address</Sheet.Title>
                  <Sheet.Description>Enter your shipping details below.</Sheet.Description>
                </Sheet.Header>
                <FormStack>
                  <Field.Root required>
                    <Field.Label>Full name</Field.Label>
                    <Field.Control>
                      <Input placeholder="Jane Doe" />
                    </Field.Control>
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Street address</Field.Label>
                    <Field.Control>
                      <Input placeholder="123 Main St" />
                    </Field.Control>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>City</Field.Label>
                    <Field.Control>
                      <Input placeholder="San Francisco" />
                    </Field.Control>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Zip code</Field.Label>
                    <Field.Control>
                      <Input placeholder="94102" />
                    </Field.Control>
                  </Field.Root>
                </FormStack>
                <Sheet.Footer>
                  <Button theme="neutral" variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
                  <Button theme="primary" variant="solid" onClick={() => setFormOpen(false)}>Save address</Button>
                </Sheet.Footer>
              </Sheet.Content>
            </Sheet.Root>
          </ButtonRow>
        </StackY>
      </Card.Content>
    </Card>
  )
}
