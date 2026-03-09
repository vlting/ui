import { useWindowDimensions } from "react-native"

function evaluateQuery(query: string, width: number, height: number): boolean | null {
  const rules = query.split(/\s+and\s+/i)
  for (const rule of rules) {
    const minWidth = rule.match(/\(\s*min-width\s*:\s*(\d+(?:\.\d+)?)\s*px\s*\)/)
    if (minWidth) { if (width < parseFloat(minWidth[1])) return false; continue }

    const maxWidth = rule.match(/\(\s*max-width\s*:\s*(\d+(?:\.\d+)?)\s*px\s*\)/)
    if (maxWidth) { if (width > parseFloat(maxWidth[1])) return false; continue }

    const minHeight = rule.match(/\(\s*min-height\s*:\s*(\d+(?:\.\d+)?)\s*px\s*\)/)
    if (minHeight) { if (height < parseFloat(minHeight[1])) return false; continue }

    const maxHeight = rule.match(/\(\s*max-height\s*:\s*(\d+(?:\.\d+)?)\s*px\s*\)/)
    if (maxHeight) { if (height > parseFloat(maxHeight[1])) return false; continue }

    return null
  }
  return true
}

export function useMediaQuery<T>(
  query: string,
  defaultValue: T,
  trueValue?: T,
  falseValue?: T,
): T | boolean {
  const { width, height } = useWindowDimensions()
  const matches = evaluateQuery(query, width, height)
  if (matches === null) return defaultValue
  return matches ? (trueValue ?? true) : (falseValue ?? false)
}
