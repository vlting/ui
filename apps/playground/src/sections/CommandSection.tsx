import { useState } from 'react'
import { Button, Card, Command, Dialog } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, ButtonRow, type SectionProps } from './shared'

const CommandWrapper = styled('div', {
  maxWidth: '480px',
  width: '100%',
}, { name: 'CommandWrapper' })

export function CommandSection({ sectionRef }: SectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Command">
      <Card.Header>
        <Card.Title>Command</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Standalone</SectionTitle>
          <CommandWrapper>
            <Command.Root>
              <Command.Input placeholder="Type a command or search..." />
              <Command.List>
                <Command.Group heading="Suggestions">
                  <Command.Item>Calendar</Command.Item>
                  <Command.Item>Search emoji</Command.Item>
                  <Command.Item>Calculator</Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Settings">
                  <Command.Item>Profile</Command.Item>
                  <Command.Item>Billing</Command.Item>
                  <Command.Item>Preferences</Command.Item>
                </Command.Group>
              </Command.List>
              <Command.Empty>No results found.</Command.Empty>
            </Command.Root>
          </CommandWrapper>

          <SectionTitle stl={{ mt: '$24' }}>Inside dialog</SectionTitle>
          <ButtonRow>
            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
              <Button theme="neutral" variant="outline" onClick={() => setDialogOpen(true)}>
                Open command palette
              </Button>
              <Dialog.Content size="md">
                <Command.Root>
                  <Command.Input placeholder="Type a command..." />
                  <Command.List>
                    <Command.Group heading="Actions">
                      <Command.Item onSelect={() => setDialogOpen(false)}>New file</Command.Item>
                      <Command.Item onSelect={() => setDialogOpen(false)}>Open project</Command.Item>
                      <Command.Item onSelect={() => setDialogOpen(false)}>Run build</Command.Item>
                    </Command.Group>
                    <Command.Separator />
                    <Command.Group heading="Navigation">
                      <Command.Item onSelect={() => setDialogOpen(false)}>Go to settings</Command.Item>
                      <Command.Item onSelect={() => setDialogOpen(false)}>Go to dashboard</Command.Item>
                      <Command.Item onSelect={() => setDialogOpen(false)}>Go to docs</Command.Item>
                    </Command.Group>
                  </Command.List>
                  <Command.Empty>No results found.</Command.Empty>
                </Command.Root>
              </Dialog.Content>
            </Dialog.Root>
          </ButtonRow>
        </StackY>
      </Card.Content>
    </Card>
  )
}
