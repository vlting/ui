import { Alert, Button } from '@vlting/ui'
import { useState } from 'react'

import {
  ALERT_THEMES, ALERT_VARIANTS,
  AlertTriangleIcon, ButtonRow, CheckCircleIcon, DemoCard, ErrorCircleIcon, InfoCircleIcon,
  SectionHeading, StackY,
  type SectionProps,
} from './shared'

const ELEVATIONS = ['flat', 'raised'] as const

export function AlertSection({ sectionRef }: SectionProps) {
  const [alertVariant, setAlertVariant] = useState<typeof ALERT_VARIANTS[number]>('subtle')
  const [alertElevation, setAlertElevation] = useState<typeof ELEVATIONS[number]>('flat')

  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Alert">
      <SectionHeading>Alert</SectionHeading>
      <ButtonRow stl={{ mb: '$16' }}>
        {ALERT_VARIANTS.map((v) => (
          <Button
            key={v}
            size="xs"
            theme="neutral"
            variant={alertVariant === v ? 'subtle' : 'ghost'}
            onClick={() => setAlertVariant(v)}
            aria-pressed={alertVariant === v}
          >
            {v}
          </Button>
        ))}
        {ELEVATIONS.map((e) => (
          <Button
            key={e}
            size="xs"
            theme="neutral"
            variant={alertElevation === e ? 'subtle' : 'ghost'}
            onClick={() => setAlertElevation(e)}
            aria-pressed={alertElevation === e}
          >
            {e}
          </Button>
        ))}
      </ButtonRow>
      <StackY>
        {ALERT_THEMES.map((theme) => {
          const icon =
            theme === 'success' ? <CheckCircleIcon /> :
            theme === 'warning' ? <AlertTriangleIcon /> :
            theme === 'error' ? <ErrorCircleIcon /> :
            theme === 'info' ? <InfoCircleIcon /> :
            null
          return (
            <Alert.Root key={theme} theme={theme} variant={alertVariant} elevation={alertElevation}>
              {icon && <Alert.Icon>{icon}</Alert.Icon>}
              <Alert.Content>
                <Alert.Title>{theme.charAt(0).toUpperCase() + theme.slice(1)}</Alert.Title>
                <Alert.Description>This is a {theme} alert — {alertVariant}.</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )
        })}
      </StackY>
    </DemoCard>
  )
}
