import { Progress } from '@vlting/ui'
import { useEffect, useState } from 'react'

import {
  DemoCard, PROGRESS_SIZES, SectionHeading, StackY,
  type SectionProps,
} from './shared'

export function ProgressSection({ sectionRef }: SectionProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 10)), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Progress">
      <SectionHeading>Progress</SectionHeading>
      <StackY>
        {PROGRESS_SIZES.map((size) => (
          <Progress key={size} value={progress} size={size} aria-label={`${size} ${progress}%`} />
        ))}
      </StackY>
    </DemoCard>
  )
}
