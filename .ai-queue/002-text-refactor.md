<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/layout-typography -->
# Task: Text Refactor — Add Semantic Sub-Components

## Goal
Add `Text.Small` and `Text.Code` as compound sub-components where the HTML element changes. Keep existing size/tone/weight variants on base Text unchanged.

## Files
- `packages/stl-react/src/primitives/Text/Text.ts`
- `packages/stl-react/src/primitives/Text/Text.spec.md`
- `packages/stl-react/src/primitives/Text/Text.test.tsx` (create if doesn't exist)

## Implementation

```tsx
import { styled } from '../../config'

const TEXT_STYLES = {
  fontFamily: '$body',
  color: '$color',
  fontSize: '$p',
  fontWeight: '$400',
  lineHeight: '$body',
} as const

export const getTextStyles = () => TEXT_STYLES

const TextBase = styled('p', getTextStyles(), {
  name: 'Text',
  variants: {
    size: {
      xs: { fontSize: '$12' },
      sm: { fontSize: '$14' },
      md: { fontSize: '$16' },
      lg: { fontSize: '$18' },
      xl: { fontSize: '$21' },
    },
    tone: {
      neutral: { color: '$color' },
      muted: { color: '$secondaryText12' },
      primary: { color: '$primary10' },
      success: { color: '$forest10' },
      warning: { color: '$amber10' },
      danger: { color: '$tomato10' },
    },
    weight: {
      light: { fontWeight: '$300' },
      normal: { fontWeight: '$400' },
      medium: { fontWeight: '$500' },
      semibold: { fontWeight: '$600' },
      bold: { fontWeight: '$700' },
    },
  },
})

// Semantic sub-components — different HTML elements, fixed styles
const Small = styled('small', {
  ...TEXT_STYLES,
  fontSize: '$14',
}, { name: 'Text.Small' })

const Code = styled('code', {
  ...TEXT_STYLES,
  fontFamily: '$mono',
  fontSize: '$14',
  bg: '$neutral3',
  px: '$4',
  py: '$2',
  radius: '$3',
}, { name: 'Text.Code' })

export const Text = Object.assign(TextBase, { Small, Code })
```

## Key Rules
- **Sub-components only where HTML element changes** (`<small>`, `<code>`)
- Sub-components have **fixed styles** — they do NOT accept size/tone/weight variants
- Base Text keeps all existing variants unchanged
- `getTextStyles()` export preserved (used by other primitives)
- `TextProps` interface preserved

## Acceptance Criteria
- `<Text.Small>` renders `<small>` element
- `<Text.Code>` renders `<code>` element with mono font
- `<Text>` still renders `<p>` with all existing variants working
- `<Text size="lg" tone="muted">` still works
- TypeScript compiles
- Spec updated documenting sub-components and the "different element = sub-component" rule
