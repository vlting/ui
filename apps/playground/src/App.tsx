import { useState, useCallback, useMemo } from 'react'
import { StlProvider } from '@vlting/ui'
import { Button } from '@vlting/ui'
import type { ButtonTheme, ButtonVariant, ButtonSize } from '@vlting/ui'
import { useColorMode } from '@vlting/stl-react'
import { styled, options } from '@vlting/stl-react'
import { defaultTheme, createTheme } from '@vlting/stl'
import type { Theme, CreateThemeOptions } from '@vlting/stl'
import {
  THEME_PRESET_FLAT,
  THEME_PRESET_SHARP,
  THEME_PRESET_PRO,
} from '../../../config/themes'
import '@vlting/stl/styles'

// ─── Constants ───────────────────────────────────────────────────────────────

const THEMES: ButtonTheme[] = ['primary', 'secondary', 'neutral', 'destructive']
const VARIANTS: ButtonVariant[] = ['solid', 'subtle', 'outline', 'ghost', 'link']
const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'icon']

const flatTheme = createTheme(THEME_PRESET_FLAT)
const proTheme = createTheme(THEME_PRESET_PRO)
const sharpTheme = createTheme(THEME_PRESET_SHARP)

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
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '$color5',
    bg: '$background',
    position: 'sticky',
    top: '0',
    zIndex: '10',
  },
  styleName: 'Nav',
})

const NavTitle = styled('h1', {
  stl: {
    fontSize: '$p',
    fontWeight: '$600',
    color: '$color12',
    m: '$0',
  },
  styleName: 'NavTitle',
})

const NavControls = styled('div', {
  stl: { display: 'flex', alignItems: 'center', gap: '$8' },
  styleName: 'NavControls',
})

const ToggleBtn = styled('button', {
  stl: {
    py: '$4',
    px: '$12',
    fontSize: '$buttonTiny',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$color6',
    borderRadius: '$2',
    bg: 'transparent',
    color: '$color11',
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: {
        borderColor: '$primary9',
        bg: '$primary3',
        color: '$primary11',
        fontWeight: '$600',
      },
    },
  },
  styleName: 'ToggleBtn',
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
    color: '$color11',
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
    gap: '1px',
    bg: '$color4',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$color4',
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
    color: '$color10',
    bg: '$color2',
    textAlign: 'center',
  },
  styleName: 'HeaderCell',
})

const RowLabel = styled('div', {
  stl: {
    p: '$12',
    fontSize: '$buttonTiny',
    fontWeight: '$500',
    color: '$color11',
    bg: '$color2',
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
    bg: '$background',
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
  const [size, setSize] = useState<ButtonSize>('md')
  const [isDisabled, setDisabled] = useState(false)
  const [isLoading, setLoading] = useState(false)

  return (
    <AppRoot>
      {/* ── Nav ── */}
      <Nav>
        <NavTitle>@vlting/ui Playground</NavTitle>
        <NavControls>
          {Object.entries(THEME_PRESETS).map(([key, { label }]) => (
            <ToggleBtn
              key={key}
              type="button"
              active={activePreset === key}
              onClick={() => onPresetChange(key)}
              aria-pressed={activePreset === key}
            >
              {label}
            </ToggleBtn>
          ))}
          <ToggleBtn
            type="button"
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? 'Dark' : 'Light'}
          </ToggleBtn>
        </NavControls>
      </Nav>

      {/* ── Main ── */}
      <Main>
        {/* Toggles */}
        <Section>
          <SectionTitle>Controls</SectionTitle>
          <ToggleRow>
            {SIZES.map((s) => (
              <ToggleBtn
                key={s}
                type="button"
                active={size === s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
              >
                {s}
              </ToggleBtn>
            ))}
            <ToggleBtn
              type="button"
              active={isDisabled}
              onClick={() => setDisabled((d) => !d)}
              aria-pressed={isDisabled}
            >
              disabled
            </ToggleBtn>
            <ToggleBtn
              type="button"
              active={isLoading}
              onClick={() => setLoading((l) => !l)}
              aria-pressed={isLoading}
            >
              loading
            </ToggleBtn>
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
                <RowLabel role="rowheader">
                  {theme}
                </RowLabel>
                {VARIANTS.map((variant) => (
                  <Cell
                    key={variant}
                    role="gridcell"
                    aria-label={`${theme} ${variant}`}
                  >
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
      <PlaygroundInner
        activePreset={activePreset}
        onPresetChange={setActivePreset}
      />
    </StlProvider>
  )
}
