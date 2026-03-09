import { describe, it, expect, beforeEach } from "vitest"
import { createNativeTheme, configureTheme, getTheme } from "../config/theme"

describe("createNativeTheme", () => {
  it("returns an object with light and dark token maps", () => {
    const theme = createNativeTheme()
    expect(theme).toHaveProperty("light")
    expect(theme).toHaveProperty("dark")
    expect(theme).toHaveProperty("id")
  })

  it("light and dark both have all expected scales", () => {
    const theme = createNativeTheme()
    const expectedScales = [
      "color", "space", "size", "fontSize", "fontWeight",
      "fontFamily", "lineHeight", "radius", "zIndex", "typoSpace",
    ]
    for (const mode of [theme.light, theme.dark] as const) {
      for (const scale of expectedScales) {
        expect(mode).toHaveProperty(scale)
        expect(typeof mode[scale as keyof typeof mode]).toBe("object")
      }
    }
  })

  it("space tokens use the configured base", () => {
    const theme = createNativeTheme({ space: { base: 8 } })
    expect(theme.light.space.$4).toBe(8) // $4 = base
    expect(theme.light.space.$8).toBe(16) // $8 = base * 2
    expect(theme.light.space.$0).toBe(0)
  })

  it("uses default base of 4 for space", () => {
    const theme = createNativeTheme()
    expect(theme.light.space.$4).toBe(4)
    expect(theme.light.space.$8).toBe(8)
  })

  it("fontSize tokens use the configured base", () => {
    const theme = createNativeTheme({ fontSize: { base: 14 } })
    expect(theme.light.fontSize.$16).toBe(14) // $16 = base
    expect(theme.light.fontSize.$p).toBe(14)
  })

  it("radius tokens use the configured base", () => {
    const theme = createNativeTheme({ radius: { base: 8 } })
    expect(theme.light.radius.$4).toBe(8)
    expect(theme.light.radius.$8).toBe(16)
    expect(theme.light.radius.$round).toBe(9999)
  })

  it("generates different color tokens for light and dark", () => {
    const theme = createNativeTheme()
    // Color tokens should exist on both
    expect(theme.light.color.$primary1).toBeDefined()
    expect(theme.dark.color.$primary1).toBeDefined()
    // Light and dark should differ for most scales
    expect(theme.light.color.$primary1).not.toBe(theme.dark.color.$primary1)
  })

  it("non-color scales are identical between light and dark", () => {
    const theme = createNativeTheme()
    expect(theme.light.space).toBe(theme.dark.space)
    expect(theme.light.fontSize).toBe(theme.dark.fontSize)
    expect(theme.light.radius).toBe(theme.dark.radius)
  })

  it("applies overrides", () => {
    const theme = createNativeTheme({
      overrides: {
        space: { custom: 42 },
        fontSize: { hero: 72 },
      },
    })
    expect(theme.light.space.$custom).toBe(42)
    expect(theme.light.fontSize.$hero).toBe(72)
  })

  it("theme is frozen (immutable)", () => {
    const theme = createNativeTheme()
    expect(Object.isFrozen(theme)).toBe(true)
    expect(Object.isFrozen(theme.light)).toBe(true)
    expect(Object.isFrozen(theme.light.space)).toBe(true)
  })

  it("generates a deterministic id from config", () => {
    const a = createNativeTheme({ space: { base: 4 } })
    const b = createNativeTheme({ space: { base: 4 } })
    expect(a.id).toBe(b.id)

    const c = createNativeTheme({ space: { base: 8 } })
    expect(a.id).not.toBe(c.id)
  })
})

describe("configureTheme / getTheme", () => {
  beforeEach(() => {
    // Reset to default
    configureTheme()
  })

  it("getTheme returns the default theme initially", () => {
    const theme = getTheme()
    expect(theme.light.space.$4).toBe(4)
  })

  it("configureTheme updates the singleton returned by getTheme", () => {
    configureTheme({ space: { base: 8 } })
    const theme = getTheme()
    expect(theme.light.space.$4).toBe(8)
  })

  it("configureTheme can be called multiple times", () => {
    configureTheme({ space: { base: 8 } })
    expect(getTheme().light.space.$4).toBe(8)

    configureTheme({ space: { base: 16 } })
    expect(getTheme().light.space.$4).toBe(16)
  })
})
