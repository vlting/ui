<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/layout-typography -->
# Task: Heading Refactor — Compound H1-H6

## Goal
Replace the `level` prop / forwardRef wrapper pattern with direct compound sub-components via Object.assign.

## Files
- `packages/stl-react/src/primitives/Heading/Heading.tsx`
- `packages/stl-react/src/primitives/Heading/Heading.spec.md`
- `packages/stl-react/src/primitives/Heading/Heading.test.tsx` (if exists)

## Implementation

The internal H1-H6 styled elements already exist. Refactor:

```tsx
import { styled } from '../../config'

const baseStl = {
  fontFamily: '$heading',
  color: '$defaultHeading',
  margin: '0',
} as const

const H1 = styled('h1', { ...baseStl, fontSize: '$h1', lineHeight: '$heading', fontWeight: '$700' }, { name: 'Heading.H1' })
const H2 = styled('h2', { ...baseStl, fontSize: '$h2', lineHeight: '$heading', fontWeight: '$700' }, { name: 'Heading.H2' })
const H3 = styled('h3', { ...baseStl, fontSize: '$h3', lineHeight: '$heading', fontWeight: '$600' }, { name: 'Heading.H3' })
const H4 = styled('h4', { ...baseStl, fontSize: '$h4', lineHeight: '$heading', fontWeight: '$600' }, { name: 'Heading.H4' })
const H5 = styled('h5', { ...baseStl, fontSize: '$h5', lineHeight: '$heading', fontWeight: '$600' }, { name: 'Heading.H5' })
const H6 = styled('h6', { ...baseStl, fontSize: '$h6', lineHeight: '$heading', fontWeight: '$600' }, { name: 'Heading.H6' })

export const Heading = Object.assign(H2, { H1, H2, H3, H4, H5, H6 })
```

- **Drop** the `React.forwardRef` wrapper, `LEVEL_MAP`, `HeadingProps` with `level` prop
- **Keep** `flat` prop if it was a variant — check current usage
- Base `<Heading>` renders `<h2>` (preserves current default)
- Each sub-component is its own styled() call with correct font size/weight tokens
- Export `Heading` (compound with H1-H6 attached)
- Update spec to document new API: `<Heading.H1>`, `<Heading.H3>`, etc.
- Update tests: test each sub-component renders correct HTML element
- Update any imports that used `HeadingProps` with `level`

## Acceptance Criteria
- `<Heading.H1>` renders `<h1>` with $h1 font size
- `<Heading.H3>` renders `<h3>` with $h3 font size
- `<Heading>` renders `<h2>` (backward compat default)
- No forwardRef wrapper, no LEVEL_MAP, no `level` prop
- TypeScript compiles, existing tests updated and passing
- Spec updated to reflect compound API
