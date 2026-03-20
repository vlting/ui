/**
 * Build-time theme injection script.
 *
 * Reads dist/stl.css, generates scoped CSS blocks for each preset theme,
 * and appends them to the file. Idempotent — existing theme blocks are
 * replaced on re-run.
 *
 * Usage: npx tsx scripts/inject-themes.ts
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { generateThemeCss, injectThemeIntoStylesheet } from '../src/theme/inject'
import type { CreateThemeOptions } from '../src/theme/generate-theme'
import {
  THEME_PRESET_POPSICLE,
  THEME_PRESET_CARBON,
  THEME_PRESET_MINT,
  THEME_PRESET_AURORA,
  THEME_PRESET_FROST,
} from '../../../config/themes/index'

const THEMES: Record<string, CreateThemeOptions> = {
  popsicle: THEME_PRESET_POPSICLE,
  carbon: THEME_PRESET_CARBON,
  mint: THEME_PRESET_MINT,
  aurora: THEME_PRESET_AURORA,
  frost: THEME_PRESET_FROST,
}

const cssPath = resolve(process.cwd(), 'dist/stl.css')

let css: string
try {
  css = readFileSync(cssPath, 'utf8')
} catch {
  console.error(`ERROR: ${cssPath} not found. Run build:js first.`)
  process.exit(1)
}

console.log('Injecting themes into stl.css...')

let count = 0
for (const [id, options] of Object.entries(THEMES)) {
  const themeCss = generateThemeCss(options, id)
  css = injectThemeIntoStylesheet(css, themeCss, id)
  console.log(`  ✓ ${id}`)
  count++
}

writeFileSync(cssPath, css, 'utf8')
console.log(`Injected ${count} themes into stl.css`)
