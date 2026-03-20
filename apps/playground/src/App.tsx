import type { Theme } from '@vlting/stl'
import { defaultTheme } from '@vlting/stl'
import { styled, useColorMode } from '@vlting/stl-react'
import { Button, StlProvider } from '@vlting/ui'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { auroraTheme, popsicleTheme, frostTheme, carbonTheme, mintTheme } from '../../../config/themes'
import { MoonIcon, SunIcon } from './sections/shared'
import {
  AlertSection, AvatarSection, BadgeSection, ButtonGroupSection, ButtonSection,
  CardSection, EmptySection, InputSection, InputGroupSection, InputOTPSection,
  TypographySection, ItemSection, ProgressSection,
  SelectionSection, SeparatorSection, SliderSection, SpinnerSection, ToggleSection,
} from './sections'
import { DemoSection, DEMO_SCENES, type DemoScene } from './sections/DemoSection'

// ─── Constants ───────────────────────────────────────────────────────────────

const PAGES = ['Components', 'Demo'] as const
type Page = typeof PAGES[number]

const SECTIONS = [
  'Inputs', 'Slider', 'InputOTP', 'InputGroup', 'Selection', 'Button', 'ButtonGroup', 'Toggle', 'Alert', 'Badge', 'Item', 'Card', 'Progress',
  'Spinner', 'Empty', 'Avatar', 'Typography', 'Separator',
] as const

const THEME_PRESETS: Record<string, { label: string; theme?: Readonly<Theme> }> = {
  default: { label: 'Default' },
  popsicle: { label: 'Popsicle', theme: popsicleTheme },
  carbon: { label: 'Carbon', theme: carbonTheme },
  mint: { label: 'Mint', theme: mintTheme },
  aurora: { label: 'Aurora', theme: auroraTheme },
  frost: { label: 'Frost', theme: frostTheme },
}

/** Themes that default to dark mode */
const DARK_PRESETS = new Set(['popsicle', 'aurora', 'frost'])

// ─── Styled components ──────────────────────────────────────────────────────

const AppRoot = styled('div', {
  display: 'flex', minHeight: '100vh', fontFamily: '$body', bg: '$surface3',
}, { name: 'AppRoot' })

const Sidebar = styled('aside', {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '220px',
  height: '100vh',
  bg: '$surface2',
  boxShadow: '$md',
  display: 'flex',
  flexDirection: 'column',
  zIndex: '$10',
  overflowY: 'auto',
}, { name: 'Sidebar' })

const SidebarHeader = styled('div', {
  px: '$16',
  pt: '$16',
  pb: '$12',
  mb: '$4',
  borderBottomWidth: '$widthMin',
  borderBottomStyle: '$styleDefault',
  borderBottomColor: '$neutralAlpha5',
}, { name: 'SidebarHeader' })

const SidebarTitle = styled('h1', {
  fontSize: '$small',
  fontWeight: '$600',
  color: '$neutralText4',
  m: '$0',
}, { name: 'SidebarTitle' })

const SidebarNav = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  px: '$8',
  py: '$8',
  flex: '1',
}, { name: 'SidebarNav' })

const SidebarPageLink = styled('button', {
  display: 'block',
  width: '100%',
  px: '$12',
  py: '$8',
  fontSize: '$small',
  fontFamily: '$body',
  fontWeight: '$600',
  color: '$neutralText3',
  bg: 'transparent',
  border: 'none',
  borderRadius: '$field',
  cursor: 'pointer',
  textAlign: 'start',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  ':interact': { bg: '$color3' },
}, {
  name: 'SidebarPageLink',
  variants: {
    active: {
      true: {
        color: '$primaryText3',
      },
    },
  },
})

const SidebarLink = styled('button', {
  display: 'block',
  width: '100%',
  px: '$12',
  py: '$6',
  pl: '$24',
  fontSize: '$small',
  fontFamily: '$body',
  fontWeight: '$400',
  color: '$neutralText4',
  bg: 'transparent',
  border: 'none',
  borderRadius: '$field',
  cursor: 'pointer',
  textAlign: 'start',
  ':interact': { bg: '$color3', color: '$neutralText3' },
}, {
  name: 'SidebarLink',
  variants: {
    active: {
      true: {
        bg: '$color3',
        color: '$primaryText3',
        fontWeight: '$500',
      },
    },
  },
})

const SidebarFooter = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$12',
  px: '$12',
  pt: '$16',
  pb: '$16',
  mt: '$8',
  borderTopWidth: '$widthMin',
  borderTopStyle: '$styleDefault',
  borderTopColor: '$neutralAlpha5',
}, { name: 'SidebarFooter' })

