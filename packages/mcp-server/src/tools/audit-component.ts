import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..', '..', '..', '..')

interface Violation {
  file: string
  line: number
  type: 'hardcoded-color' | 'hardcoded-size'
  severity: 'error' | 'warning'
  message: string
  match: string
}

interface AuditResult {
  component: string
  directory: string
  violations: Violation[]
  summary: { total: number; errors: number; warnings: number }
}

const HEX_RE = /#(?:[0-9a-fA-F]{3,8})\b/g
const RGBA_RE = /rgba?\(\s*\d+/g
const HSLA_RE = /hsla?\(\s*\d+/g

function auditFile(filePath: string): Violation[] {
  const violations: Violation[] = []
  const content = readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const relPath = filePath.replace(`${root}/`, '')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNum = i + 1
    if (
      line.trim().startsWith('//') ||
      line.trim().startsWith('*') ||
      line.trim().startsWith('import')
    )
      continue

    for (const match of line.matchAll(HEX_RE)) {
      const before = line.substring(0, match.index)
      if (before.includes('var(') && !before.includes(')')) continue
      violations.push({
        file: relPath,
        line: lineNum,
        type: 'hardcoded-color',
        severity: 'warning',
        message: `Hardcoded hex color "${match[0]}" — use a design token`,
        match: match[0],
      })
    }
    for (const match of line.matchAll(RGBA_RE)) {
      const before = line.substring(0, match.index)
      if (before.includes('var(') && !before.includes(')')) continue
      violations.push({
        file: relPath,
        line: lineNum,
        type: 'hardcoded-color',
        severity: 'warning',
        message: `Hardcoded rgba() — use a design token`,
        match: match[0],
      })
    }
    for (const match of line.matchAll(HSLA_RE)) {
      const before = line.substring(0, match.index)
      if (before.includes('var(') && !before.includes(')')) continue
      violations.push({
        file: relPath,
        line: lineNum,
        type: 'hardcoded-color',
        severity: 'warning',
        message: `Hardcoded hsla() — use a design token`,
        match: match[0],
      })
    }
  }
  return violations
}

export function handleAuditComponent(args: { name: string }): AuditResult {
  const name = args.name
  const dirs = [
    resolve(root, 'packages/components', name),
    resolve(root, 'packages/primitives', name),
    resolve(root, 'packages/blocks', name.toLowerCase()),
  ]
  const dir = dirs.find((d) => existsSync(d))
  if (!dir) {
    return {
      component: name,
      directory: 'not found',
      violations: [],
      summary: { total: 0, errors: 0, warnings: 0 },
    }
  }

  const violations: Violation[] = []
  const files = readdirSync(dir).filter(
    (f) =>
      (f.endsWith('.tsx') || f.endsWith('.ts')) &&
      !f.endsWith('.test.tsx') &&
      !f.endsWith('.spec.ts'),
  )
  for (const file of files) {
    violations.push(...auditFile(resolve(dir, file)))
  }

  return {
    component: name,
    directory: dir.replace(`${root}/`, ''),
    violations,
    summary: {
      total: violations.length,
      errors: violations.filter((v) => v.severity === 'error').length,
      warnings: violations.filter((v) => v.severity === 'warning').length,
    },
  }
}
