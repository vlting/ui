#!/usr/bin/env node

/**
 * @vlting/stl CLI — theme scaffolding and CSS generation.
 *
 * init-theme:  handled inline (writes template, no TS needed)
 * build-theme: delegates to tsx (loads user's stl.theme.ts)
 */

import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const command = args[0]

// ─── Help ────────────────────────────────────────────────────────────────────

if (!command || command === '--help' || command === '-h') {
  console.log(`
  @vlting/stl theme CLI

  Commands:
    init-theme    Scaffold stl.theme.ts in the current directory
    build-theme   Generate themed CSS from stl.theme.ts

  Options (build-theme):
    --out-dir <path>   Output directory (overrides config.outDir)

  Examples:
    npx @vlting/stl init-theme
    npx @vlting/stl build-theme
    npx @vlting/stl build-theme --out-dir public
`)
  process.exit(0)
}

// ─── init-theme ──────────────────────────────────────────────────────────────

if (command === 'init-theme') {
  const target = resolve(process.cwd(), 'stl.theme.ts')

  if (existsSync(target)) {
    console.error('stl.theme.ts already exists. Delete it first to re-scaffold.')
    process.exit(1)
  }

  const templatePath = join(__dirname, '..', 'src', 'cli', 'theme-template.txt')
  const template = readFileSync(templatePath, 'utf8')
  writeFileSync(target, template, 'utf8')
  console.log('Created stl.theme.ts')
  console.log('Edit your theme, then run: npx @vlting/stl build-theme')
  process.exit(0)
}

// ─── build-theme ─────────────────────────────────────────────────────────────

if (command === 'build-theme') {
  const cliScript = join(__dirname, '..', 'src', 'cli', 'build-theme.ts')
  try {
    execFileSync('npx', ['--yes', 'tsx', cliScript, ...args.slice(1)], {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
  } catch (e) {
    process.exit(e.status || 1)
  }
  process.exit(0)
}

console.error(`Unknown command: ${command}. Run --help for usage.`)
process.exit(1)
