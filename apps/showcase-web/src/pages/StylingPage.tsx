import { styled, useColorMode } from '@vlting/stl-react'
import { DemoCard, DemoRow, Section } from '../components/Section'

const ColorSwatch = styled(
  'div',
  {
    width: '48px',
    height: '48px',
    borderRadius: '$2',
    border: '1px solid rgba(0,0,0,0.1)',
  },
  'ColorSwatch',
)

const SpaceBox = styled(
  'div',
  {
    backgroundColor: '$primary6',
    height: '24px',
    borderRadius: '$1',
  },
  'SpaceBox',
)

const RadiusBox = styled(
  'div',
  {
    width: '64px',
    height: '64px',
    backgroundColor: '$surface2',
    border: '1px solid $borderColor',
  },
  'RadiusBox',
)

const colorSteps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const palettes = ['primary', 'red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow']
const spaceSteps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const radiusSteps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const fontSizeSteps = ['10', '12', '14', '16', '18', '20', '24', '32', '40', '48']
const shadowSteps = ['sm', 'md', 'lg', 'xl', '2xl']

export function StylingPage() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Styling & Tokens
      </h1>

      <Section title="Color Mode">
        <DemoCard label="Theme Toggle">
          <DemoRow>
            <span>
              Current: <strong>{colorMode}</strong>
            </span>
            <button
              onClick={toggleColorMode}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid #ddd',
                cursor: 'pointer',
              }}
            >
              Toggle
            </button>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Color Palettes">
        {palettes.map((palette) => (
          <DemoCard key={palette} label={palette}>
            <DemoRow>
              {colorSteps.map((step) => (
                <div key={step} style={{ textAlign: 'center' }}>
                  <ColorSwatch css={{ backgroundColor: `$${palette}${step}` }} />
                  <div style={{ fontSize: 10, marginTop: 4 }}>{step}</div>
                </div>
              ))}
            </DemoRow>
          </DemoCard>
        ))}
      </Section>

      <Section title="Semantic Colors">
        <DemoCard label="Background & Surface">
          <DemoRow>
            {['background', 'surface1', 'surface2', 'surface3'].map((name) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <ColorSwatch css={{ backgroundColor: `$${name}` }} />
                <div style={{ fontSize: 10, marginTop: 4 }}>{name}</div>
              </div>
            ))}
          </DemoRow>
        </DemoCard>
        <DemoCard label="Text & Border">
          <DemoRow>
            {['color', 'colorHover', 'borderColor', 'borderColorHover'].map((name) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <ColorSwatch css={{ backgroundColor: `$${name}` }} />
                <div style={{ fontSize: 10, marginTop: 4 }}>{name}</div>
              </div>
            ))}
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Space Scale">
        <DemoCard label="Space tokens ($1 through $10)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {spaceSteps.map((step) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, fontSize: 12 }}>${step}</span>
                <SpaceBox css={{ width: `$space$${step}` }} />
              </div>
            ))}
          </div>
        </DemoCard>
      </Section>

      <Section title="Border Radius">
        <DemoCard label="Radius tokens">
          <DemoRow>
            {radiusSteps.map((step) => (
              <div key={step} style={{ textAlign: 'center' }}>
                {/* @ts-expect-error dynamic token reference */}
                <RadiusBox css={{ borderRadius: `$${step}` }} />
                <div style={{ fontSize: 10, marginTop: 4 }}>${step}</div>
              </div>
            ))}
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="Font Sizes">
        <DemoCard label="Typography scale">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {fontSizeSteps.map((step) => (
              <div
                key={step}
                style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}
              >
                <span style={{ width: 36, fontSize: 12, color: '#888' }}>${step}</span>
                <span style={{ fontSize: `var(--stl-fontSize-${step}, ${step}px)` }}>
                  The quick brown fox
                </span>
              </div>
            ))}
          </div>
        </DemoCard>
      </Section>

      <Section title="Shadows">
        <DemoCard label="Shadow tokens">
          <DemoRow>
            {shadowSteps.map((step) => (
              <div
                key={step}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  background: 'var(--stl-background, #fff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  boxShadow: `var(--stl-shadow-${step})`,
                }}
              >
                {step}
              </div>
            ))}
          </DemoRow>
        </DemoCard>
      </Section>
    </div>
  )
}
