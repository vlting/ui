import { useState, useCallback, useMemo } from 'react'
import { StlProvider } from '@vlting/ui'
import { Button } from '@vlting/ui'
import type { ButtonTheme, ButtonVariant, ButtonSize } from '@vlting/ui'
import { useColorMode } from '@vlting/stl-react'
import {
  defaultTheme,
  flatTheme,
  proTheme,
  sharpTheme,
} from '@vlting/stl'
import type { Theme } from '@vlting/stl'
import '@vlting/stl/styles'

// ─── Constants ───────────────────────────────────────────────────────────────

const THEMES: ButtonTheme[] = ['primary', 'secondary', 'neutral', 'destructive']
const VARIANTS: ButtonVariant[] = ['solid', 'subtle', 'outline', 'ghost', 'link']
const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'icon']

const THEME_PRESETS: Record<string, { label: string; theme: Readonly<Theme> }> = {
  default: { label: 'Default', theme: defaultTheme },
  flat: { label: 'Flat', theme: flatTheme },
  pro: { label: 'Pro', theme: proTheme },
  sharp: { label: 'Sharp', theme: sharpTheme },
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  app: {
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    borderBottom: '1px solid var(--stl-color5)',
    background: 'var(--stl-background)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
  },
  navTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--stl-color12)',
    margin: 0,
  },
  navControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  presetBtn: (active: boolean) => ({
    padding: '4px 12px',
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    border: active ? '1px solid var(--stl-primary9)' : '1px solid var(--stl-color6)',
    borderRadius: 6,
    background: active ? 'var(--stl-primary3)' : 'transparent',
    color: active ? 'var(--stl-primary11)' : 'var(--stl-color11)',
    cursor: 'pointer',
  }),
  modeBtn: {
    padding: '4px 12px',
    fontSize: 12,
    border: '1px solid var(--stl-color6)',
    borderRadius: 6,
    background: 'transparent',
    color: 'var(--stl-color11)',
    cursor: 'pointer',
    marginLeft: 8,
  },
  main: {
    padding: 24,
    maxWidth: 1200,
    margin: '0 auto',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--stl-color11)',
    marginBottom: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  toggleRow: {
    display: 'flex',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap' as const,
  },
  toggleBtn: (active: boolean) => ({
    padding: '4px 12px',
    fontSize: 12,
    border: active ? '1px solid var(--stl-primary9)' : '1px solid var(--stl-color6)',
    borderRadius: 6,
    background: active ? 'var(--stl-primary3)' : 'transparent',
    color: active ? 'var(--stl-primary11)' : 'var(--stl-color11)',
    cursor: 'pointer',
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: `120px repeat(${VARIANTS.length}, 1fr)`,
    gap: 1,
    background: 'var(--stl-color4)',
    border: '1px solid var(--stl-color4)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerCell: {
    padding: '8px 12px',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: 'var(--stl-color10)',
    background: 'var(--stl-color2)',
    textAlign: 'center' as const,
  },
  rowLabel: {
    padding: '12px',
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--stl-color11)',
    background: 'var(--stl-color2)',
    display: 'flex',
    alignItems: 'center',
  },
  cell: {
    padding: '16px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--stl-background)',
  },
} as const

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
    <div style={styles.app}>
      {/* ── Nav ── */}
      <nav style={styles.nav}>
        <h1 style={styles.navTitle}>@vlting/ui Playground</h1>
        <div style={styles.navControls}>
          {Object.entries(THEME_PRESETS).map(([key, { label }]) => (
            <button
              key={key}
              type="button"
              style={styles.presetBtn(activePreset === key)}
              onClick={() => onPresetChange(key)}
              aria-pressed={activePreset === key}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            style={styles.modeBtn}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </nav>

      {/* ── Main ── */}
      <main style={styles.main}>
        {/* Toggles */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Controls</div>
          <div style={styles.toggleRow}>
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                style={styles.toggleBtn(size === s)}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
              >
                {s}
              </button>
            ))}
            <button
              type="button"
              style={styles.toggleBtn(isDisabled)}
              onClick={() => setDisabled((d) => !d)}
              aria-pressed={isDisabled}
            >
              disabled
            </button>
            <button
              type="button"
              style={styles.toggleBtn(isLoading)}
              onClick={() => setLoading((l) => !l)}
              aria-pressed={isLoading}
            >
              loading
            </button>
          </div>
        </div>

        {/* Permutation Grid */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Button · theme × variant</div>
          <div style={styles.grid} role="grid" aria-label="Button permutation grid">
            {/* Header row */}
            <div style={styles.headerCell} role="columnheader" />
            {VARIANTS.map((v) => (
              <div key={v} style={styles.headerCell} role="columnheader">
                {v}
              </div>
            ))}

            {/* Data rows */}
            {THEMES.map((theme) => (
              <div key={theme} role="row" style={{ display: 'contents' }}>
                <div style={styles.rowLabel} role="rowheader">
                  {theme}
                </div>
                {VARIANTS.map((variant) => (
                  <div
                    key={variant}
                    style={styles.cell}
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
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
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
