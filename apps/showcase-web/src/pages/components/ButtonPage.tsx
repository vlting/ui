import { Button, ButtonGroup } from '@vlting/ui/components'
import { DemoCard, DemoRow, Section } from '../../components/Section'

export function ButtonPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Button</h1>

      <Section title="Variants">
        <DemoCard label="Button variants" testId="button-variants">
          <DemoRow>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Sizes">
        <DemoCard label="Button sizes" testId="button-sizes">
          <DemoRow>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="States">
        <DemoCard label="Button states" testId="button-states">
          <DemoRow>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="ButtonGroup">
        <DemoCard label="Grouped buttons" testId="button-group">
          <ButtonGroup.Root>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup.Root>
        </DemoCard>
      </Section>
    </div>
  )
}
