import { Alert } from '@vlting/ui'
import { useState } from 'react'

import {
  ALERT_THEMES, ALERT_VARIANTS,
  AlertTriangleIcon, CheckCircleIcon, DemoCard, ErrorCircleIcon, InfoCircleIcon,
  SectionHeading, StackY, ToggleBar, VariantToggle,
  type SectionProps,
} from './shared'

const ELEVATIONS = ['flat', 'raised'] as const

export function AlertSection({ sectionRef }: SectionProps) {
  const [alertVariant, setAlertVariant] = useState<typeof ALERT_VARIANTS[number]>('outline')
  const [alertElevation, setAlertElevation] = useState<typeof ELEVATIONS[number]>('flat')

  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Alert">
      <SectionHeading>Alert</SectionHeading>
      <ToggleBar>
        <VariantToggle options={ALERT_VARIANTS} value={alertVariant} onChange={setAlertVariant} />
        <VariantToggle options={ELEVATIONS} value={alertElevation} onChange={setAlertElevation} />
      </ToggleBar>
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
