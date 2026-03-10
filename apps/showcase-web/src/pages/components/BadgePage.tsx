import { Section, DemoCard, DemoRow } from '../../components/Section'
import { Badge } from '@vlting/ui/primitives'

export function BadgePage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Badge
      </h1>

      <Section title="Variants">
        <DemoCard label="Badge variants" testId="badge-variants">
          <DemoRow>
            <Badge variant="default">Default</Badge>
            <Badge variant="solid">Solid</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="subtle">Subtle</Badge>
          </DemoRow>
        </DemoCard>
      </Section>
    </div>
  )
}
