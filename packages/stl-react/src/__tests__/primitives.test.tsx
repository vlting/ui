import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

// Mock @vlting/stl before importing components
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
    style: (_css: any, _conditions: any) => ({
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

import {
  Box,
  Row,
  Column,
  Grid,
  Text,
  Heading,
  SubHeading,
  Link,
  Image,
  Pressable,
  ScrollView,
  List,
  OList,
  ListItem,
  FlexList,
  FlexListItem,
} from "../primitives"

describe("Primitives", () => {
  it("Box renders with children", () => {
    render(<Box>content</Box>)
    expect(screen.getByText("content")).toBeInTheDocument()
  })

  it("Row renders with children", () => {
    render(<Row>row content</Row>)
    expect(screen.getByText("row content")).toBeInTheDocument()
  })

  it("Column renders with children", () => {
    render(<Column>column content</Column>)
    expect(screen.getByText("column content")).toBeInTheDocument()
  })

  it("Grid renders with children", () => {
    render(<Grid>grid content</Grid>)
    expect(screen.getByText("grid content")).toBeInTheDocument()
  })

  it("Grid accepts columns and gap props", () => {
    render(
      <Grid columns={3} gap={16}>
        grid item
      </Grid>,
    )
    expect(screen.getByText("grid item")).toBeInTheDocument()
  })

  it("Text renders with children", () => {
    render(<Text>text content</Text>)
    expect(screen.getByText("text content")).toBeInTheDocument()
  })

  it("Heading renders with children", () => {
    render(<Heading>heading content</Heading>)
    expect(screen.getByText("heading content")).toBeInTheDocument()
  })

  it("SubHeading renders with children", () => {
    render(<SubHeading>subheading content</SubHeading>)
    expect(screen.getByText("subheading content")).toBeInTheDocument()
  })

  it("Link renders with children and href", () => {
    render(<Link href="https://example.com">click me</Link>)
    const link = screen.getByText("click me")
    expect(link).toBeInTheDocument()
    expect(link.closest("a")).toHaveAttribute("href", "https://example.com")
  })

  it("Image renders with alt text", () => {
    render(<Image alt="test image" src="/test.png" />)
    expect(screen.getByAltText("test image")).toBeInTheDocument()
  })

  it("Pressable renders as button", () => {
    render(<Pressable>press me</Pressable>)
    const button = screen.getByText("press me")
    expect(button).toBeInTheDocument()
    expect(button.closest("button")).toBeTruthy()
  })

  it("ScrollView renders with children", () => {
    render(<ScrollView>scroll content</ScrollView>)
    expect(screen.getByText("scroll content")).toBeInTheDocument()
  })

  it("List renders with children", () => {
    render(
      <List>
        <li>item</li>
      </List>,
    )
    expect(screen.getByText("item")).toBeInTheDocument()
  })

  it("OList renders with children", () => {
    render(
      <OList>
        <li>ordered item</li>
      </OList>,
    )
    expect(screen.getByText("ordered item")).toBeInTheDocument()
  })

  it("ListItem renders with children", () => {
    render(<ListItem>list item content</ListItem>)
    expect(screen.getByText("list item content")).toBeInTheDocument()
  })

  it("FlexList renders with children", () => {
    render(
      <FlexList>
        <li>flex item</li>
      </FlexList>,
    )
    expect(screen.getByText("flex item")).toBeInTheDocument()
  })

  it("FlexListItem renders with children", () => {
    render(<FlexListItem>flex list item</FlexListItem>)
    expect(screen.getByText("flex list item")).toBeInTheDocument()
  })

  it("primitives accept css prop without error", () => {
    render(<Box css={{ padding: "10px" }}>styled box</Box>)
    expect(screen.getByText("styled box")).toBeInTheDocument()
  })

  it("Pressable handles onClick", () => {
    const handleClick = vi.fn()
    render(<Pressable onClick={handleClick}>click</Pressable>)
    screen.getByText("click").click()
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
