import { useState } from 'react'
import { Button, ButtonGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, DemoCard, Section, SectionHeading, SectionTitle, type SectionProps } from './shared'

const ColumnRow = styled('div', {
  display: 'flex', gap: '$24', overflowX: 'auto',
}, { name: 'ColumnRow' })

const Column = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12', flex: '1',
}, { name: 'Column' })

const StateLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StateLabel' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
  </svg>
)

const MinusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 11H19V13H5V11Z" />
  </svg>
)

const MuteIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.88889 16H2C1.44772 16 1 15.5523 1 15V9C1 8.44772 1.44772 8 2 8H5.88889L11.1834 3.66815C11.3971 3.49809 11.7121 3.53357 11.8822 3.74731C11.9596 3.84507 12 3.96726 12 4.09317V19.9068C12 20.183 11.7761 20.4068 11.5 20.4068C11.3741 20.4068 11.2519 20.3665 11.1541 20.2891L5.88889 16ZM20.4142 12L23.9497 15.5355L22.5355 16.9497L19 13.4142L15.4645 16.9497L14.0503 15.5355L17.5858 12L14.0503 8.46447L15.4645 7.05025L19 10.5858L22.5355 7.05025L23.9497 8.46447L20.4142 12Z" />
  </svg>
)

export function ButtonGroupSection({ sectionRef }: SectionProps) {
  const [alignment, setAlignment] = useState<string[]>(['center'])
  const [formats, setFormats] = useState<string[]>([])

  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="ButtonGroup">
      <SectionHeading>ButtonGroup</SectionHeading>

      {/* ── Basic ────────────────────────────────────── */}
      <ColumnRow>
        <Column>
          <SectionTitle>Horizontal</SectionTitle>
          <ButtonGroup aria-label="Actions">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Column>

        <Column>
          <SectionTitle>Vertical</SectionTitle>
          <ButtonGroup orientation="vertical" aria-label="Vertical actions" stl={{ maxWidth: '$menuMin' }}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Column>

        <Column>
          <SectionTitle>Mixed variants</SectionTitle>
          <ButtonGroup aria-label="Mixed">
            <Button variant="solid">Save</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="ghost">Reset</Button>
          </ButtonGroup>
        </Column>
      </ColumnRow>

      {/* ── Attached ────────────────────────────────── */}
      <Section stl={{ mt: '$32' }}>
        <SectionTitle>Attached</SectionTitle>
        <ColumnRow>
          <Column>
            <SectionTitle>Outline</SectionTitle>
            <ButtonGroup attached aria-label="Outline attached">
              <Button variant="outline">One</Button>
              <Button variant="outline">Two</Button>
              <Button variant="outline">Three</Button>
            </ButtonGroup>
          </Column>
          <Column>
            <SectionTitle>Solid</SectionTitle>
            <ButtonGroup attached aria-label="Solid attached">
              <Button variant="solid">One</Button>
              <Button variant="solid">Two</Button>
              <Button variant="solid">Three</Button>
            </ButtonGroup>
          </Column>
          <Column>
            <SectionTitle>Ghost</SectionTitle>
            <ButtonGroup attached aria-label="Ghost attached">
              <Button variant="ghost">One</Button>
              <Button variant="ghost">Two</Button>
              <Button variant="ghost">Three</Button>
            </ButtonGroup>
          </Column>
        </ColumnRow>
      </Section>

      {/* ── Attached vertical ───────────────────────── */}
      <Section>
        <SectionTitle>Attached vertical</SectionTitle>
        <ButtonRow>
          <ButtonGroup attached orientation="vertical" aria-label="Vertical attached">
            <Button variant="outline" size="icon"><PlusIcon /></Button>
            <Button variant="outline" size="icon"><MuteIcon /></Button>
            <Button variant="outline" size="icon"><MinusIcon /></Button>
          </ButtonGroup>
        </ButtonRow>
      </Section>

      {/* ── Exclusive toggle ────────────────────────── */}
      <Section>
        <SectionTitle>Exclusive toggle</SectionTitle>
        <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
          <ButtonGroup
            attached
            mode="exclusive"
            value={alignment}
            onValueChange={setAlignment}
            aria-label="Text alignment"
          >
            <Button value="left" variant="outline">Left</Button>
            <Button value="center" variant="outline">Center</Button>
            <Button value="right" variant="outline">Right</Button>
          </ButtonGroup>
          <StateLabel>{JSON.stringify(alignment)}</StateLabel>
        </ButtonRow>
      </Section>

      {/* ── Multi-select toggle ─────────────────────── */}
      <Section>
        <SectionTitle>Multi-select toggle</SectionTitle>
        <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
          <ButtonGroup
            attached
            mode="toggle"
            value={formats}
            onValueChange={setFormats}
            aria-label="Text formatting"
          >
            <Button value="bold" variant="outline" stl={{ fontWeight: '$700' }}>B</Button>
            <Button value="italic" variant="outline" stl={{ fontStyle: 'italic' }}>I</Button>
            <Button value="underline" variant="outline" stl={{ textDecoration: 'underline' }}>U</Button>
          </ButtonGroup>
          <StateLabel>{JSON.stringify(formats)}</StateLabel>
        </ButtonRow>
      </Section>
    </DemoCard>
  )
}
