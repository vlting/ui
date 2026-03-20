/**
 * Build-theme CLI worker — run via tsx from bin/stl.mjs.
 *
 * Reads stl.theme.ts from the user's project, generates scoped CSS
 * for each theme, and writes the augmented stl.css to the output dir.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { createRequire } from 'module'
import { resolve, join } from 'path'

// Import from compiled dist — not source — to avoid Vanilla Extract fileScope errors.
// Resolve the package dir, then load the CJS dist directly.
const require_ = createRequire(resolve(process.cwd(), 'package.json'))
const stlPkgJson = require_.resolve('@vlting/stl/package.json')
const stlDir = stlPkgJson.replace(/\/package\.json$/, '')
const stl = require_(join(stlDir, 'dist', 'stl.js'))
const { generateThemeCss, injectThemeIntoStylesheet } = stl

const args = process.argv.slice(2)
const cwd = process.cwd()

// ─── Load user config ────────────────────────────────────────────────────────

const configPath = resolve(cwd, 'stl.theme.ts')
if (!existsSync(configPath)) {
  console.error('stl.theme.ts not found. Run `npx @vlting/stl init-theme` first.')
  process.exit(1)
}

// tsx handles the TS import
const userConfig = require_(configPath)
const themes: Record<string, any> = userConfig.themes
const config: { outDir?: string } = userConfig.config ?? {}

if (!themes || Object.keys(themes).length === 0) {
  console.error('No themes found in stl.theme.ts. Export a `themes` record.')
  process.exit(1)
}

// ─── Resolve output dir ──────────────────────────────────────────────────────

const outDirIdx = args.indexOf('--out-dir')
const outDir = outDirIdx !== -1 && args[outDirIdx + 1]
  ? resolve(cwd, args[outDirIdx + 1])
  : resolve(cwd, config.outDir ?? 'public')

// ─── Find base CSS ──────────────────────────────────────────────────────────

const baseCssPath = join(stlDir, 'dist', 'stl.css')
if (!existsSync(baseCssPath)) {
  console.error(`Base CSS not found at ${baseCssPath}`)
  console.error('Is @vlting/stl built? Run `yarn build` in the stl package first.')
  process.exit(1)
}

// ─── Generate ────────────────────────────────────────────────────────────────

// Always start from pristine base CSS (idempotent)
let css = readFileSync(baseCssPath, 'utf8')

console.log('Building themed CSS...')

let count = 0
for (const [id, options] of Object.entries(themes)) {
  const themeCss = generateThemeCss(options, id)
  css = injectThemeIntoStylesheet(css, themeCss, id)
  console.log(`  + ${id}`)
  count++
}

// ─── Write output ────────────────────────────────────────────────────────────

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true })
}

const outPath = join(outDir, 'stl.css')
writeFileSync(outPath, css, 'utf8')
console.log(`Wrote ${outPath} (${count} theme${count !== 1 ? 's' : ''})`)
