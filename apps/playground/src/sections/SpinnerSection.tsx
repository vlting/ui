import { Spinner } from '@vlting/stl-react'

import {
  ButtonRow, DarkStage, DemoCard, GridCell, GridLabel,
  SectionHeading, SectionTitle, SPINNER_SIZES, StackY,
  type SectionProps,
} from './shared'

export function SpinnerSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Spinner">
      <SectionHeading>Spinner</SectionHeading>
      <StackY stl={{ gap: '$16' }}>
        <ButtonRow stl={{ gap: '$16' }}>
          <StackY stl={{ flex: '1', bg: '$background1', radius: '$3', p: '$24', gap: '$0' }}>
            <SectionTitle stl={{ textTransform: 'none', mb: '$0' }}>primary</SectionTitle>
            <ButtonRow stl={{ justifyContent: 'space-evenly', alignItems: 'baseline' }}>
              {SPINNER_SIZES.map((size) => (
                <GridCell key={size}>
                  <Spinner theme="primary" size={size} />
                  <GridLabel>{size}</GridLabel>
                </GridCell>
              ))}
            </ButtonRow>
          </StackY>
          <StackY stl={{ flex: '1', bg: '$background1', radius: '$3', p: '$24', gap: '$0' }}>
            <SectionTitle stl={{ textTransform: 'none', mb: '$0' }}>secondary</SectionTitle>
            <ButtonRow stl={{ justifyContent: 'space-evenly', alignItems: 'baseline' }}>
              {SPINNER_SIZES.map((size) => (
                <GridCell key={size}>
                  <Spinner theme="secondary" size={size} />
                  <GridLabel>{size}</GridLabel>
                </GridCell>
              ))}
            </ButtonRow>
          </StackY>
        </ButtonRow>
        <ButtonRow stl={{ gap: '$16' }}>
          <StackY stl={{ flex: '1', bg: '$background1', radius: '$3', p: '$24', gap: '$0' }}>
            <SectionTitle stl={{ textTransform: 'none', mb: '$0' }}>neutralMax</SectionTitle>
            <ButtonRow stl={{ justifyContent: 'space-evenly', alignItems: 'baseline' }}>
              {SPINNER_SIZES.map((size) => (
                <GridCell key={size}>
                  <Spinner theme="neutralMax" size={size} />
                  <GridLabel>{size}</GridLabel>
                </GridCell>
              ))}
            </ButtonRow>
          </StackY>
          <DarkStage stl={{ flex: '1', gap: '$0' }}>
            <SectionTitle stl={{ color: '$backgroundText10', textTransform: 'none', mb: '$0' }}>neutralMin</SectionTitle>
            <ButtonRow stl={{ justifyContent: 'space-evenly', alignItems: 'baseline' }}>
              {SPINNER_SIZES.map((size) => (
                <GridCell key={size}>
                  <Spinner theme="neutralMin" size={size} />
                  <GridLabel stl={{ color: '$backgroundText10' }}>{size}</GridLabel>
                </GridCell>
              ))}
            </ButtonRow>
          </DarkStage>
        </ButtonRow>
      </StackY>
    </DemoCard>
  )
}
