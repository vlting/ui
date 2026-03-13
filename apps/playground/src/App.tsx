import type { Theme } from '@vlting/stl'
import { defaultTheme } from '@vlting/stl'
import { styled, useColorMode } from '@vlting/stl-react'
import { Button, StlProvider } from '@vlting/ui'
import { useEffect, useMemo, useState } from 'react'

import { flatTheme, proTheme, sharpTheme } from '../../../config/themes'

// ─── Icons ───────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z" />
  </svg>
)

const MoonIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z" />
  </svg>
)

// ─── Constants ───────────────────────────────────────────────────────────────

const THEMES = ['primary', 'secondary', 'neutral', 'destructive'] as const
const VARIANTS = ['solid', 'outline', 'subtle', 'ghost', 'link'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'icon'] as const

const THEME_PRESETS: Record<string, { label: string; theme?: Readonly<Theme> }> = {
  default: { label: 'Default' },
  flat: { label: 'Flat', theme: flatTheme },
  pro: { label: 'Pro', theme: proTheme },
  sharp: { label: 'Sharp', theme: sharpTheme },
}

// ─── Styled components ──────────────────────────────────────────────────────

const AppRoot = styled('div', {
  stl: { minHeight: '100vh', fontFamily: '$body', bg: '$tertiary2' },
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
    bg: '$tertiary1',
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

const NavSpacer = styled('div', {
  stl: { width: '$16' },
  styleName: 'NavSpacer',
})

const Main = styled('main', {
  stl: { p: '$24', maxWidth: '1200px', mx: 'auto' },
  styleName: 'Main',
})

const Section = styled('div', {
  stl: { mb: '$32' },
  styleName: 'Section',
})

const SectionHeading = styled('h2', {
  stl: {
    fontSize: '$h4',
    fontWeight: '$700',
    color: '$color12',
    m: '$0',
    mb: '$16',
  },
  styleName: 'SectionHeading',
})

const SectionTitle = styled('h3', {
  stl: {
    fontSize: '$buttonTiny',
    fontWeight: '$600',
    color: '$tertiaryText3',
    m: '$0',
    mb: '$10',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  styleName: 'SectionTitle',
})

const Card = styled('div', {
  stl: {
    bg: '$tertiary1',
    radius: '$24',
    p: '$48',
    boxShadow: '$lg'
  },
  styleName: 'Card',
})

const ButtonRow = styled('div', {
  stl: { display: 'flex', gap: '$12', flexWrap: 'wrap' },
  styleName: 'ButtonRow',
})

// ─── Inner App (inside StlProvider) ──────────────────────────────────────────

function PlaygroundInner({
  activePreset,
  onPresetChange,
}: {
  activePreset: string
  onPresetChange: (key: string) => void
}) {
  const { colorMode, setColorMode, toggleColorMode } = useColorMode()

  // Flat theme defaults to dark; others follow system preference
  useEffect(() => {
    if (activePreset === 'flat') {
      setColorMode('dark')
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setColorMode(systemDark ? 'dark' : 'light')
    }
  }, [activePreset, setColorMode])

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
              theme="neutral"
              variant={activePreset === key ? 'subtle' : 'ghost'}
              onClick={() => onPresetChange(key)}
              aria-pressed={activePreset === key}
            >
              {label}
            </Button>
          ))}
          <NavSpacer />
          <Button
            size="icon"
            theme="neutral"
            variant="ghost"
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            stl={{ height: '$28', width: '$28' }}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </NavControls>
      </Nav>

      {/* ── Main ── */}
      <Main>
        <Card>
          {/* Themes */}
          <SectionHeading>Theme</SectionHeading>
          {THEMES.map((theme) => (
            <Section key={theme}>
              <SectionTitle>{theme}</SectionTitle>
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

          {/* Sizes */}
          <Section>
            <SectionHeading>Size</SectionHeading>
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
        </Card>
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

  // Inject Google Fonts <link> tags from theme
  useEffect(() => {
    document.querySelectorAll('[data-theme-font]').forEach((el) => el.remove())
    theme.fontLinks?.forEach((linkData) => {
      const link = document.createElement('link')
      Object.assign(link, linkData)
      link.dataset.themeFont = 'true'
      document.head.appendChild(link)
    })
  }, [theme])

  return (
    <StlProvider theme={theme} defaultColorMode="light">
      <PlaygroundInner activePreset={activePreset} onPresetChange={setActivePreset} />
    </StlProvider>
  )
}
