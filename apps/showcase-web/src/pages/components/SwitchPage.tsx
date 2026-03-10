import { Switch } from '@vlting/ui/components'
import { useState } from 'react'
import { DemoCard, DemoRow, Section } from '../../components/Section'

export function SwitchPage() {
  const [on, setOn] = useState(false)

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Switch</h1>

      <Section title="Default">
        <DemoCard label="Basic switch" testId="switch-default">
          <DemoRow>
            <Switch aria-label="Toggle setting" checked={on} onCheckedChange={setOn} />
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="States">
        <DemoCard label="Switch states" testId="switch-states">
          <DemoRow>
            <Switch aria-label="On state" checked={true} onCheckedChange={() => {}} />
            <Switch aria-label="Off state" checked={false} onCheckedChange={() => {}} />
            <Switch
              aria-label="Disabled off"
              disabled
              checked={false}
              onCheckedChange={() => {}}
            />
            <Switch
              aria-label="Disabled on"
              disabled
              checked={true}
              onCheckedChange={() => {}}
            />
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Sizes">
        <DemoCard label="Switch sizes" testId="switch-sizes">
          <DemoRow>
            <Switch
              aria-label="Small"
              size="sm"
              checked={true}
              onCheckedChange={() => {}}
            />
            <Switch
              aria-label="Medium"
              size="md"
              checked={true}
              onCheckedChange={() => {}}
            />
            <Switch
              aria-label="Large"
              size="lg"
              checked={true}
              onCheckedChange={() => {}}
            />
          </DemoRow>
        </DemoCard>
      </Section>
    </div>
  )
}
