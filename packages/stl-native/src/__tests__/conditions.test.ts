import { CondBit, computeConditionMask, maskMatches } from '../config/conditions'

describe('CondBit', () => {
  it('assigns unique bit positions', () => {
    const values = Object.values(CondBit)
    const unique = new Set(values)
    expect(unique.size).toBe(values.length)
  })

  it('each value is a power of two', () => {
    for (const value of Object.values(CondBit)) {
      expect(value & (value - 1)).toBe(0)
      expect(value).toBeGreaterThan(0)
    }
  })
})

describe('computeConditionMask', () => {
  it('returns 0 for empty conditions', () => {
    expect(computeConditionMask({})).toBe(0)
  })

  it('returns 0 when all conditions are false', () => {
    expect(computeConditionMask({ xs: false, dark: false, rtl: false })).toBe(0)
  })

  it('sets a single condition bit', () => {
    const mask = computeConditionMask({ dark: true })
    expect(mask).toBe(CondBit.dark)
  })

  it('combines multiple condition bits', () => {
    const mask = computeConditionMask({ xs: true, dark: true, rtl: true })
    expect(mask).toBe(CondBit.xs | CondBit.dark | CondBit.rtl)
  })

  it('ignores false conditions in a mixed set', () => {
    const mask = computeConditionMask({ xs: true, sm: false, dark: true })
    expect(mask & CondBit.xs).toBeTruthy()
    expect(mask & CondBit.dark).toBeTruthy()
    expect(mask & CondBit.sm).toBe(0)
  })

  it('handles interaction bits (hovered, pressed, focused)', () => {
    const mask = computeConditionMask({ hovered: true, pressed: true, focused: true })
    expect(mask).toBe(CondBit.hovered | CondBit.pressed | CondBit.focused)
  })

  it('handles inverted breakpoint conditions', () => {
    const mask = computeConditionMask({ '!xs': true, '!sm': true })
    expect(mask).toBe(CondBit['!xs'] | CondBit['!sm'])
  })
})

describe('maskMatches', () => {
  it('returns true when required is 0 (base condition)', () => {
    expect(maskMatches(0, 0)).toBe(true)
    expect(maskMatches(CondBit.dark, 0)).toBe(true)
  })

  it('returns true when mask contains all required bits', () => {
    const mask = CondBit.xs | CondBit.dark | CondBit.rtl
    expect(maskMatches(mask, CondBit.dark)).toBe(true)
    expect(maskMatches(mask, CondBit.xs | CondBit.dark)).toBe(true)
    expect(maskMatches(mask, CondBit.xs | CondBit.dark | CondBit.rtl)).toBe(true)
  })

  it('returns false when mask is missing required bits', () => {
    const mask = CondBit.xs | CondBit.dark
    expect(maskMatches(mask, CondBit.rtl)).toBe(false)
    expect(maskMatches(mask, CondBit.xs | CondBit.rtl)).toBe(false)
  })

  it('returns false when mask is 0 but required is non-zero', () => {
    expect(maskMatches(0, CondBit.dark)).toBe(false)
  })

  it('correctly handles interaction state bits', () => {
    const mask = CondBit.light | CondBit.hovered
    expect(maskMatches(mask, CondBit.hovered)).toBe(true)
    expect(maskMatches(mask, CondBit.pressed)).toBe(false)
    expect(maskMatches(mask, CondBit.hovered | CondBit.light)).toBe(true)
  })
})
