import { useState } from 'react'
import { Section, DemoCard, DemoRow } from '../../components/Section'
import { Checkbox } from '@vlting/ui/components'

export function CheckboxPage() {
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState<boolean | 'indeterminate'>('indeterminate')

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Checkbox
      </h1>

      <Section title="Default">
        <DemoCard label="Basic checkbox" testId="checkbox-default">
          <DemoRow>
            <Checkbox.Root checked={checked} onCheckedChange={(v) => setChecked(v === true)}>
              Accept terms
            </Checkbox.Root>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="States">
        <DemoCard label="Checkbox states" testId="checkbox-states">
          <DemoRow>
            <Checkbox.Root checked={true} onCheckedChange={() => {}}>
              Checked
            </Checkbox.Root>
            <Checkbox.Root checked={false} onCheckedChange={() => {}}>
              Unchecked
            </Checkbox.Root>
            <Checkbox.Root
              checked={indeterminate}
              onCheckedChange={(v) => setIndeterminate(v)}
            >
              Indeterminate
            </Checkbox.Root>
            <Checkbox.Root disabled checked={false} onCheckedChange={() => {}}>
              Disabled
            </Checkbox.Root>
            <Checkbox.Root disabled checked={true} onCheckedChange={() => {}}>
              Disabled checked
            </Checkbox.Root>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Sizes">
        <DemoCard label="Checkbox sizes" testId="checkbox-sizes">
          <DemoRow>
            <Checkbox.Root size="sm" checked={true} onCheckedChange={() => {}}>
              Small
            </Checkbox.Root>
            <Checkbox.Root size="md" checked={true} onCheckedChange={() => {}}>
              Medium
            </Checkbox.Root>
            <Checkbox.Root size="lg" checked={true} onCheckedChange={() => {}}>
              Large
            </Checkbox.Root>
          </DemoRow>
        </DemoCard>
      </Section>
    </div>
  )
}
