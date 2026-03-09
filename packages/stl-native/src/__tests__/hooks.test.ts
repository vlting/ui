import { describe, it, expect, beforeAll } from "vitest"
import { renderHook } from "./renderHook"
import { useColorMode } from "../hooks/useColorMode"
import { useConditions } from "../hooks/useConditions"
import { useRTL } from "../hooks/useRTL"
import { useTokens } from "../hooks/useTokens"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { useTransition } from "../hooks/useTransition"
import { useLayout } from "../hooks/useLayout"
import { configureTheme } from "../config/theme"

beforeAll(() => {
  configureTheme()
})

describe("useColorMode", () => {
  it("returns colorMode, isDark, setColorMode, toggleColorMode", () => {
    const { result } = renderHook(() => useColorMode())
    expect(result).toHaveProperty("colorMode")
    expect(result).toHaveProperty("isDark")
    expect(result).toHaveProperty("setColorMode")
    expect(result).toHaveProperty("toggleColorMode")
    expect(typeof result.setColorMode).toBe("function")
    expect(typeof result.toggleColorMode).toBe("function")
  })

  it("defaults to light mode", () => {
    const { result } = renderHook(() => useColorMode())
    expect(result.colorMode).toBe("light")
    expect(result.isDark).toBe(false)
  })
})

describe("useConditions", () => {
  it("returns a Record<string, boolean>", () => {
    const { result } = renderHook(() => useConditions())
    expect(typeof result).toBe("object")
    for (const value of Object.values(result)) {
      expect(typeof value).toBe("boolean")
    }
  })

  it("contains expected condition keys", () => {
    const { result } = renderHook(() => useConditions())
    const expectedKeys = [
      "xs", "sm", "md", "lg", "xl",
      "dark", "light", "rtl", "ltr",
      "touch", "pointer", "highContrast", "lowMotion",
      "lowData", "tv", "debug",
    ]
    for (const key of expectedKeys) {
      expect(result).toHaveProperty(key)
    }
  })
})

describe("useRTL", () => {
  it("returns ltr value when I18nManager.isRTL is false", () => {
    const { result } = renderHook(() => useRTL("rtl-value", "ltr-value"))
    expect(result).toBe("ltr-value")
  })

  it("returns false by default when no args given", () => {
    const { result } = renderHook(() => useRTL())
    expect(result).toBe(false)
  })
})

describe("useTokens", () => {
  it("returns tokenValue matching the current color mode", () => {
    const { result } = renderHook(() => useTokens())
    expect(result).toHaveProperty("tokenValue")
    expect(result.tokenValue).toHaveProperty("color")
    expect(result.tokenValue).toHaveProperty("space")
    expect(result.tokenValue).toHaveProperty("fontSize")
  })
})

describe("useMediaQuery", () => {
  // The mock sets width=375, height=812

  it("returns true for a min-width query the viewport satisfies", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 300px)", false))
    expect(result).toBe(true)
  })

  it("returns false for a min-width query the viewport fails", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 400px)", true))
    expect(result).toBe(false)
  })

  it("returns true for a max-width query the viewport satisfies", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 400px)", false))
    expect(result).toBe(true)
  })

  it("returns false for a max-width query the viewport fails", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 300px)", true))
    expect(result).toBe(false)
  })

  it("evaluates height queries", () => {
    const { result } = renderHook(() => useMediaQuery("(min-height: 800px)", false))
    expect(result).toBe(true)
  })

  it("handles combined queries with and", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(min-width: 300px) and (max-width: 400px)", false),
    )
    expect(result).toBe(true)
  })

  it("returns default value for unrecognized queries", () => {
    const { result } = renderHook(() => useMediaQuery("(orientation: portrait)", "default"))
    expect(result).toBe("default")
  })

  it("returns custom true/false values", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(min-width: 300px)", "default", "yes", "no"),
    )
    expect(result).toBe("yes")
  })
})

describe("useTransition", () => {
  it("returns active, mounted, and style when visible=true", () => {
    const { result } = renderHook(() => useTransition(true))
    expect(result).toHaveProperty("active")
    expect(result).toHaveProperty("mounted")
    expect(result).toHaveProperty("style")
    expect(result.mounted).toBe(true)
  })

  it("returns mounted=false and active=false when visible=false", () => {
    const { result } = renderHook(() => useTransition(false))
    expect(result.mounted).toBe(false)
    expect(result.active).toBe(false)
  })

  it("style has opacity property", () => {
    const { result } = renderHook(() => useTransition(true))
    expect(result.style).toHaveProperty("opacity")
  })
})

describe("useLayout", () => {
  it("returns an onLayout callback", () => {
    let capturedSize: any = null
    const { result } = renderHook(() =>
      useLayout(null, (size) => { capturedSize = size }),
    )
    expect(result).toHaveProperty("onLayout")
    expect(typeof result.onLayout).toBe("function")
  })

  it("onLayout extracts width and height from event", () => {
    let capturedSize: any = null
    const { result } = renderHook(() =>
      useLayout(null, (size) => { capturedSize = size }),
    )

    // Simulate a LayoutChangeEvent
    result.onLayout({
      nativeEvent: { layout: { x: 0, y: 0, width: 320, height: 480 } },
    } as any)

    expect(capturedSize).toEqual({ width: 320, height: 480 })
  })
})
