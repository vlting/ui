'use client'

import { useMemo, useState } from 'react'

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
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-surface-muted">
        <span className="text-sm font-medium">Palette Generator</span>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-border space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground-secondary mb-1">
              Hue ({hue})
            </label>
            <input
              type="range"
              min={0}
              max={360}
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              className="w-full accent-primary"
              style={{
                background: `linear-gradient(to right, ${Array.from({ length: 13 }, (_, i) => `hsl(${i * 30}, 80%, 50%)`).join(', ')})`,
                height: 6,
                borderRadius: 3,
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-secondary mb-1">
              Saturation ({saturation}%)
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-secondary mb-1">
              Mode
            </label>
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setMode('light')}
                className={`flex-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  mode === 'light'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setMode('dark')}
                className={`flex-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  mode === 'dark'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Palette Swatches */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
          {palette.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-full aspect-square rounded-md border border-border-muted"
                style={{ backgroundColor: color }}
                title={`Step ${i}: ${STEP_LABELS[i]}\n${color}`}
              />
              <span className="text-[10px] text-muted-foreground">{i}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground">
          {[
            [0, 'Background'],
            [6, 'Border'],
            [8, 'Solid bg'],
            [11, 'Foreground'],
          ].map(([step, label]) => (
            <div key={String(step)} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm border border-border-muted"
                style={{ backgroundColor: palette[step as number] }}
              />
              <span>
                {step}: {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Output */}
      <div className="p-4 bg-surface-muted">
        <pre className="text-xs font-mono whitespace-pre-wrap text-foreground-secondary overflow-x-auto">
          {codeOutput}
        </pre>
      </div>
    </div>
  )
}
