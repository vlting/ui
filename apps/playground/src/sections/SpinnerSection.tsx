import { Card } from '@vlting/ui'
import { Spinner } from '@vlting/stl-react'

import {
  ButtonRow, DarkStage, GridCell, GridLabel,
  SectionTitle, SPINNER_SIZES, StackY,
  type SectionProps,
} from './shared'

export function SpinnerSection({ sectionRef }: SectionProps) {
  return (
    <Card ref={sectionRef} data-section="Spinner">
      <Card.Header>
        <Card.Title>Spinner</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY stl={{ gap: '$16' }}>
          <ButtonRow stl={{ gap: '$16' }}>
            <StackY stl={{ flex: '1', bg: '$surface1', radius: '$3', p: '$24', gap: '$0' }}>
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
            <StackY stl={{ flex: '1', bg: '$surface1', radius: '$3', p: '$24', gap: '$0' }}>
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
            <StackY stl={{ flex: '1', bg: '$surface1', radius: '$3', p: '$24', gap: '$0' }}>
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
      </Card.Content>
    </Card>
  )
}
