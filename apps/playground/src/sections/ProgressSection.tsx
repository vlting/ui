import { useState, useEffect } from 'react'
import { Button, Card, Progress, ToggleGroup } from '@vlting/ui'

import {
  PROGRESS_SIZES, StackY,
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
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Card.Title>Progress</Card.Title>
        <ToggleGroup
          type="exclusive"
          value={[theme]}
          onValueChange={v => v[0] && setTheme(v[0] as ProgressTheme)}
          aria-label="Theme"
        >
          {PROGRESS_THEMES.map(t => (
            <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
          ))}
        </ToggleGroup>
      </Card.Header>
      <Card.Content>
        <StackY>
          {PROGRESS_SIZES.map((size) => (
            <Progress key={size} value={progress} size={size} theme={theme} aria-label={`${size} ${theme} ${progress}%`} />
          ))}
        </StackY>
      </Card.Content>
    </Card>
  )
}
