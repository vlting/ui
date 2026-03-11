import { Button, Dialog } from '@vlting/ui/components'
import { DemoCard, Section } from '../../components/Section'

export function DialogPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Dialog</h1>

      <Section title="Default">
        <DemoCard label="Dialog with trigger" testId="dialog-trigger">
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Open Dialog</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>
                This is a dialog description. It provides context about the action or
                information being presented.
              </Dialog.Description>
              <Dialog.Footer>
                <Dialog.Close>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Confirm</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </DemoCard>
      </Section>
    </div>
  )
}
