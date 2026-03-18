<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/layout-typography -->
<!-- depends-on: 001 -->
# Task: Component Layer — Delete Typography, Re-export Separator, Implement ButtonGroup + Direction

## Goal
Clean up component layer: remove redundant Typography component, properly export Separator, implement ButtonGroup and Direction.

## Files
- `packages/components/Typography/` — DELETE entire directory
- `packages/components/Separator/Separator.tsx` (create web implementation)
- `packages/components/Separator/Separator.spec.md` (create)
- `packages/components/Separator/Separator.test.tsx` (create)
- `packages/components/Separator/index.ts` (create)
- `packages/components/ButtonGroup/ButtonGroup.tsx`
- `packages/components/ButtonGroup/ButtonGroup.spec.md`
- `packages/components/ButtonGroup/ButtonGroup.test.tsx`
- `packages/components/Direction/Direction.tsx`
- `packages/components/Direction/Direction.spec.md`
- `packages/components/Direction/Direction.test.tsx`
- `packages/components/index.ts` (update exports)

## Part 1: Delete Typography
- Remove `packages/components/Typography/` entirely (Typography.tsx, index.ts, spec files, test file, api-mapping)
- Update `packages/components/index.ts` — remove all Typography exports (H1-H6, P, Lead, Large, Small, Muted, Blockquote, InlineCode, List, ListItem, Typography)
- These are now served by stl-react primitives: Heading.H1-H6, Text, Text.Small, Text.Code, Blockquote, InlineCode, List, ListItem

## Part 2: Separator (re-export + web impl)
The stl-react Separator primitive exists at `packages/stl-react/src/primitives/Separator/Separator.tsx`. Create a component-layer entry:

```tsx
// packages/components/Separator/Separator.tsx
export { Separator } from '../../stl-react/src/primitives/Separator/Separator'
```

```tsx
// packages/components/Separator/index.ts
export { Separator } from './Separator'
```

Add to `packages/components/index.ts`:
```tsx
export { Separator } from './Separator'
```

Write a basic spec and test confirming horizontal/vertical orientation and decorative prop.

## Part 3: ButtonGroup
Replace stub with real implementation:

```tsx
import { styled } from '../../stl-react/src/config'

const ButtonGroupRoot = styled('div', {
  display: 'inline-flex',
  gap: '$4',
}, {
  name: 'ButtonGroup',
  variants: {
    orientation: {
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column' },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
  mapProps: (p: any) => ({
    ...p,
    role: 'group',
  }),
})

export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Root: ButtonGroupRoot,
})
```

Key requirements:
- `role="group"` injected automatically via mapProps
- `aria-label` accepted as standard HTML prop (not required in types, but documented as recommended)
- Orientation variant: horizontal/vertical
- Basic flex gap spacing — **no connected variant** (border collapsing deferred)
- Keep `.Root` compound alias for consistency with Card/Alert/Item

Write spec documenting the API. Write tests for:
- Renders with role="group"
- Horizontal (default) and vertical orientation
- Children render inside

## Part 4: Direction
Replace stub with real Context implementation:

```tsx
import React, { createContext, useContext } from 'react'

type Dir = 'ltr' | 'rtl'
const DirectionContext = createContext<Dir>('ltr')

export function DirectionProvider({
  dir,
  children
}: {
  dir: Dir
  children: React.ReactNode
}) {
  return (
    <DirectionContext.Provider value={dir}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection(): Dir {
  const ctx = useContext(DirectionContext)
  if (ctx) return ctx
  // Auto-detect from document if available
  if (typeof document !== 'undefined') {
    return (document.documentElement.dir as Dir) || 'ltr'
  }
  return 'ltr'
}

export const Direction = Object.assign(DirectionProvider, {
  Provider: DirectionProvider,
})
```

No DOM output — pure context provider. Write spec and tests.

## Acceptance Criteria
- Typography directory deleted, no Typography exports in components barrel
- Separator re-exported from primitive, spec + test exist
- ButtonGroup has role="group", orientation variant, spec + test
- Direction provides context, useDirection() returns dir with auto-detect fallback, spec + test
- `packages/components/index.ts` updated (Typography removed, Separator added)
- TypeScript compiles
