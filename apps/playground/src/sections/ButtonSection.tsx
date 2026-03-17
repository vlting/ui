import { Button } from '@vlting/ui'

import {
  ButtonRow, DemoCard, Section, SectionHeading, SectionTitle,
  SIZES, THEMES, VARIANTS,
  type SectionProps,
} from './shared'

export function ButtonSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard ref={sectionRef} data-section="Button">
      <SectionHeading>Button</SectionHeading>
      <SectionTitle>Themes</SectionTitle>
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
              {...(s !== 'icon' && { stl: { minWidth: '$80' } })}
            >
              {s === 'icon' ? '★' : s}
            </Button>
          ))}
        </ButtonRow>
      </Section>
    </DemoCard>
  )
}
