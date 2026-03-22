import { useState } from 'react'
import { AlertDialog, Button, Card, Dialog, Field, Input, Text, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ControlRow, SectionTitle, StackY, ButtonRow, type SectionProps } from './shared'

type DialogSize = 'sm' | 'md' | 'lg'

const FormStack = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$16',
}, { name: 'FormStack' })

export function DialogSection({ sectionRef }: SectionProps) {
  const [size, setSize] = useState<DialogSize>('md')
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Dialog">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Dialog</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as DialogSize)}
            aria-label="Dialog size"
          >
            <Button value="sm" size="md" variant="outline" theme="neutral">sm</Button>
            <Button value="md" size="md" variant="outline" theme="neutral">md</Button>
            <Button value="lg" size="md" variant="outline" theme="neutral">lg</Button>
          </ToggleGroup>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Default</SectionTitle>
          <ButtonRow>
            <Dialog.Root open={defaultOpen} onOpenChange={setDefaultOpen}>
              <Button theme="primary" variant="outline" onClick={() => setDefaultOpen(true)}>Open dialog</Button>
              <Dialog.Content size={size}>
                <Dialog.Close />
                <Dialog.Header>
                  <Dialog.Title>Edit profile</Dialog.Title>
                  <Dialog.Description>
                    Make changes to your profile here. Click save when you are done.
                  </Dialog.Description>
                </Dialog.Header>
                <Text>
                  Your profile information is visible to other team members. Keep it up to date so people can reach you.
                </Text>
                <Dialog.Footer>
                  <Button theme="neutral" variant="outline" onClick={() => setDefaultOpen(false)}>Cancel</Button>
                  <Button theme="primary" variant="solid" onClick={() => setDefaultOpen(false)}>Save changes</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </ButtonRow>

          <SectionTitle stl={{ mt: '$24' }}>With form</SectionTitle>
          <ButtonRow>
            <Dialog.Root open={formOpen} onOpenChange={setFormOpen}>
              <Button theme="secondary" variant="outline" onClick={() => setFormOpen(true)}>Create project</Button>
              <Dialog.Content size={size}>
                <Dialog.Close />
                <Dialog.Header>
                  <Dialog.Title>New project</Dialog.Title>
                  <Dialog.Description>
                    Add a new project to your workspace.
                  </Dialog.Description>
                </Dialog.Header>
                <FormStack>
                  <Field.Root required>
                    <Field.Label>Project name</Field.Label>
                    <Field.Control>
                      <Input placeholder="my-project" />
                    </Field.Control>
                    <Field.Description>This will be used as the package name.</Field.Description>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Field.Control>
                      <Input placeholder="A brief description" />
                    </Field.Control>
                  </Field.Root>
                </FormStack>
                <Dialog.Footer>
                  <Button theme="neutral" variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
                  <Button theme="primary" variant="solid" onClick={() => setFormOpen(false)}>Create</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </ButtonRow>

          <SectionTitle stl={{ mt: '$24' }}>AlertDialog</SectionTitle>
          <ButtonRow>
            <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
              <Button theme="destructive" variant="outline" onClick={() => setAlertOpen(true)}>Delete project</Button>
              <AlertDialog.Content size="sm">
                <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                <AlertDialog.Description>
                  This action cannot be undone. This will permanently delete the project and all associated data.
                </AlertDialog.Description>
                <AlertDialog.Footer>
                  <AlertDialog.Cancel>
                    <Button theme="neutral" variant="outline">Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button theme="destructive" variant="solid">Delete</Button>
                  </AlertDialog.Action>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </ButtonRow>
        </StackY>
      </Card.Content>
    </Card>
  )
}
