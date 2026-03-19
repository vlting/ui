import { useState } from 'react'
import { Alert, Button, Card, ToggleGroup } from '@vlting/ui'

import {
  ALERT_THEMES, ALERT_VARIANTS,
  AlertTriangleIcon, CheckCircleIcon, ErrorCircleIcon, InfoCircleIcon,
  StackY,
  type SectionProps,
} from './shared'

const ELEVATIONS = ['flat', 'raised'] as const

export function AlertSection({ sectionRef }: SectionProps) {
  const [alertVariant, setAlertVariant] = useState<typeof ALERT_VARIANTS[number]>('outline')
  const [alertElevation, setAlertElevation] = useState<typeof ELEVATIONS[number]>('flat')

  return (
    <Card ref={sectionRef} data-section="Alert">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Alert</Card.Title>
        <div style={{ display: 'flex', gap: 8 }}>
          <ToggleGroup
            type="exclusive"
            value={[alertVariant]}
            onValueChange={v => v[0] && setAlertVariant(v[0] as typeof alertVariant)}
            aria-label="Variant"
          >
            {ALERT_VARIANTS.map(v => (
              <Button key={v} value={v} size="md" variant="outline" theme="neutral">{v}</Button>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="exclusive"
            value={[alertElevation]}
            onValueChange={v => v[0] && setAlertElevation(v[0] as typeof alertElevation)}
            aria-label="Elevation"
          >
            {ELEVATIONS.map(e => (
              <Button key={e} value={e} size="md" variant="outline" theme="neutral">{e}</Button>
            ))}
          </ToggleGroup>
        </div>
      </Card.Header>
      <Card.Content>
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
      </Card.Content>
    </Card>
  )
}
