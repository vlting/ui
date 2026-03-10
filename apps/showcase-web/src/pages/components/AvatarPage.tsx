import { Avatar } from '@vlting/ui/components'
import { DemoCard, DemoRow, Section } from '../../components/Section'

export function AvatarPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Avatar</h1>

      <Section title="Sizes">
        <DemoCard label="Avatar sizes" testId="avatar-sizes">
          <DemoRow>
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
            <Avatar size="xl" fallback="XL" />
          </DemoRow>
        </DemoCard>
      </Section>
    </div>
  )
}
