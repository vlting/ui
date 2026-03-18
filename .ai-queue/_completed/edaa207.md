<!-- LAT: 2026-03-09T14:46:42Z -->
<!-- PID: 5792 -->
<!-- auto-queue -->
<!-- target-branch: feat/stl-primitives/text-visual-primitives -->
# Task: Migrate Text primitive to stl

Replace Tamagui `styled(TText)` with stl `styled("p", ...)` in `packages/primitives/Text.tsx`.

## Token mapping (Tamagui → stl)
- `$body` → `$body` (fontFamily)
- `$color` → `$defaultText` (color)
- fontSize `$1` → `$12`, `$2` → `$14`, `$4` → `$16` (p), `$6` → `$18`, `$8` → `$21`
- lineHeight `$1` → `$body`, `$2` → `$body`, `$4` → `$body`, `$6` → `$body`, `$8` → `$body`
- fontWeight `$1` → `$300`, `$2` → `$400`, `$3` → `$500`, `$4` → `$600`, `$5` → `$700`
- Tone colors: `$color` → `$defaultText`, `$colorSubtitle` → `$secondaryText`, `$color10` → `$primary`, `$green10` → `$success`, `$orange10` → `$warning`, `$red10` → `$danger`

## Files to modify
- `packages/primitives/Text.tsx` — rewrite using stl `styled("p", ...)`
- `packages/primitives/Text.test.tsx` — remove `@ts-expect-error`, update imports

## Implementation
```tsx
import { styled } from '../stl-react/src/config'
import type { ComponentProps } from 'react'

const TextFrame = styled(
  "p",
  { fontFamily: "$body", color: "$defaultText", fontSize: "$p", lineHeight: "$body" },
  {
    size: {
      xs: { fontSize: "$12" },
      sm: { fontSize: "$14" },
      md: { fontSize: "$p" },
      lg: { fontSize: "$18" },
      xl: { fontSize: "$21" },
    },
    tone: {
      neutral: { color: "$defaultText" },
      muted: { color: "$secondaryText" },
      primary: { color: "$primary" },
      success: { color: "$success" },
      warning: { color: "$warning" },
      danger: { color: "$danger" },
    },
    weight: {
      light: { fontWeight: "$300" },
      normal: { fontWeight: "$400" },
      medium: { fontWeight: "$500" },
      semibold: { fontWeight: "$600" },
      bold: { fontWeight: "$700" },
    },
  },
  "Text"
)

export interface TextProps extends ComponentProps<typeof TextFrame> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'neutral' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}

export function Text({ size = 'md', ...props }: TextProps) {
  return <TextFrame size={size} {...props} />
}
```

NOTE: Check if the color tokens `$defaultText`, `$secondaryText`, `$primary`, `$success`, `$warning`, `$danger` exist in the stl color scale. If not, use the closest available tokens. Check `packages/stl/src/config/scales/color.ts` and the theme models for available semantic color tokens. The exact token names may differ — use what's available in the codebase.

## Acceptance criteria
- Zero `@ts-expect-error` or `as any`
- No tamagui imports
- Exports `Text` and `TextProps`
- Default variant `size='md'` applied via wrapper function
- TypeScript compiles
