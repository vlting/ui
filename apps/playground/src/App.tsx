import type { Theme } from '@vlting/stl'
import { defaultTheme } from '@vlting/stl'
import { styled, useColorMode } from '@vlting/stl-react'
import { Button, StlProvider } from '@vlting/ui'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { flatTheme, proTheme, sharpTheme } from '../../../config/themes'
import { MoonIcon, SunIcon } from './sections/shared'
import {
  AlertSection, AvatarSection, BadgeSection, ButtonSection,
  CardSection, EmptySection, ItemSection, ProgressSection, SpinnerSection,
} from './sections'

// ─── Constants ───────────────────────────────────────────────────────────────

const SECTIONS = [
  'Button', 'Alert', 'Progress', 'Spinner', 'Empty', 'Card', 'Avatar', 'Badge', 'Item',
] as const

const THEME_PRESETS: Record<string, { label: string; theme?: Readonly<Theme> }> = {
  default: { label: 'Default' },
  flat: { label: 'Flat', theme: flatTheme },
  pro: { label: 'Pro', theme: proTheme },
  sharp: { label: 'Sharp', theme: sharpTheme },
}

// ─── Styled components ──────────────────────────────────────────────────────

const AppRoot = styled('div', {
  stl: { display: 'flex', minHeight: '100vh', fontFamily: '$body', bg: '$background3' },
  styleName: 'AppRoot',
})

const Sidebar = styled('aside', {
  stl: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '220px',
    height: '100vh',
    bg: '$background1',
    boxShadow: '$lg',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '$10',
    overflowY: 'auto',
  },
  styleName: 'Sidebar',
})

const SidebarHeader = styled('div', {
  stl: {
    px: '$16',
    pt: '$16',
    pb: '$12',
    mb: '$4',
    borderBottomWidth: '$widthMin',
    borderBottomStyle: '$styleDefault',
    borderBottomColor: '$neutralAlpha5',
  },
  styleName: 'SidebarHeader',
})

const SidebarTitle = styled('h1', {
  stl: {
    fontSize: '$small',
    fontWeight: '$600',
    color: '$neutralText4',
    m: '$0',
  },
  styleName: 'SidebarTitle',
})

const SidebarNav = styled('nav', {
  stl: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    px: '$8',
    py: '$8',
    flex: '1',
  },
  styleName: 'SidebarNav',
})

const SidebarLink = styled('button', {
  stl: {
    display: 'block',
    width: '100%',
    px: '$12',
    py: '$6',
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
  },
  variants: {
    active: {
      true: {
        bg: '$color3',
        color: '$primaryText3',
        fontWeight: '$500',
      },
    },
  },
  styleName: 'SidebarLink',
})

const SidebarFooter = styled('div', {
  stl: {
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
  },
  styleName: 'SidebarFooter',
})

const ThemePicker = styled('select', {
  stl: {
    flex: '1',
    minWidth: '0',
    px: '$8',
    py: '$6',
    fontSize: '$small',
    fontFamily: '$body',
    color: '$neutralText4',
    bg: '$background1',
    borderWidth: '$widthMin',
    borderStyle: '$styleDefault',
    border: '$maxAlpha4',
    borderRadius: '$field',
    cursor: 'pointer',
    outline: 'none',
    ':focus': {
      border: '$primary',
    },
  },
  styleName: 'ThemePicker',
})

const Main = styled('main', {
  stl: { p: '$24', flex: '1', minWidth: '0', ml: '220px' },
  styleName: 'Main',
})

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
  Item: ItemSection,
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
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0])
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Intersection observer for active section tracking
  useEffect(() => {
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
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = sectionRefs.current[id]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 24
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

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
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>@vlting/ui</SidebarTitle>
        </SidebarHeader>
        <SidebarNav>
          {SECTIONS.map((s) => (
            <SidebarLink
              key={s}
              active={activeSection === s}
              onClick={() => scrollTo(s)}
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
            size="icon"
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
        {SECTIONS.map((name) => {
          const Component = SECTION_COMPONENTS[name]
          return (
            <Component
              key={name}
              sectionRef={(el: HTMLDivElement | null) => { sectionRefs.current[name] = el }}
            />
          )
        })}
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
