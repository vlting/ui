/** Breakpoint thresholds (px) — matches STL web breakpoints */
export const observerConditionsMap = {
  xl: 1699.9987654321,
  lg: 1399.9987654321,
  md: 1099.9987654321,
  sm: 799.9987654321,
  xs: 599.9987654321,
} as const

/** Bit positions for each condition in the condition mask */
export const CondBit = {
  xs: 1 << 0,
  sm: 1 << 1,
  md: 1 << 2,
  lg: 1 << 3,
  xl: 1 << 4,
  dark: 1 << 5,
  rtl: 1 << 6,
  lowMotion: 1 << 7,
  touch: 1 << 8,
  hightContrast: 1 << 9,
  pointer: 1 << 10,
  tv: 1 << 11,
  "!xs": 1 << 12,
  "!sm": 1 << 13,
  "!md": 1 << 14,
  "!lg": 1 << 15,
  "!xl": 1 << 16,
  light: 1 << 17,
  ltr: 1 << 18,
  "!hightContrast": 1 << 19,
  "!lowMotion": 1 << 20,
  "!touch": 1 << 21,
  "!pointer": 1 << 22,
  "!tv": 1 << 23,
  lowData: 1 << 24,
  "!lowData": 1 << 25,
  debug: 1 << 26,
  hovered: 1 << 27,
  pressed: 1 << 28,
  focused: 1 << 29,
} as const

export type ConditionKeys = keyof typeof CondBit
export type ConditionMask = number

/** Condition keys that are relevant on RN (excludes purely web conditions) */
export const nativeConditionKeys = Object.keys(CondBit) as ConditionKeys[]

/** Computes a bitmask from a set of active conditions */
export function computeConditionMask(conditions: Partial<Record<ConditionKeys, boolean>>): ConditionMask {
  let mask = 0
  for (const key of nativeConditionKeys) {
    if (conditions[key]) {
      mask |= CondBit[key]
    }
  }
  return mask
}

/** Checks if all bits in `required` are set in `mask` */
export function maskMatches(mask: ConditionMask, required: ConditionMask): boolean {
  return (mask & required) === required
}
