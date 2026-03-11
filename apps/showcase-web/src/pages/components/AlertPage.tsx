import { Alert } from '@vlting/ui/components'
import { DemoCard, Section } from '../../components/Section'

export function AlertPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Alert</h1>

      <Section title="Default">
        <DemoCard label="Default alert" testId="alert-default">
          <Alert.Root variant="default">
            <Alert.Title>Heads up!</Alert.Title>
            <Alert.Description>
              You can add components to your app using the CLI.
            </Alert.Description>
          </Alert.Root>
        </DemoCard>
      </Section>

      <Section title="Destructive">
        <DemoCard label="Destructive alert" testId="alert-destructive">
          <Alert.Root variant="destructive">
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>
              Your session has expired. Please log in again.
            </Alert.Description>
          </Alert.Root>
        </DemoCard>
      </Section>
    </div>
  )
}
