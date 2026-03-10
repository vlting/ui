import { Progress } from '@vlting/ui/components'
import { DemoCard, Section } from '../../components/Section'

export function ProgressPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Progress</h1>

      <Section title="Values">
        <DemoCard label="Progress values" testId="progress-values">
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}
          >
            <Progress value={25} aria-label="25%" />
            <Progress value={50} aria-label="50%" />
            <Progress value={75} aria-label="75%" />
            <Progress value={100} aria-label="100%" />
          </div>
        </DemoCard>
      </Section>
    </div>
  )
}
