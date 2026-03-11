import { useColorMode } from '@vlting/stl-react'
import type { GenerateThemeOptions } from '@vlting/ui/design-tokens'
import {
  generateTheme,
  themeToVars,
  THEME_PRESET_DEFAULT,
  THEME_PRESET_FUN,
  THEME_PRESET_POSH,
  THEME_PRESET_SHADCN,
} from '@vlting/ui/design-tokens'
import { useCallback, useEffect, useState } from 'react'

type PresetKey = 'default' | 'shadcn' | 'fun' | 'posh'

const presetMap: Record<PresetKey, GenerateThemeOptions> = {
  default: THEME_PRESET_DEFAULT,
  shadcn: THEME_PRESET_SHADCN,
  fun: THEME_PRESET_FUN,
  posh: THEME_PRESET_POSH,
}

const presetLabels: Record<PresetKey, string> = {
  default: 'Default',
  shadcn: 'Shadcn',
  fun: 'Fun',
  posh: 'Posh',
}

const STORAGE_KEY = 'vlting-showcase-theme-preset'
const STYLE_ID = 'stl-theme-demo'

function applyThemeVars(presetKey: PresetKey, mode: 'light' | 'dark') {
  const theme = generateTheme(presetMap[presetKey])
  const vars = themeToVars(theme, mode)

  let styleEl = document.getElementById(STYLE_ID)
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    document.head.appendChild(styleEl)
  }

  const declarations = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')
  styleEl.textContent = `:root {\n${declarations}\n}`
}

export function ThemeSwitcher() {
  const { colorMode } = useColorMode()
  const mode = colorMode === 'dark' ? 'dark' : 'light'

  const [preset, setPreset] = useState<PresetKey>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as PresetKey) || 'default'
    } catch {
      return 'default'
    }
  })

  useEffect(() => {
    applyThemeVars(preset, mode)
  }, [preset, mode])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as PresetKey
    setPreset(key)
    try {
      localStorage.setItem(STORAGE_KEY, key)
    } catch {}
  }, [])

  return (
    <select
      value={preset}
      onChange={handleChange}
      aria-label="Select theme preset"
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        border: '1px solid var(--stl-borderColor, #ddd)',
        background: 'var(--stl-surface1, #f5f5f5)',
        color: 'var(--stl-color, #111)',
        cursor: 'pointer',
        fontSize: 14,
      }}
    >
      {(Object.keys(presetMap) as PresetKey[]).map((key) => (
        <option key={key} value={key}>
          {presetLabels[key]}
        </option>
      ))}
    </select>
  )
}
