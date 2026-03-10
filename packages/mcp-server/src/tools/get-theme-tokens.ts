import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..', '..', '..', '..')

interface TokenEntry {
  name: string
  cssVar: string
  defaultValue: string | number
}

interface TokenCategory {
  category: string
  description: string
  tokens: TokenEntry[]
}

function parseScaleFile(filePath: string, category: string, description: string): TokenCategory {
  const tokens: TokenEntry[] = []
  try {
    const content = readFileSync(filePath, 'utf8')
    const entries = content.matchAll(/['"]?(\w+)['"]?\s*:\s*(['"]?[^,}\n]+['"]?)/g)
    for (const [, key, rawValue] of entries) {
      const value = rawValue.trim().replace(/['",]/g, '')
      if (key && value && !key.startsWith('//') && key !== 'const' && key !== 'export' && key !== 'type') {
        tokens.push({
          name: key,
          cssVar: `--stl-${category}-${key}`,
          defaultValue: isNaN(Number(value)) ? value : Number(value),
        })
      }
    }
  } catch {
    // File not found or parse error
  }
  return { category, description, tokens }
}

export function handleGetThemeTokens(): TokenCategory[] {
  const scalesDir = resolve(root, 'packages/stl/src/config/scales')
  const categories: TokenCategory[] = []

  const scaleFiles: Array<[string, string, string]> = [
    ['size.ts', 'size', 'Size tokens for width, height, and layout'],
    ['space.ts', 'space', 'Spacing tokens for margin, padding, and gap'],
    ['radius.ts', 'radius', 'Border radius tokens'],
    ['color.ts', 'color', 'Semantic color tokens'],
    ['shadow.ts', 'shadow', 'Box shadow tokens'],
    ['animation.ts', 'animation', 'Animation duration and easing tokens'],
    ['border.ts', 'border', 'Border width tokens'],
    ['outline.ts', 'outline', 'Outline width and offset tokens'],
    ['fontSize.ts', 'fontSize', 'Font size tokens'],
    ['zIndex.ts', 'zIndex', 'Z-index layering tokens'],
  ]

  for (const [file, category, description] of scaleFiles) {
    const result = parseScaleFile(resolve(scalesDir, file), category, description)
    if (result.tokens.length > 0) {
      categories.push(result)
    }
  }

  // CSS custom properties from brand injection
  try {
    const injectFile = readFileSync(resolve(root, 'packages/design-tokens/brands/inject.ts'), 'utf8')
    const varPrefix = injectFile.match(/VAR_PREFIX\s*=\s*'([^']+)'/)?.[1] || '--vlt'
    categories.push({
      category: 'brand-vars',
      description: `CSS custom properties injected by injectBrandVars() with prefix "${varPrefix}"`,
      tokens: [
        { name: 'color-1…12', cssVar: `${varPrefix}-color-{1..12}`, defaultValue: 'Neutral palette steps' },
        { name: '{accent}-1…12', cssVar: `${varPrefix}-{accent}-{1..12}`, defaultValue: 'Accent palette steps' },
        { name: 'shadow-{level}', cssVar: `${varPrefix}-shadow-{sm|md|lg|xl|2xl}`, defaultValue: 'Shadow values' },
        { name: 'font-heading', cssVar: `${varPrefix}-font-heading`, defaultValue: 'Heading font family' },
        { name: 'font-body', cssVar: `${varPrefix}-font-body`, defaultValue: 'Body font family' },
        { name: 'font-mono', cssVar: `${varPrefix}-font-mono`, defaultValue: 'Monospace font family' },
      ],
    })
  } catch {
    // inject.ts not found
  }

  return categories
}
