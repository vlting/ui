import { useState } from 'react'
import { Button, Card, Toggle, ToggleGroup } from '@vlting/ui'

import {
  ButtonRow, ControlRow, Section, SectionTitle,
  SIZES, THEMES, VARIANTS,
  type SectionProps,
} from './shared'

type Size = typeof SIZES[number]

export function ButtonSection({ sectionRef }: SectionProps) {
  const [size, setSize] = useState<Size>('md')
  const [pill, setPill] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Button">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Button</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="Button size"
          >
            {SIZES.map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
          <Toggle size="md" variant="outline" theme="neutral" pressed={pill} onPressedChange={setPill}>pill</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <SectionTitle stl={{ mt: '$0' }}>Themes</SectionTitle>
        {THEMES.map((theme) => (
          <Section key={theme}>
            <ButtonRow>
              {VARIANTS.map((variant) => (
                <Button
                  key={variant}
                  theme={theme}
                  variant={variant}
                  size={size}
                  pill={pill || undefined}
                >
                  {variant}
                </Button>
              ))}
              <Button theme={theme} variant="solid" size={size} pill={pill || undefined} disabled stl={{ minWidth: '$80' }}>
                disabled
              </Button>
              <Button theme={theme} variant="solid" size={size} pill={pill || undefined} loading stl={{ minWidth: '$80' }}>
                loading
              </Button>
              <Button theme={theme} variant="solid" size={size} pill={pill || undefined} square>
                ★
              </Button>
            </ButtonRow>
          </Section>
        ))}
      </Card.Content>
    </Card>
  )
}
