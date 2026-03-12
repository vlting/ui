'use client'

import { useCallback, useEffect, useState } from 'react'
import { useColorMode } from '@vlting/stl-react'
import type { CreateThemeOptions } from '../../../packages/stl/src/theme'
import {
  createTheme,
  themeToVars,
  THEME_PRESET_DEFAULT,
  THEME_PRESET_FLAT,
  THEME_PRESET_SHARP,
  THEME_PRESET_PRO,
} from '../../../packages/stl/src/theme'

type PresetKey = 'default' | 'pro' | 'flat' | 'sharp'

const presetMap: Record<PresetKey, CreateThemeOptions> = {
  default: THEME_PRESET_DEFAULT,
  pro: THEME_PRESET_PRO,
  flat: THEME_PRESET_FLAT,
  sharp: THEME_PRESET_SHARP,
}

const presetLabels: Record<PresetKey, string> = {
  default: 'Default',
  pro: 'Pro',
  flat: 'Flat',
  sharp: 'Sharp',
}

const STORAGE_KEY = 'vlting-docs-theme-preset'
const STYLE_ID = 'stl-theme-demo'

function applyThemeVars(presetKey: PresetKey, mode: 'light' | 'dark') {
  const theme = createTheme(presetMap[presetKey])
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
  const [preset, setPreset] = useState<PresetKey>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STORAGE_KEY) as PresetKey) || 'default'
    }
    return 'default'
  })

  useEffect(() => {
    applyThemeVars(preset, colorMode)
  }, [preset, colorMode])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as PresetKey
    setPreset(key)
    try {
      localStorage.setItem(STORAGE_KEY, key)
    } catch {}
  }, [])

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={preset}
        onChange={handleChange}
        aria-label="Select theme preset"
        style={{
          appearance: 'none',
          borderRadius: 6,
          border: '1px solid var(--color-border, #e5e5e5)',
          background: 'transparent',
          paddingLeft: 8,
          paddingRight: 28,
          paddingTop: 4,
          paddingBottom: 4,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          color: 'inherit',
        }}
      >
        {(Object.keys(presetMap) as PresetKey[]).map((key) => (
          <option key={key} value={key}>
            {presetLabels[key]}
          </option>
        ))}
      </select>
      <svg
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          right: 6,
          width: 16,
          height: 16,
          opacity: 0.5,
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
        role="presentation"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
