import type { Theme } from '@vlting/stl'
import { defaultTheme } from '@vlting/stl'
import { styled, useColorMode } from '@vlting/stl-react'
import { Button, StlProvider } from '@vlting/ui'
import { useMemo, useState } from 'react'
import { flatTheme, proTheme, sharpTheme } from '../../../config/themes'

// ─── Constants ───────────────────────────────────────────────────────────────

const THEMES = ['primary', 'secondary', 'neutral', 'destructive'] as const
const VARIANTS = ['solid', 'subtle', 'outline', 'ghost', 'link'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'icon'] as const

const THEME_PRESETS: Record<string, { label: string; theme: Readonly<Theme> }> = {
  default: { label: 'Default', theme: defaultTheme },
  flat: { label: 'Flat', theme: flatTheme },
  pro: { label: 'Pro', theme: proTheme },
  sharp: { label: 'Sharp', theme: sharpTheme },
}

// ─── Styled components ──────────────────────────────────────────────────────

const AppRoot = styled('div', {
  stl: { minHeight: '100vh', fontFamily: '$body' },
  styleName: 'AppRoot',
})

const Nav = styled('nav', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: '$24',
    py: '$12',
    borderBottomWidth: '$widthDefault',
    borderBottomStyle: '$styleDefault',
    borderBottom: '$tertiary',
    bg: '$tertiary3',
    position: 'sticky',
    top: '0',
    zIndex: '$10',
  },
  styleName: 'Nav',
})

const NavTitle = styled('h1', {
  stl: {
    fontSize: '$p',
    fontWeight: '$600',
    color: '$tertiaryText4',
    m: '$0',
  },
  styleName: 'NavTitle',
})

const NavControls = styled('div', {
  stl: { display: 'flex', alignItems: 'center', gap: '$8' },
  styleName: 'NavControls',
})

const Main = styled('main', {
  stl: { p: '$24', maxWidth: '1200px', mx: 'auto' },
  styleName: 'Main',
})

const Section = styled('div', {
  stl: { mb: '$32' },
  styleName: 'Section',
})

const SectionTitle = styled('div', {
  stl: {
    fontSize: '$buttonTiny',
    fontWeight: '$600',
    color: '$tertiaryText3',
    mb: '$12',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  styleName: 'SectionTitle',
})

const ToggleRow = styled('div', {
  stl: { display: 'flex', gap: '$12', mb: '$24', flexWrap: 'wrap' },
  styleName: 'ToggleRow',
})

const GridContainer = styled('div', {
  stl: {
    display: 'grid',
    gap: '$1',
    bg: '$tertiary4',
    borderWidth: '$widthDefault',
    borderStyle: '$styleDefault',
    borderColor: '$tertiary',
    borderRadius: '$3',
    overflow: 'hidden',
  },
  styleName: 'GridContainer',
})

const HeaderCell = styled('div', {
  stl: {
    py: '$8',
    px: '$12',
    fontSize: '$buttonTiny',
    fontWeight: '$600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '$tertiaryText2',
    bg: '$tertiary3',
    textAlign: 'center',
  },
  styleName: 'HeaderCell',
})

const RowLabel = styled('div', {
  stl: {
    p: '$12',
    fontSize: '$buttonTiny',
    fontWeight: '$500',
    color: '$tertiaryText3',
    bg: '$tertiary3',
    display: 'flex',
    alignItems: 'center',
  },
  styleName: 'RowLabel',
})

const Cell = styled('div', {
  stl: {
    py: '$16',
    px: '$12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bg: '$tertiary2',
  },
  styleName: 'Cell',
})

// ─── Inner App (inside StlProvider) ──────────────────────────────────────────

function PlaygroundInner({
  activePreset,
  onPresetChange,
}: {
  activePreset: string
  onPresetChange: (key: string) => void
}) {
  const { colorMode, toggleColorMode } = useColorMode()
  const [size, setSize] = useState<(typeof SIZES)[number]>('md')
  const [isDisabled, setDisabled] = useState(false)
  const [isLoading, setLoading] = useState(false)

  return (
    <AppRoot>
      {/* ── Nav ── */}
      <Nav>
        <NavTitle>@vlting/ui Playground</NavTitle>
        <NavControls>
          {Object.entries(THEME_PRESETS).map(([key, { label }]) => (
            <Button
              key={key}
              size="xs"
              theme={activePreset === key ? 'primary' : 'neutral'}
              variant={activePreset === key ? 'subtle' : 'ghost'}
              onClick={() => onPresetChange(key)}
              aria-pressed={activePreset === key}
            >
              {label}
            </Button>
          ))}
          <Button size="xs" theme="neutral" variant="ghost" onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </NavControls>
      </Nav>

      {/* ── Main ── */}
      <Main>
        {/* Toggles */}
        <Section>
          <SectionTitle>Controls</SectionTitle>
          <ToggleRow>
            {SIZES.map((s) => (
              <Button
                key={s}
                size="xs"
                theme={size === s ? 'primary' : 'neutral'}
                variant={size === s ? 'subtle' : 'ghost'}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
              >
                {s}
              </Button>
            ))}
            <Button
              size="xs"
              theme={isDisabled ? 'primary' : 'neutral'}
              variant={isDisabled ? 'subtle' : 'ghost'}
              onClick={() => setDisabled((d) => !d)}
              aria-pressed={isDisabled}
            >
              disabled
            </Button>
            <Button
              size="xs"
              theme={isLoading ? 'primary' : 'neutral'}
              variant={isLoading ? 'subtle' : 'ghost'}
              onClick={() => setLoading((l) => !l)}
              aria-pressed={isLoading}
            >
              loading
            </Button>
          </ToggleRow>
        </Section>

        {/* Permutation Grid */}
        <Section>
          <SectionTitle>Button · theme × variant</SectionTitle>
          <GridContainer
            role="grid"
            aria-label="Button permutation grid"
            style={{ gridTemplateColumns: `120px repeat(${VARIANTS.length}, 1fr)` }}
          >
            {/* Header row */}
            <HeaderCell role="columnheader" />
            {VARIANTS.map((v) => (
              <HeaderCell key={v} role="columnheader">
                {v}
              </HeaderCell>
            ))}

            {/* Data rows */}
            {THEMES.map((theme) => (
              <div key={theme} role="row" style={{ display: 'contents' }}>
                <RowLabel role="rowheader">{theme}</RowLabel>
                {VARIANTS.map((variant) => (
                  <Cell key={variant} role="gridcell" aria-label={`${theme} ${variant}`}>
                    <Button
                      theme={theme}
                      variant={variant}
                      size={size}
                      disabled={isDisabled}
                      loading={isLoading}
                    >
                      {size === 'icon' ? '★' : 'Button'}
                    </Button>
                  </Cell>
                ))}
              </div>
            ))}
          </GridContainer>
        </Section>
      </Main>
    </AppRoot>
  )
}

// ─── App (theme provider wrapper) ────────────────────────────────────────────

export function App() {
  const [activePreset, setActivePreset] = useState('default')

  const theme = useMemo(
    () => THEME_PRESETS[activePreset]?.theme ?? defaultTheme,
    [activePreset],
  )

  return (
    <StlProvider theme={theme} defaultColorMode="light">
      <PlaygroundInner activePreset={activePreset} onPresetChange={setActivePreset} />
    </StlProvider>
  )
}
