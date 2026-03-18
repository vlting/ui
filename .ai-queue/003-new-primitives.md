<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/layout-typography -->
# Task: New Primitives — Blockquote + InlineCode

## Goal
Create Blockquote and InlineCode as new standalone stl-react primitives. These are NOT attached to Text — they are their own exports.

## Files
- `packages/stl-react/src/primitives/Blockquote/Blockquote.ts` (create)
- `packages/stl-react/src/primitives/InlineCode/InlineCode.ts` (create)
- `packages/stl-react/src/primitives/index.ts` (add exports)

## Implementation

### Blockquote
```tsx
import { styled } from '../../config'

export const Blockquote = styled('blockquote', {
  fontFamily: '$body',
  fontSize: '$p',
  lineHeight: '$body',
  fontStyle: 'italic',
  color: '$color',
  margin: '0',
  pl: '$16',
  borderLeftWidth: '$2',
  borderLeftStyle: 'solid',
  borderLeftColor: '$borderColor',
}, { name: 'Blockquote' })
```

### InlineCode
```tsx
import { styled } from '../../config'

export const InlineCode = styled('code', {
  fontFamily: '$mono',
  fontSize: '$14',
  color: '$color',
  bg: '$neutral3',
  px: '$4',
  py: '$2',
  radius: '$3',
}, { name: 'InlineCode' })
```

### Barrel export
Add to `packages/stl-react/src/primitives/index.ts`:
```tsx
export { Blockquote } from './Blockquote/Blockquote'
export { InlineCode } from './InlineCode/InlineCode'
```

Also add to `src/index.ts` main barrel if primitives are re-exported there.

## Token Verification
Before implementing, verify these tokens exist in the STL scales:
- `$borderColor` — check `packages/stl/src/config/scales/color.ts`
- `$mono` font family — check `packages/stl/src/theme/presets.ts`
- `$neutral3` — check color scale
- `$14` fontSize — check Text primitive for precedent
- `$2` borderWidth — check `packages/stl/src/config/scales/border.ts`
- `$16` spacing — check space scale
- `$4`, `$2` spacing — check space scale
- `$3` radius — check radius scale

Use STL shorthand props (pl, bg, px, py, radius) not longhand.

## Acceptance Criteria
- `<Blockquote>` renders `<blockquote>` with left border, italic, body font
- `<InlineCode>` renders `<code>` with mono font, neutral bg, rounded
- Both exported from stl-react primitives barrel
- Both exported from main @vlting/ui barrel
- No specs needed for primitives (they're simple styled elements)
