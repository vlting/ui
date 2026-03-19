import { Card, Progress } from '@vlting/ui'
import { useEffect, useState } from 'react'

import {
  PROGRESS_SIZES, StackY,
  type SectionProps,
} from './shared'

export function ProgressSection({ sectionRef }: SectionProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 10)), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <Card ref={sectionRef} data-section="Progress">
      <Card.Header>
        <Card.Title>Progress</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          {PROGRESS_SIZES.map((size) => (
            <Progress key={size} value={progress} size={size} aria-label={`${size} ${progress}%`} />
          ))}
        </StackY>
      </Card.Content>
    </Card>
  )
}
