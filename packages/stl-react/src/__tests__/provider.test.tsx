import { render, screen, renderHook } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import type { ReactNode } from "react"

// Mock @vlting/stl
vi.mock("@vlting/stl", () => {
  const conditionsMap: Record<string, any> = {
    ltr: true,
    rtl: true,
    light: "COLOR_MODE === light",
    dark: "COLOR_MODE === dark",
    debug: "debugmode",
    xl: true,
    lg: true,
    md: true,
    sm: true,
    xs: true,
    "!xl": true,
    "!lg": true,
    "!md": true,
    "!sm": true,
    "!xs": true,
    hightContrast: "(prefers-contrast: more)",
    lowMotion: "(prefers-reduced-motion)",
    lowData: "(prefers-reduced-data)",
    touch: "(hover: none)",
    pointer: "(hover: hover) and (pointer: fine)",
    tv: "(hover: hover) and (pointer: coarse)",
    "!hightContrast": "(prefers-contrast: more)",
    "!lowMotion": "(prefers-reduced-motion)",
    "!lowData": "(prefers-reduced-data)",
    "!touch": "(hover: none)",
    "!pointer": "(hover: hover) and (pointer: fine)",
    "!tv": "(hover: hover) and (pointer: coarse)",
  }

  return {
    DEFAULT_COLOR_MODE: "light",
    conditionsMap,
    conditionKeys: Object.keys(conditionsMap),
    mapConditions: (
      conditions: Record<string, boolean>,
      colorMode: string,
      debug = false,
      direction = "ltr",
    ) => ({
      ...conditions,
      "!xl": !conditions.xl,
      "!lg": !conditions.lg,
      "!md": !conditions.md,
      "!sm": !conditions.sm,
      "!xs": !conditions.xs,
      ltr: direction === "ltr",
      rtl: direction === "rtl",
      "!hightContrast": !conditions.hightContrast,
      "!lowMotion": !conditions.lowMotion,
      "!lowData": !conditions.lowData,
      "!touch": !conditions.touch,
      "!pointer": !conditions.pointer,
      "!tv": !conditions.tv,
      light: colorMode === "light",
      dark: colorMode === "dark",
      debug,
    }),
    queryConditionsMap: {
      hightContrast: "(prefers-contrast: more)",
      lowMotion: "(prefers-reduced-motion)",
      lowData: "(prefers-reduced-data)",
      touch: "(hover: none)",
      pointer: "(hover: hover) and (pointer: fine)",
      tv: "(hover: hover) and (pointer: coarse)",
    },
    observerConditionsMap: {
      xl: 1699,
      lg: 1399,
      md: 1099,
      sm: 799,
      xs: 599,
    },
    style: () => ({
      style: {},
      className: "mock-class",
      debug: undefined,
    }),
    StyleManager: class {
      useClassName() {}
      setNewStyle() {}
      processCss() {}
      processVariantCss() {}
      processOverridesCss() {}
      compile() {
        return { style: {}, className: "mock-class", debug: undefined }
      }
    },
    capitalizeFirstLetter: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
    getThemeOverrides: () => ({ overrides: {}, style: {} }),
    tokenValue: {
      animation: {},
      border: {},
      color: {},
      column: {},
      font: {},
      fontFamily: {},
      fontSize: {},
      fontWeight: {},
      lineHeight: {},
      outline: {},
      radius: {},
      row: {},
      shadow: {},
      size: {},
      space: {},
      textDecoration: {},
      typoSpace: {},
      typo: {},
      zIndex: {},
    },
  }
})

import { StlProvider, StlContext, CssConditionsContext } from "../providers/StlProvider"
import { useContext } from "react"

describe("StlProvider", () => {
  it("renders children", () => {
    render(
      <StlProvider>
        <div>child content</div>
      </StlProvider>,
    )
    expect(screen.getByText("child content")).toBeInTheDocument()
  })

  it("provides color mode context with default light mode", () => {
    function Consumer() {
      const { colorMode, isDark } = useContext(StlContext)
      return (
        <div>
          <span data-testid="mode">{colorMode}</span>
          <span data-testid="dark">{String(isDark)}</span>
        </div>
      )
    }

    render(
      <StlProvider>
        <Consumer />
      </StlProvider>,
    )

    expect(screen.getByTestId("mode").textContent).toBe("light")
    expect(screen.getByTestId("dark").textContent).toBe("false")
  })

  it("accepts defaultColorMode prop", () => {
    function Consumer() {
      const { colorMode } = useContext(StlContext)
      return <span data-testid="mode">{colorMode}</span>
    }

    render(
      <StlProvider defaultColorMode="dark">
        <Consumer />
      </StlProvider>,
    )

    expect(screen.getByTestId("mode").textContent).toBe("dark")
  })

  it("provides conditions context", () => {
    function Consumer() {
      const conditions = useContext(CssConditionsContext)
      return <span data-testid="has-light">{String(conditions.light)}</span>
    }

    render(
      <StlProvider>
        <Consumer />
      </StlProvider>,
    )

    expect(screen.getByTestId("has-light").textContent).toBe("true")
  })

  it("provides setColorMode and toggleColorMode functions", () => {
    const { result } = renderHook(
      () => useContext(StlContext),
      {
        wrapper: ({ children }: { children: ReactNode }) => (
          <StlProvider>{children}</StlProvider>
        ),
      },
    )

    expect(typeof result.current.setColorMode).toBe("function")
    expect(typeof result.current.toggleColorMode).toBe("function")
  })

  it("provides isTouchDevice value", () => {
    const { result } = renderHook(
      () => useContext(StlContext),
      {
        wrapper: ({ children }: { children: ReactNode }) => (
          <StlProvider>{children}</StlProvider>
        ),
      },
    )

    expect(typeof result.current.isTouchDevice).toBe("boolean")
  })

  it("provides tokenValue", () => {
    const { result } = renderHook(
      () => useContext(StlContext),
      {
        wrapper: ({ children }: { children: ReactNode }) => (
          <StlProvider>{children}</StlProvider>
        ),
      },
    )

    expect(result.current.tokenValue).toBeDefined()
    expect(typeof result.current.tokenValue).toBe("object")
  })

  it("accepts breakpointOverrides prop without error", () => {
    render(
      <StlProvider breakpointOverrides={{ sm: 600, md: 900 }}>
        <div>with overrides</div>
      </StlProvider>,
    )
    expect(screen.getByText("with overrides")).toBeInTheDocument()
  })
})
