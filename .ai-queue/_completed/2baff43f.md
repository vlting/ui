<!-- LAT: 2026-03-17T06:34:26Z -->
<!-- PID: 30863 -->
<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/content-components -->
# Task: Badge component (net-new)

Create the Badge web component from scratch. Badge currently only has a native implementation — no web files exist.

## Files to create
- `packages/components/Badge/Badge.tsx` — new implementation
- `packages/components/Badge/Badge.test.tsx` — new tests
- `packages/components/Badge/Badge.spec.md` — new spec
- `packages/components/Badge/index.ts` — new barrel

## API

Badge is a single styled element — NOT compound. Inline pill for status/category labeling.

```tsx
<Badge theme="success" variant="solid" size="sm">Active</Badge>
<Badge theme="error" variant="subtle">Failed</Badge>
<Badge theme="neutral" variant="outline" size="lg">Draft</Badge>
```

## Implementation

Import `styled` from `../../stl-react/src/config`.

### Badge = styled('span', { ... })
- **stl:** `display: 'inline-flex'`, `alignItems: 'center'`, `justifyContent: 'center'`, `borderRadius: '9999'`, `fontFamily: '$body'`, `fontWeight: '$500'`, `lineHeight: '1'`, `whiteSpace: 'nowrap'`, `flexShrink: '0'`
- **variants:**
  - `theme`: 7 themes using `options()` helper — primary, secondary, neutral, success, warning, error, info (empty objects, colors via compoundVariants)
  - `variant`: solid (empty), subtle (empty), outline (empty) — colors via compoundVariants
  - `size`: sm (`px: '$6'`, `py: '$2'`, `fontSize: '11px'`), md (`px: '$8'`, `py: '$2'`, `fontSize: '$small'`), lg (`px: '$12'`, `py: '$4'`, `fontSize: '$small'`)
- **compoundVariants:** 7 themes × 3 variants = 21 entries:
  - `solid` + `{theme}`: `bg: '$<theme>9'`, `color: '$<theme>Text9'`
  - `subtle` + `{theme}`: `bg: '$<theme>3'`, `color: '$<theme>Text3'`
  - `outline` + `{theme}`: `bg: 'transparent'`, `border: '$<theme>'`, `borderWidth: '$widthMin'`, `color: '$<theme>Text3'`
- **defaultVariants:** `theme: 'neutral'`, `variant: 'solid'`, `size: 'md'`
- **styleName:** `'Badge'`

Follow the Alert compoundVariants pattern exactly for the theme×variant matrix.

### Badge.spec.md
Write a brief spec covering:
- Purpose: inline status/category indicator
- Variants: theme (7), variant (solid/subtle/outline), size (sm/md/lg)
- Accessibility: not interactive, not focusable. Decorative/informational.
- Color contract: solid uses $<theme>9/$<theme>Text9, subtle uses $<theme>3/$<theme>Text3
- Semantic HTML: `<span>` (inline element)

### Badge.test.tsx
Follow Alert test patterns. Import from `../../../src/__test-utils__/render`.
- renders with default props
- renders text content
- renders each theme variant (forEach over 7 themes)
- renders each style variant (solid/subtle/outline)
- renders each size variant (sm/md/lg)

### index.ts
```tsx
export type { BadgeProps } from './Badge'
export { Badge } from './Badge'
```

## Export type
```tsx
export type BadgeProps = ComponentPropsWithRef<typeof Badge>
```

## Acceptance criteria
- All new tests pass
- 7 themes × 3 variants work correctly
- All colors via token pairs ($scaleN + $scaleTextN)
- All styling via STL tokens — no hardcoded colors
- `styleName` on styled() call
- Badge.spec.md exists
- NOT focusable, NOT interactive
