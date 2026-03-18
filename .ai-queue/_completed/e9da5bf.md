<!-- LAT: 2026-03-09T14:36:43Z -->
<!-- PID: 5792 -->
<!-- auto-queue -->
<!-- target-branch: feat/stl-primitives/layout-primitives -->
# Task: Create stl-react layout primitives (Spacer, Divider, Separator, AspectRatio)

Create new primitives in `packages/stl-react/src/primitives/` and update exports.

## stl-react `styled()` API
```ts
styled(tag, css, variants?, styleName?)
// variants = { variantName: { value: CSS } }
// Example: styled("div", { display: "flex" }, { size: { sm: { gap: "4px" } } }, "Spacer")
```

## Files to create

### `packages/stl-react/src/primitives/Spacer/Spacer.ts`
```ts
import { styled } from "../../config"

export const Spacer = styled(
  "div",
  { flex: 1 },
  {
    size: {
      xs: { flex: "0 0 auto", width: "2px", height: "2px" },
      sm: { flex: "0 0 auto", width: "4px", height: "4px" },
      md: { flex: "0 0 auto", width: "8px", height: "8px" },
      lg: { flex: "0 0 auto", width: "16px", height: "16px" },
      xl: { flex: "0 0 auto", width: "24px", height: "24px" },
    },
  },
  "Spacer"
)
```

### `packages/stl-react/src/primitives/Divider/Divider.ts`
```ts
import { styled } from "../../config"

export const Divider = styled(
  "hr",
  {
    border: "none",
    margin: "$0",
    height: "1px",
    width: "100%",
    backgroundColor: "$borderColor",
  },
  {
    orientation: {
      horizontal: { height: "1px", width: "100%", marginTop: "$2", marginBottom: "$2" },
      vertical: { width: "1px", height: "100%", marginLeft: "$2", marginRight: "$2" },
    },
  },
  "Divider"
)
```

### `packages/stl-react/src/primitives/Separator/Separator.ts`
A semantic separator with ARIA support. Since stl `styled()` generates class-based components, we need a wrapper for ARIA:
```ts
import { forwardRef } from "react"
import { styled } from "../../config"

const SeparatorBase = styled(
  "hr",
  {
    border: "none",
    margin: "$0",
    height: "1px",
    width: "100%",
    backgroundColor: "$borderColor",
  },
  {
    orientation: {
      horizontal: { height: "1px", width: "100%", marginTop: "$2", marginBottom: "$2" },
      vertical: { width: "1px", height: "100%", marginLeft: "$2", marginRight: "$2" },
    },
  },
  "Separator"
)

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  className?: string
  style?: React.CSSProperties
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ orientation = "horizontal", decorative = false, ...rest }, ref) => {
    return (
      <SeparatorBase
        ref={ref}
        orientation={orientation}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        {...rest}
      />
    )
  }
)
Separator.displayName = "Separator"
```
**Note:** This file should be `.tsx` since it contains JSX.

### `packages/stl-react/src/primitives/AspectRatio/AspectRatio.tsx`
```tsx
import { forwardRef, type CSSProperties, type ReactNode } from "react"

export interface AspectRatioProps {
  ratio?: number
  children?: ReactNode
  style?: CSSProperties
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, children, style }, ref) => (
    <div ref={ref} style={{ position: "relative", width: "100%", paddingBottom: `${100 / ratio}%`, ...style }}>
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
        {children}
      </div>
    </div>
  )
)
AspectRatio.displayName = "AspectRatio"
```

### `packages/stl-react/src/primitives/index.ts`
Add these exports at the end:
```ts
export * from "./Spacer/Spacer"
export * from "./Divider/Divider"
export * from "./Separator/Separator"
export * from "./AspectRatio/AspectRatio"
```

## Acceptance criteria
- All 4 new primitives exist in stl-react
- Separator has ARIA support (role, aria-orientation)
- AspectRatio is pure React (no stl styling)
- Index exports updated
- No @ts-expect-error comments
