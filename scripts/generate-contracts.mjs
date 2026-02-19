/**
 * generate-contracts.mjs
 *
 * Generates a ComponentName.contract.md for every component that has a
 * ComponentName.spec.md, deriving content from the spec file.
 *
 * Usage:  node scripts/generate-contracts.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..', 'src')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Walk a directory recursively and return all files matching a predicate. */
function walk(dir, pred, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      walk(full, pred, results)
    } else if (pred(full)) {
      results.push(full)
    }
  }
  return results
}

/**
 * Extract a named section from a markdown file.
 * Returns the content between "## N. <title>" and the next "---" divider
 * (or end of file), with surrounding whitespace trimmed.
 */
function extractSection(md, titlePattern) {
  const re = new RegExp(
    `##\\s+\\d+\\.\\s+${titlePattern}[\\s\\S]*?(?=\\n---|\n##\\s+\\d+\\.\\s+|$)`,
    'i'
  )
  const m = md.match(re)
  if (!m) return null
  // Remove the heading line itself and leading/trailing blank lines
  return m[0]
    .replace(/^##[^\n]+\n/, '')
    .replace(/^---\s*$/, '')
    .trim()
}

/**
 * Strip markdown headings, leaving just the bullet / paragraph content.
 */
function stripHeadings(text) {
  return text
    .split('\n')
    .filter(l => !l.match(/^#+\s/))
    .join('\n')
    .trim()
}

/**
 * Convert the "States" bullet from spec section 4 into readable guarantee bullets.
 * e.g. "**idle**: chart is rendered" → "- In `idle` state: chart is rendered"
 */
function parseStates(text) {
  return text
    .split('\n')
    .map(l => {
      const m = l.match(/^\s*-\s+\*\*(\w[\w /]+)\*\*:\s*(.+)/)
      if (m) return `- In \`${m[1]}\` state: ${m[2]}`
      return l
    })
    .join('\n')
}

// ---------------------------------------------------------------------------
// Contract template
// ---------------------------------------------------------------------------

function buildContract(componentName, spec) {
  const purpose = extractSection(spec, 'Purpose') ?? ''
  const visual = extractSection(spec, 'Visual Behavior') ?? ''
  const interaction = extractSection(spec, 'Interaction Behavior') ?? ''
  const accessibility = extractSection(spec, 'Accessibility Requirements') ?? ''
  const theming = extractSection(spec, 'Theming Rules') ?? ''
  const composition = extractSection(spec, 'Composition Rules') ?? ''

  // --- Section 1: Public API --------------------------------------------------
  // All stubs extend GetProps<typeof YStack> (Tamagui styled YStack).
  // We list prop categories and pull any explicit props from spec/composition.

  // Extract the single-line value after "What can wrap it:" or the bullet after it
  const wrappedByMatch = composition.match(/What can wrap it[^:]*:\s*([^\n]+)/)
  const wrappedBy = wrappedByMatch?.[1]?.trim() ?? ''
  const containsMatch = composition.match(/What it may contain[^:]*:\s*([^\n]+)/)
  const contains = containsMatch?.[1]?.trim() ?? ''

  // --- Section 2: Behavioral Guarantees ---------------------------------------
  // Extract states block and strip the "States:" heading line
  const stateLines = (interaction.match(/States[\s\S]*?(?=\n-\s+Controlled|\n-\s+Keyboard|\n-\s+Screen|$)/i)?.[0] ?? '')
    .replace(/^-?\s*States[^:]*:\s*/i, '').trim()
  const controlledLine = interaction.match(/Controlled vs uncontrolled[^\n]*/i)?.[0] ?? ''
  const keyboardLine = interaction.match(/Keyboard behavior[^\n]*/i)?.[0] ?? ''
  const srLine = interaction.match(/Screen reader behavior[^\n]*/i)?.[0] ?? ''
  const motionLine = interaction.match(/Motion rules[^\n]*/i)?.[0] ?? ''

  // --- Section 3: Accessibility Guarantees ------------------------------------
  const ariaLine = accessibility.match(/ARIA requirements[^\n]*/i)?.[0] ?? ''
  const focusLine = accessibility.match(/Focus rules[^\n]*/i)?.[0] ?? ''
  const contrastLine = accessibility.match(/Contrast expectations[^\n]*/i)?.[0] ?? ''
  const reducedMotionLine = accessibility.match(/Reduced motion[^\n]*/i)?.[0] ?? ''

  // --- Section 4: Styling Guarantees ------------------------------------------
  const tokensLine = theming.match(/Required tokens[^\n]*/i)?.[0] ?? ''
  const prohibitedLine = theming.match(/Prohibited hardcoded[^\n]*/i)?.[0] ?? ''
  const darkModeLine = theming.match(/Dark mode[^\n]*/i)?.[0] ?? ''
  const layoutLines = visual.match(/Layout rules[^\n]*/i)?.[0] ?? ''
  const responsiveLine = visual.match(/Responsive behavior[^\n]*/i)?.[0] ?? ''

  return `# Component Contract — ${componentName}

## 1. Public API

### Base Props

\`${componentName}\` is implemented as a Tamagui \`styled(YStack)\` and therefore accepts all Tamagui / React Native \`View\` props, including:

| Category | Examples |
|----------|---------|
| Layout | \`width\`, \`height\`, \`minWidth\`, \`maxWidth\`, \`flex\`, \`flexDirection\` |
| Spacing | \`padding\`, \`paddingHorizontal\`, \`margin\`, \`gap\` (space tokens) |
| Visual | \`backgroundColor\`, \`borderColor\`, \`borderRadius\`, \`opacity\` |
| Theme | \`theme\`, \`themeInverse\` |
| Animation | \`animation\`, \`enterStyle\`, \`exitStyle\` |
| Accessibility | \`accessible\`, \`accessibilityLabel\`, \`accessibilityRole\`, \`aria-*\` |
| Events | \`onPress\`, \`onHoverIn\`, \`onHoverOut\`, \`onFocus\`, \`onBlur\` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the \`.spec.md\`.

${(wrappedBy || contains) ? `### Composition Context\n\nIntended to be wrapped by: ${wrappedBy || '_not specified_'}\n\nMay contain: ${contains || '_not specified_'}` : ''}

---

## 2. Behavioral Guarantees

${stripHeadings(parseStates(stateLines)) || '- Renders without error when valid props are supplied.'}
${controlledLine ? `- ${controlledLine.replace(/^-\s+/, '')}` : ''}
${keyboardLine ? `- ${keyboardLine.replace(/^-\s+/, '')}` : ''}
${srLine ? `- ${srLine.replace(/^-\s+/, '')}` : ''}
${motionLine ? `- ${motionLine.replace(/^-\s+/, '')}` : ''}

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

${ariaLine ? `- ${ariaLine.replace(/^-\s+/, '')}` : '- Exposes appropriate ARIA role for its context.'}
${focusLine ? `- ${focusLine.replace(/^-\s+/, '')}` : '- Focus must be visible and never trapped.'}
${contrastLine ? `- ${contrastLine.replace(/^-\s+/, '')}` : '- All visible text meets WCAG AA contrast ratio (4.5:1).'}
${reducedMotionLine ? `- ${reducedMotionLine.replace(/^-\s+/, '')}` : '- Animations are disabled when `prefers-reduced-motion` is set.'}

---

## 4. Styling Guarantees

${tokensLine ? `- ${tokensLine.replace(/^-\s+/, '')}` : '- All styling uses design tokens exclusively.'}
${prohibitedLine ? `- ${prohibitedLine.replace(/^-\s+/, '')}` : '- No hardcoded color, spacing, or font-size values.'}
${darkModeLine ? `- ${darkModeLine.replace(/^-\s+/, '')}` : '- Renders correctly in both light and dark themes.'}
${layoutLines ? `- ${layoutLines.replace(/^-\s+/, '')}` : ''}
${responsiveLine ? `- ${responsiveLine.replace(/^-\s+/, '')}` : ''}
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., \`${componentName}.Item\`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
`
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const specFiles = walk(SRC, f => f.endsWith('.spec.md'))

let generated = 0
let skipped = 0

for (const specPath of specFiles) {
  const dir = dirname(specPath)
  const componentName = basename(dir)
  const contractPath = join(dir, `${componentName}.contract.md`)

  const spec = readFileSync(specPath, 'utf8')
  const contract = buildContract(componentName, spec)

  writeFileSync(contractPath, contract, 'utf8')
  generated++
}

console.log(`✓ Generated ${generated} contract files (skipped ${skipped})`)
