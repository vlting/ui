import { Button, Card } from '@vlting/ui'

import {
  ButtonRow, Section, SectionTitle,
  SIZES, THEMES, VARIANTS,
  type SectionProps,
} from './shared'

export function ButtonSection({ sectionRef }: SectionProps) {
  return (
    <Card ref={sectionRef} data-section="Button">
      <Card.Header>
        <Card.Title>Button</Card.Title>
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
                  size="md"
                  stl={{ minWidth: '$80' }}
                >
                  {variant}
                </Button>
              ))}
              <Button theme={theme} variant="solid" size="md" disabled stl={{ minWidth: '$80' }}>
                disabled
              </Button>
              <Button theme={theme} variant="solid" size="md" loading stl={{ minWidth: '$80' }}>
                loading
              </Button>
              <Button theme={theme} variant="solid" size="icon">
                ★
              </Button>
            </ButtonRow>
          </Section>
        ))}

        <Section>
          <SectionTitle>Size</SectionTitle>
          <ButtonRow>
            {SIZES.map((s) => (
              <Button
                key={s}
                theme="primary"
                variant="solid"
                size={s}
              >
                {s === 'icon' ? '★' : s}
              </Button>
            ))}
          </ButtonRow>
        </Section>

        <Section>
          <SectionTitle>Pill</SectionTitle>
          <ButtonRow>
            {VARIANTS.map((variant) => (
              <Button
                key={variant}
                pill
                theme="primary"
                variant={variant}
                size="md"
                stl={{ minWidth: '$80' }}
              >
                {variant}
              </Button>
            ))}
            <Button pill size="icon">★</Button>
          </ButtonRow>
        </Section>
      </Card.Content>
    </Card>
  )
}
