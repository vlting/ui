<!-- LAT: 2026-03-16T05:33:39Z -->
<!-- PID: 9023 -->
<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/feedback-components -->
# Task: Progress Component — Full Implementation

## Context
- Stage 6.1 of library-buildout. Stage issue: #208. Epic: #206.
- Progress is a horizontal bar indicating completion percentage.
- Currently a stub via `createStub()` in `packages/components/Progress/Progress.tsx`.
- Button (`packages/components/Button/Button.tsx`) is the canonical `styled()` reference.

## Requirements

### 1. Audit `Progress.spec.md`
Minor updates only:
- Confirm props: `value` (number), `max` (number, default 100), `size` ('sm' | 'md' | 'lg')
- Confirm ARIA: `role="progressbar"`, `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax`
- Note: indicator width uses `stl={{ width: pct }}` for dynamic value
- Update any references to "STL Progress primitive" — this is a custom implementation, not wrapping an STL primitive.

### 2. Implement `Progress.tsx`
Replace the stub. Follow Button pattern for `styled()` usage.

**Imports:**
```tsx
import type { ComponentPropsWithRef } from 'react'
import { styled, templateProps } from '../../stl-react/src/config'
```

**Internal sub-component (not exported):**
- `ProgressIndicator` = `styled('div', { stl: { height: '100%', borderRadius: '$10', bg: '$primary9', transition: 'width 150ms ease', lowMotion: { transition: 'none' } }, styleName: 'ProgressIndicator' })`

**Main component:**
- `Progress` = `styled('div', { ... })`
  - Base stl: `display: 'block'`, `width: '100%'`, `bg: '$borderColor'`, `borderRadius: '$10'`, `overflow: 'hidden'`
  - `variants.size`:
    - `sm`: `height: '$4'`
    - `md`: `height: '$8'`
    - `lg`: `height: '$12'`
  - `defaultVariants: { size: 'md' }`
  - `mapProps`: set `role: 'progressbar'`, compute clamped value, set `aria-valuenow`, `aria-valuemin: 0`, `aria-valuemax: props.max ?? 100`, forward `aria-label` (default to `'Progress'` if not provided)
  - `templateProps`: extract `value` and `max` (these are not DOM attributes)
  - `template`: render `<ProgressIndicator stl={{ width: \`${Math.min(100, ((value ?? 0) / (max ?? 100)) * 100)}%\` }} />`
  - `styleName: 'Progress'`

**Export types:**
```tsx
export type ProgressProps = ComponentPropsWithRef<typeof Progress>
export type ProgressSize = NonNullable<ProgressProps['size']>
```

### 3. Update `Progress.test.tsx`
Expand tests:
- Add `screen.getByRole('progressbar')` assertion
- Add `aria-valuenow`, `aria-valuemin`, `aria-valuemax` attribute checks
- Add `aria-label` passthrough test
- Add test for value clamping (value > max should clamp indicator to 100%)
- Keep existing size/value/max tests

### 4. Files touched
- `packages/components/Progress/Progress.spec.md` (audit/update)
- `packages/components/Progress/Progress.tsx` (rewrite)
- `packages/components/Progress/Progress.test.tsx` (update)
