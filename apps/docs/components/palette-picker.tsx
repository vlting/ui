'use client'

import { useMemo, useState } from 'react'
import { styled } from '../../../packages/stl-react/src'

// Inline the palette generation to avoid SSR import issues
const LIGHT_LIGHTNESS = [98, 95, 90, 83, 74, 64, 53, 42, 32, 23, 15, 8]
const DARK_LIGHTNESS = [8, 12, 18, 24, 32, 42, 53, 64, 74, 83, 90, 96]
const SATURATION_CURVE = [0.15, 0.3, 0.5, 0.7, 0.85, 0.95, 1, 0.95, 0.9, 0.85, 0.75, 0.6]

function generatePalette(
  hue: number,
  saturation: number,
  mode: 'light' | 'dark',
): string[] {
  const lightness = mode === 'light' ? LIGHT_LIGHTNESS : DARK_LIGHTNESS
  return lightness.map((l, i) => {
    const s = Math.round(saturation * SATURATION_CURVE[i])
    return `hsl(${hue}, ${s}%, ${l}%)`
  })
}

const STEP_LABELS = [
  'Background',
  'Subtle bg',
  'Element bg',
  'Hovered',
  'Active',
  'Subtle border',
  'Border',
  'Strong border',
  'Solid bg',
  'Solid hover',
  'Low-contrast text',
  'Foreground',
]

const Container = styled('div', { stl: {
  border: '$thin $borderColor',
  borderRadius: '$4',
  overflow: 'hidden',
}})

const Header = styled('div', { stl: {
  px: '$2.5',
  py: '$1.5',
  borderBottom: '$thin $borderColor',
  background: '$background1',
}})

const HeaderText = styled('span', { stl: {
  fontSize: '$p',
  fontWeight: '$500',
}})

const ControlsSection = styled('div', { stl: {
  padding: '$2.5',
  borderBottom: '$thin $borderColor',
}})

const ControlsGrid = styled('div', { stl: {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2.5',
  gtSm: { gridTemplateColumns: 'repeat(3, 1fr)' },
}})

const ControlLabel = styled('label', { stl: {
  display: 'block',
  fontSize: '$small',
  fontWeight: '$500',
  color: '$colorSubtitle',
  mb: 4,
}})

const RangeInput = styled('input', { stl: {
  width: '100%',
  accentColor: 'var(--stl-primary9)',
}})

const ModeToggleGroup = styled('div', { stl: {
  display: 'flex',
  gap: 4,
  padding: 4,
  background: '$background2',
  borderRadius: '$4',
}})

const ModeButton = styled('button', { stl: {
  flex: 1,
  px: '$1.5',
  py: 4,
  fontSize: '$small',
  fontWeight: '$500',
  borderRadius: '$3',
  transition: 'color 150ms, background 150ms, box-shadow 150ms',
  border: 'none',
  cursor: 'pointer',
  background: 'transparent',
  color: '$colorSubtitle',
}})

const SwatchesSection = styled('div', { stl: {
  padding: '$2.5',
  borderBottom: '$thin $borderColor',
}})

const SwatchGrid = styled('div', { stl: {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: 4,
  gtSm: { gridTemplateColumns: 'repeat(12, 1fr)' },
}})

const SwatchColumn = styled('div', { stl: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
}})

const SwatchColor = styled('div', { stl: {
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '$3',
  border: '$thin $borderColorMuted',
}})

const SwatchLabel = styled('span', { stl: {
  fontSize: 10,
  color: '$colorSubtitle',
}})

const LegendGrid = styled('div', { stl: {
  mt: '$1.5',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '$1',
  fontSize: '$small',
  color: '$colorSubtitle',
  gtSm: { gridTemplateColumns: 'repeat(4, 1fr)' },
}})

const LegendItem = styled('div', { stl: {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
}})

const LegendSwatch = styled('div', { stl: {
  width: 12,
  height: 12,
  borderRadius: '$2',
  border: '$thin $borderColorMuted',
}})

const CodeSection = styled('div', { stl: {
  padding: '$2.5',
  background: '$background1',
}})

const CodePre = styled('pre', { stl: {
  fontSize: '$small',
  fontFamily: '$mono',
  whiteSpace: 'pre-wrap',
  color: '$colorSubtitle',
  overflowX: 'auto',
}})

export function PalettePicker() {
  const [hue, setHue] = useState(220)
  const [saturation, setSaturation] = useState(50)
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const palette = useMemo(
    () => generatePalette(hue, saturation, mode),
    [hue, saturation, mode],
  )

  const codeOutput = useMemo(() => {
    const steps = palette
      .map(
        (c, i) =>
          `  '${c}',${i === 0 ? '  // 0 — background' : i === 11 ? '  // 11 — foreground' : ''}`,
      )
      .join('\n')
    return `palettes: {\n  ${mode}: [\n${steps}\n  ],\n}`
  }, [palette, mode])

  return (
    <Container>
      <Header>
        <HeaderText>Palette Generator</HeaderText>
      </Header>

      {/* Controls */}
      <ControlsSection>
        <ControlsGrid>
          <div>
            <ControlLabel>
              Hue ({hue})
            </ControlLabel>
            <RangeInput
              type="range"
              min={0}
              max={360}
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, ${Array.from({ length: 13 }, (_, i) => `hsl(${i * 30}, 80%, 50%)`).join(', ')})`,
                height: 6,
                borderRadius: 3,
              }}
            />
          </div>
          <div>
            <ControlLabel>
              Saturation ({saturation}%)
            </ControlLabel>
            <RangeInput
              type="range"
              min={0}
              max={100}
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
            />
          </div>
          <div>
            <ControlLabel>
              Mode
            </ControlLabel>
            <ModeToggleGroup>
              <ModeButton
                onClick={() => setMode('light')}
                style={{
                  background: mode === 'light' ? 'var(--stl-background, #fff)' : 'transparent',
                  color: mode === 'light' ? 'var(--stl-color, #111)' : 'var(--stl-colorSubtitle, #888)',
                  boxShadow: mode === 'light' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                Light
              </ModeButton>
              <ModeButton
                onClick={() => setMode('dark')}
                style={{
                  background: mode === 'dark' ? 'var(--stl-background, #fff)' : 'transparent',
                  color: mode === 'dark' ? 'var(--stl-color, #111)' : 'var(--stl-colorSubtitle, #888)',
                  boxShadow: mode === 'dark' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                Dark
              </ModeButton>
            </ModeToggleGroup>
          </div>
        </ControlsGrid>
      </ControlsSection>

      {/* Palette Swatches */}
      <SwatchesSection>
        <SwatchGrid>
          {palette.map((color, i) => (
            <SwatchColumn key={i}>
              <SwatchColor
                style={{ backgroundColor: color }}
                title={`Step ${i}: ${STEP_LABELS[i]}\n${color}`}
              />
              <SwatchLabel>{i}</SwatchLabel>
            </SwatchColumn>
          ))}
        </SwatchGrid>
        <LegendGrid>
          {[
            [0, 'Background'],
            [6, 'Border'],
            [8, 'Solid bg'],
            [11, 'Foreground'],
          ].map(([step, label]) => (
            <LegendItem key={String(step)}>
              <LegendSwatch
                style={{ backgroundColor: palette[step as number] }}
              />
              <span>
                {step}: {label}
              </span>
            </LegendItem>
          ))}
        </LegendGrid>
      </SwatchesSection>

      {/* Code Output */}
      <CodeSection>
        <CodePre>
          {codeOutput}
        </CodePre>
      </CodeSection>
    </Container>
  )
}