const ThemePicker = styled('select', {
  flex: '1',
  minWidth: '0',
  px: '$8',
  py: '$6',
  fontSize: '$small',
  fontFamily: '$body',
  color: '$neutralText4',
  bg: '$surface1',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  border: '$maxAlpha4',
  borderRadius: '$field',
  cursor: 'pointer',
  outline: 'none',
  ':focus': {
    border: '$primary',
  },
}, { name: 'ThemePicker' })

const Main = styled('main', {
  p: '$24', flex: '1', minWidth: '0', ml: '220px', display: 'flex', flexDirection: 'column', gap: '$24',
}, { name: 'Main' })

// ─── Section component map ──────────────────────────────────────────────────

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ sectionRef: (el: HTMLDivElement | null) => void }>> = {
  Button: ButtonSection,
  Alert: AlertSection,
  Progress: ProgressSection,
  Spinner: SpinnerSection,
  Empty: EmptySection,
  Card: CardSection,
  Avatar: AvatarSection,
  Badge: BadgeSection,
  Inputs: InputSection,
  Slider: SliderSection,
  InputOTP: InputOTPSection,
  InputGroup: InputGroupSection,
  Item: ItemSection,
  Typography: TypographySection,
  Separator: SeparatorSection,
  ButtonGroup: ButtonGroupSection,
  Selection: SelectionSection,
  Toggle: ToggleSection,
}

// ─── Inner App (inside StlProvider) ──────────────────────────────────────────

function PlaygroundInner({
  activePreset,
  onPresetChange,
}: {
  activePreset: string
  onPresetChange: (key: string) => void
}) {
  const { colorMode, setColorMode, toggleColorMode } = useColorMode()
  const [activePage, setActivePage] = useState<Page>('Components')
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0])
  const [activeScene, setActiveScene] = useState<DemoScene>(DEMO_SCENES[0])
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Intersection observer for active section tracking
  useEffect(() => {
    if (activePage !== 'Components') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('data-section') ?? '')
          }
        }
      },
      { rootMargin: '-24px 0px -60% 0px', threshold: 0 },
    )
    for (const el of Object.values(sectionRefs.current)) {
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [activePage])

  const scrollTo = useCallback((id: string) => {
    setActivePage('Components')
    // Wait a tick so the Components page renders before scrolling
    requestAnimationFrame(() => {
      const el = sectionRefs.current[id]
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 24
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [])

  // Dark-default themes; others follow system preference
  useEffect(() => {
    if (DARK_PRESETS.has(activePreset)) {
      setColorMode('dark')
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setColorMode(systemDark ? 'dark' : 'light')
    }
  }, [activePreset, setColorMode])

  return (
    <AppRoot>
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>@vlting/ui</SidebarTitle>
        </SidebarHeader>
        <SidebarNav>
          {/* Components page + sub-nav */}
          <SidebarPageLink
            active={activePage === 'Components'}
            onClick={() => setActivePage('Components')}
          >
            Components
          </SidebarPageLink>
          {activePage === 'Components' && SECTIONS.map((s) => (
            <SidebarLink
              key={s}
              active={activeSection === s}
              onClick={() => scrollTo(s)}
            >
              {s}
            </SidebarLink>
          ))}

          {/* Demo page */}
          <SidebarPageLink
            active={activePage === 'Demo'}
            onClick={() => { setActivePage('Demo'); window.scrollTo({ top: 0 }) }}
          >
            Demo
          </SidebarPageLink>
          {activePage === 'Demo' && DEMO_SCENES.map((s) => (
            <SidebarLink
              key={s}
              active={activeScene === s}
              onClick={() => { setActiveScene(s); window.scrollTo({ top: 0 }) }}
            >
              {s}
            </SidebarLink>
          ))}
        </SidebarNav>
        <SidebarFooter>
          <ThemePicker
            value={activePreset}
            onChange={(e) => onPresetChange(e.target.value)}
          >
            {Object.entries(THEME_PRESETS).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </ThemePicker>
          <Button
            square
            theme="neutral"
            variant="subtle"
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            stl={{ height: '34px', width: '34px', flexShrink: '0' }}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </SidebarFooter>
      </Sidebar>
      <Main>
        {activePage === 'Components' && SECTIONS.map((name) => {
          const Component = SECTION_COMPONENTS[name]
          return (
            <Component
              key={name}
              sectionRef={(el: HTMLDivElement | null) => { sectionRefs.current[name] = el }}
            />
          )
        })}
        {activePage === 'Demo' && <DemoSection activeScene={activeScene} />}
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
