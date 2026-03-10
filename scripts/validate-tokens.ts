/**
 * Token Validation Script
 *
 * Scans component/primitive source for hardcoded px/hex/rgb/hsl values
 * that should use STL tokens instead.
 *
 * Usage: npx tsx scripts/validate-tokens.ts
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'

const ROOT = join(__dirname, '..')
const SCAN_DIRS = [
  join(ROOT, 'packages/components'),
  join(ROOT, 'packages/primitives'),
]

// Patterns that indicate hardcoded values
const VIOLATIONS = [
  { pattern: /#[0-9a-fA-F]{3,8}\b/, name: 'hex color', exclude: /\/\// },
  { pattern: /rgb\(/, name: 'rgb() color' },
  { pattern: /rgba\(/, name: 'rgba() color' },
  { pattern: /hsl\(/, name: 'hsl() color' },
  { pattern: /hsla\(/, name: 'hsla() color' },
  {
    pattern: /:\s*["']?\d+px["']?/,
    name: 'hardcoded px',
    exclude: /border.*1px|0px|var\(--|\/\/|strokeWidth|viewBox/,
  },
]

// Files to skip
const SKIP = [
  '.test.', '.spec.', '.md', 'api-mapping.json', '__test',
  'node_modules', 'dist', '.d.ts',
]

interface Violation {
  file: string
  line: number
  type: string
  content: string
}

function shouldSkip(path: string): boolean {
  return SKIP.some(s => path.includes(s))
}

function scanFile(filePath: string): Violation[] {
  if (shouldSkip(filePath)) return []
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return []

  const content = readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const violations: Violation[] = []
  const relPath = relative(ROOT, filePath)

  lines.forEach((line, i) => {
    // Skip import lines, comments, type definitions
    if (line.trim().startsWith('import ')) return
    if (line.trim().startsWith('//')) return
    if (line.trim().startsWith('*')) return
    if (line.trim().startsWith('type ')) return
    if (line.trim().startsWith('interface ')) return
    if (line.trim().startsWith('export type')) return

    for (const v of VIOLATIONS) {
      if (v.pattern.test(line)) {
        if (v.exclude && v.exclude.test(line)) continue
        violations.push({
          file: relPath,
          line: i + 1,
          type: v.name,
          content: line.trim().slice(0, 100),
        })
      }
    }
  })

  return violations
}

function scanDir(dir: string): Violation[] {
  const violations: Violation[] = []

  function walk(d: string) {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry)
      if (shouldSkip(full)) continue
      const stat = statSync(full)
      if (stat.isDirectory()) walk(full)
      else violations.push(...scanFile(full))
    }
  }

  walk(dir)
  return violations
}

// Run
const allViolations: Violation[] = []
for (const dir of SCAN_DIRS) {
  allViolations.push(...scanDir(dir))
}

if (allViolations.length === 0) {
  console.log('✓ No token violations found')
  process.exit(0)
}

// Group by type
const grouped = new Map<string, Violation[]>()
for (const v of allViolations) {
  const list = grouped.get(v.type) || []
  list.push(v)
  grouped.set(v.type, list)
}

console.log(`\n✗ Found ${allViolations.length} token violations:\n`)
for (const [type, violations] of grouped) {
  console.log(`  ${type} (${violations.length}):`)
  for (const v of violations.slice(0, 10)) {
    console.log(`    ${v.file}:${v.line} — ${v.content}`)
  }
  if (violations.length > 10) {
    console.log(`    ... and ${violations.length - 10} more`)
  }
  console.log()
}

process.exit(1)
