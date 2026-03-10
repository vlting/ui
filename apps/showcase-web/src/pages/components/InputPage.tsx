import { Section, DemoCard, DemoRow } from '../../components/Section'
import { Input } from '@vlting/ui/components'

export function InputPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Input
      </h1>

      <Section title="Default">
        <DemoCard label="Default input" testId="input-default">
          <DemoRow>
            <Input placeholder="Enter text…" />
            <Input label="With label" placeholder="Enter text…" />
            <Input
              label="With helper"
              placeholder="Enter text…"
              helperText="This is helper text"
            />
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="States">
        <DemoCard label="Input states" testId="input-states">
          <DemoRow>
            <Input placeholder="Disabled" disabled />
            <Input
              placeholder="Error state"
              error
              errorMessage="Something went wrong"
            />
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Sizes">
        <DemoCard label="Input sizes" testId="input-sizes">
          <DemoRow>
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
          </DemoRow>
        </DemoCard>
      </Section>
    </div>
  )
}
