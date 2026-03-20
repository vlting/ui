import { useState } from 'react'
import { Button, ButtonGroup, Card, Slider, Toggle, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { Column, Columns, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

// ─── Shared ─────────────────────────────────────────────────────────────────

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

const ValueLabel = styled('span', {
  fontSize: '$small', fontWeight: '$600', color: '$neutralText3', fontFamily: '$code',
  minWidth: '$40', textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
}, { name: 'ValueLabel' })

const SIZES = ['sm', 'md', 'lg'] as const
type Size = (typeof SIZES)[number]
const THEMES = ['primary', 'secondary', 'neutral'] as const
type SliderTheme = (typeof THEMES)[number]

// ─── Stepper (for Step example) ─────────────────────────────────────────────

const StepperWrap = styled('div', {
  display: 'inline-flex', alignItems: 'stretch',
}, { name: 'StepperWrap' })

const StepInput = styled('input', {
  width: '$64',
  px: '$8',
  py: '$4',
  fontSize: '$small',
  fontFamily: '$code',
  border: '$neutralMin',
  borderTopLeftRadius: '$field',
  borderBottomLeftRadius: '$field',
  borderTopRightRadius: '$0',
  borderBottomRightRadius: '$0',
  bg: '$surface1',
  color: '$neutralText3',
  outline: 'none',
  textAlign: 'center',
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault', zIndex: '1', position: 'relative' },
}, { name: 'StepInput' })

const StepBtnCol = styled('div', {
  display: 'flex', flexDirection: 'column', marginLeft: '-1px',
}, { name: 'StepBtnCol' })

const StepBtn = styled('button', {
  flex: '1',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  px: '$6',
  bg: '$surface2',
  border: '$neutralMin',
  color: '$neutralText3',
  cursor: 'pointer',
  fontSize: '$buttonTiny',
  fontWeight: '$700',
  borderRadius: '$0',
  ':hover': { bg: '$neutral4' },
}, {
  name: 'StepBtn',
  variants: {
    position: {
      top: { borderTopRightRadius: '$field' },
      bottom: { borderBottomRightRadius: '$field', marginTop: '-1px' },
    },
  },
})

// ─── Hue Picker helpers ─────────────────────────────────────────────────────

const HUE_GRADIENT = 'linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))'

const HueGradient = styled('div', {
  width: '100%', height: '100%',
}, { name: 'HueGradient' })

const HueRow = styled('div', {
  display: 'flex', alignItems: 'center', gap: '$12',
}, { name: 'HueRow' })

const Swatch = styled('div', {
  width: '$24', height: '$24', radius: '$round', flexShrink: '0',
}, { name: 'Swatch' })

// ─── Vertical helpers ───────────────────────────────────────────────────────

const VerticalRow = styled('div', {
  display: 'flex', gap: '$24',
}, { name: 'VerticalRow' })

const VerticalWrap = styled('div', {
  height: '$200',
}, { name: 'VerticalWrap' })

// ─── Section ────────────────────────────────────────────────────────────────

export function SliderSection({ sectionRef }: SectionProps) {
  const [size, setSize] = useState<Size>('md')
  const [theme, setTheme] = useState<SliderTheme>('primary')
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState(50)
  const [stepVal, setStepVal] = useState(50)
  const [step, setStep] = useState(10)
  const [hue, setHue] = useState(200)

  return (
    <Card ref={sectionRef} data-section="Slider">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Slider</Card.Title>
        <ControlRow>
          <ToggleGroup type="exclusive" value={[size]} onValueChange={v => v[0] && setSize(v[0] as Size)} aria-label="Slider size">
            {SIZES.map(s => <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>)}
          </ToggleGroup>
          <ToggleGroup type="exclusive" value={[theme]} onValueChange={v => v[0] && setTheme(v[0] as SliderTheme)} aria-label="Slider theme">
            {THEMES.map(t => <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>)}
          </ToggleGroup>
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
        </ControlRow>
      </Card.Header>

      <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$24' }}>
        <Columns>
          {/* Controlled */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Controlled</SectionTitle>
            <StackY>
              <Slider value={value} onValueChange={v => setValue(v as number)} size={size} theme={theme} disabled={disabled} aria-label="Controlled" />
              <ButtonGroup attached aria-label="Adjust value">
                <Button size="sm" variant="outline" theme="neutral" onClick={() => setValue(v => Math.max(0, v - 1))}>&minus;</Button>
                <Button size="sm" variant="outline" theme="neutral" disabled>
                  <ValueLabel>{value}</ValueLabel>
                </Button>
                <Button size="sm" variant="outline" theme="neutral" onClick={() => setValue(v => Math.min(100, v + 1))}>+</Button>
              </ButtonGroup>
            </StackY>
          </Column>

          {/* Step */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Step</SectionTitle>
            <StackY>
              <Slider value={stepVal} onValueChange={v => setStepVal(v as number)} step={step} size={size} theme={theme} disabled={disabled} aria-label="Stepped" />
              <StepperWrap>
                <StepInput
                  type="number"
                  value={step}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const v = Number(e.target.value)
                    if (v >= 1 && v <= 50) setStep(v)
                  }}
                  min={1}
                  max={50}
                  aria-label="Step size"
                />
                <StepBtnCol>
                  <StepBtn position="top" onClick={() => setStep(s => Math.min(50, s + 1))}>+</StepBtn>
                  <StepBtn position="bottom" onClick={() => setStep(s => Math.max(1, s - 1))}>&minus;</StepBtn>
                </StepBtnCol>
              </StepperWrap>
            </StackY>
          </Column>

          {/* Hue Picker */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Hue Picker</SectionTitle>
            <StackY>
              <Slider value={hue} onValueChange={v => setHue(v as number)} min={0} max={360} size={size} theme="neutral" disabled={disabled} aria-label="Hue">
                <HueGradient stl={{ background: HUE_GRADIENT }} />
              </Slider>
              <HueRow>
                <StatusLabel>{hue}&deg;</StatusLabel>
                <Swatch stl={{ bg: `hsl(${hue}, 100%, 50%)` }} />
              </HueRow>
            </StackY>
          </Column>
        </Columns>

        <Columns>
          {/* Range */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Range</SectionTitle>
            <Slider defaultValue={[20, 80]} size={size} theme={theme} disabled={disabled} aria-label="Range" />
          </Column>

          {/* Vertical */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Vertical</SectionTitle>
            <VerticalRow>
              <VerticalWrap>
                <Slider defaultValue={60} orientation="vertical" size={size} theme="primary" disabled={disabled} aria-label="Vertical primary" />
              </VerticalWrap>
              <VerticalWrap>
                <Slider defaultValue={40} orientation="vertical" size={size} theme="secondary" disabled={disabled} aria-label="Vertical secondary" />
              </VerticalWrap>
            </VerticalRow>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
