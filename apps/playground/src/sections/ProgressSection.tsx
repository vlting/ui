import { useState, useEffect } from 'react'
import { Button, Card, Progress, ToggleGroup } from '@vlting/ui'

import {
  Column, Columns, SectionTitle,
  type SectionProps,
} from './shared'

const PROGRESS_THEMES = ['primary', 'secondary', 'neutral'] as const
type ProgressTheme = typeof PROGRESS_THEMES[number]

export function ProgressSection({ sectionRef }: SectionProps) {
  const [progress, setProgress] = useState(0)
  const [theme, setTheme] = useState<ProgressTheme>('primary')

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 10)), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <Card ref={sectionRef} data-section="Progress">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Progress</Card.Title>
        <ToggleGroup
          type="exclusive"
          value={[theme]}
          onValueChange={v => v[0] && setTheme(v[0] as ProgressTheme)}
          aria-label="Progress theme"
        >
          {PROGRESS_THEMES.map(t => (
            <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
          ))}
        </ToggleGroup>
      </Card.Header>
      <Card.Content>
        <Columns>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>sm</SectionTitle>
            <Progress value={progress} size="sm" theme={theme} aria-label={`sm ${theme} ${progress}%`} />
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>md</SectionTitle>
            <Progress value={progress} size="md" theme={theme} aria-label={`md ${theme} ${progress}%`} />
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>lg</SectionTitle>
            <Progress value={progress} size="lg" theme={theme} aria-label={`lg ${theme} ${progress}%`} />
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
