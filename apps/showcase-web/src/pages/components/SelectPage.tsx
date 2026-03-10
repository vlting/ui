import { Section, DemoCard, DemoRow } from '../../components/Section'
import { Select } from '@vlting/ui/components'

export function SelectPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Select
      </h1>

      <Section title="Default">
        <DemoCard label="Select with options" testId="select-default">
          <div style={{ maxWidth: 280 }}>
            <Select aria-label="Fruit selector" defaultValue="" placeholder="Choose a fruit...">
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="cherry">Cherry</Select.Item>
              <Select.Item value="mango">Mango</Select.Item>
            </Select>
          </div>
        </DemoCard>
      </Section>

      <Section title="Disabled">
        <DemoCard label="Disabled select" testId="select-disabled">
          <div style={{ maxWidth: 280 }}>
            <Select aria-label="Disabled selector" placeholder="Cannot interact" disabled>
              <Select.Item value="a">Option A</Select.Item>
              <Select.Item value="b">Option B</Select.Item>
            </Select>
          </div>
        </DemoCard>
      </Section>
    </div>
  )
}
