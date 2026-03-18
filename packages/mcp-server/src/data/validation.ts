/**
 * Rule-based code validation against @vlting/ui design system rules.
 */

export interface ValidationIssue {
  rule: string
  message: string
  line?: number
  suggestion: string
}

interface ValidationRule {
  name: string
  pattern: RegExp
  message: string
  suggestion: string
}

const rules: ValidationRule[] = [
  // Hardcoded colors
  {
    name: 'no-hardcoded-colors',
    pattern:
      /(?:color|backgroundColor|borderColor|background)\s*[:=]\s*["']#[0-9a-fA-F]{3,8}["']/g,
    message: 'Hardcoded color value detected. Use semantic tokens instead.',
    suggestion: 'Replace with a token like "$color", "$background", "$borderColor"',
  },
  {
    name: 'no-hardcoded-rgb',
    pattern:
      /(?:color|backgroundColor|borderColor|background)\s*[:=]\s*["'](?:rgb|rgba|hsl)\(/g,
    message: 'Hardcoded color function detected. Use semantic tokens instead.',
    suggestion: 'Replace with a token like "$color", "$background"',
  },
  {
    name: 'no-named-colors',
    pattern:
      /(?:color|backgroundColor)\s*[:=]\s*["'](?:red|blue|green|gray|grey|white|black|orange|yellow|purple|pink)["']/g,
    message: 'Named color used. Use semantic tokens for brand compatibility.',
    suggestion:
      'Replace with "$color", "$colorSubtitle", or a palette token like "$aqua9"',
  },
  // Hardcoded spacing
  {
    name: 'no-pixel-spacing',
    pattern:
      /(?:padding|margin|gap|top|right|bottom|left|width|height)\s*[:=]\s*\{?\s*\d+\s*\}?(?!\s*[/*])/g,
    message: 'Numeric spacing value detected. Use token values.',
    suggestion: 'Replace with "$1" (4px), "$2" (8px), "$3" (12px), "$4" (16px), etc.',
  },
  // Hardcoded radius
  {
    name: 'no-pixel-radius',
    pattern: /borderRadius\s*[:=]\s*\{?\s*\d+\s*\}?/g,
    message: 'Numeric border radius detected. Use radius tokens.',
    suggestion:
      'Replace with "$2" (4px), "$3" (6px), "$4" (8px), "$6" (12px), "$full" (pill)',
  },
  // Missing accessibility
  {
    name: 'input-needs-label',
    pattern: /<Input(?!\s+(?:[^>]*(?:id|aria-label)))[^>]*\/?\s*>/g,
    message: 'Input without id or aria-label. Inputs must be labelled.',
    suggestion:
      'Add id="..." and pair with <Label htmlFor="..."> or add aria-label="..."',
  },
  {
    name: 'dialog-needs-title',
    pattern: /<Dialog\.Content[\s\S]*?(?:<\/Dialog\.Content>)/g,
    message: 'Check that Dialog.Content includes Dialog.Title for accessibility.',
    suggestion: 'Add <Dialog.Title> inside Dialog.Content',
  },
  // Wrong event handlers (cross-platform)
  {
    name: 'no-onclick',
    pattern: /\bonClick\s*[={]/g,
    message: 'onClick is web-only. Use onPress for cross-platform compatibility.',
    suggestion: 'Replace onClick with onPress',
  },
  {
    name: 'no-onchange-input',
    pattern: /<(?:Input|Textarea)[^>]*\bonChange\s*[={]/g,
    message: 'onChange is web-only on Input/Textarea. Use onChangeText.',
    suggestion: 'Replace onChange with onChangeText',
  },
  // Dark mode considerations
  {
    name: 'no-hardcoded-background-white',
    pattern:
      /(?:backgroundColor|background)\s*[:=]\s*["'](?:white|#fff(?:fff)?|#FFF(?:FFF)?)["']/g,
    message: 'Hardcoded white background breaks dark mode. Use semantic tokens.',
    suggestion:
      'Replace with "$background" or "var(--background)" for automatic dark mode support',
  },
  {
    name: 'no-hardcoded-text-black',
    pattern: /\bcolor\s*[:=]\s*["'](?:black|#000(?:000)?)["']/g,
    message: 'Hardcoded black text color breaks dark mode. Use semantic tokens.',
    suggestion: 'Replace with "$color" or "var(--color)" for automatic dark mode support',
  },
  {
    name: 'missing-aria-label-button',
    pattern:
      /<(?:Button|Pressable|TouchableOpacity)(?!\s+(?:[^>]*(?:aria-label|accessibilityLabel)))[^>]*>[^<]*(?:<[^/]|$)/g,
    message: 'Interactive element may be missing an accessible label.',
    suggestion: 'Add aria-label="..." or include visible text content for screen readers',
  },
  // Anti-patterns
  {
    name: 'no-classname',
    pattern: /\bclassName\s*[={]/g,
    message: 'className is not supported in @vlting/ui. Use STL style props.',
    suggestion: 'Replace className with inline style props (padding="$4", etc.)',
  },
  {
    name: 'no-style-object-pixels',
    pattern: /style\s*=\s*\{\s*\{[^}]*(?:px|em|rem)/g,
    message: 'CSS units in style object. Use design token values instead.',
    suggestion: 'Replace "16px" with "$4", "8px" with "$2", etc.',
  },
]

export function validateCode(code: string): {
  valid: boolean
  issues: ValidationIssue[]
} {
  const issues: ValidationIssue[] = []

  for (const rule of rules) {
    // Reset regex lastIndex for global patterns
    rule.pattern.lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = rule.pattern.exec(code)) !== null) {
      // Find line number
      const beforeMatch = code.slice(0, match.index)
      const lineNumber = beforeMatch.split('\n').length

      issues.push({
        rule: rule.name,
        message: rule.message,
        line: lineNumber,
        suggestion: rule.suggestion,
      })
    }
  }

  // Deduplicate by rule + line
  const seen = new Set<string>()
  const unique = issues.filter((issue) => {
    const key = `${issue.rule}:${issue.line}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return {
    valid: unique.length === 0,
    issues: unique,
  }
}
