<!-- auto-queue -->
<!-- target-branch: fix/quality-audit -->

# Fix: Reduced Motion Support — Spinner, Carousel, Accordion, Sidebar

Add `prefers-reduced-motion` support to all animated components so animations are disabled or reduced when the user's OS accessibility setting requests it.

## Scope
- `packages/primitives/Spinner.tsx`
- `packages/components/Carousel/Carousel.tsx`
- `packages/components/Accordion/Accordion.tsx`
- `packages/components/Sidebar/Sidebar.tsx`

## Instructions

Read `AI_CONSTITUTION.md` and `DESIGN_CONSTITUTION.md` before starting.

### Approach

Since the current animations use native HTML `style={{}}` objects (not Tamagui animation props), we need runtime detection of `prefers-reduced-motion`.

**Create a shared hook** at `packages/hooks/useReducedMotion.ts`:

```ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

Also export it from `packages/hooks/index.ts`.

### Component Changes

#### 1. Spinner (`packages/primitives/Spinner.tsx`)
The spinner uses a `<style>` tag with `@keyframes`. Add a `prefers-reduced-motion` media query inside the existing `<style>` tag:

```css
@media (prefers-reduced-motion: reduce) {
  .vlting-spinner { animation: none !important; }
}
```

This is the cleanest approach since it's pure CSS. No hook needed here.

#### 2. Carousel (`packages/components/Carousel/Carousel.tsx`)
The CarouselContent component has `style={{ transition: 'transform 300ms ease-in-out' }}`.
- Import `useReducedMotion` from `packages/hooks`
- When `reduced` is true, set `transition: 'none'` instead of the 300ms transition
- Also suppress `autoplay` when reduced motion is preferred (autoplay auto-advances slides)

#### 3. Accordion (`packages/components/Accordion/Accordion.tsx`)
The trigger chevron has `style={{ transition: 'transform 150ms ease-in-out' }}`.
- Import `useReducedMotion`
- When `reduced` is true, set `transition: 'none'`

#### 4. Sidebar (`packages/components/Sidebar/Sidebar.tsx`)
The sidebar root has `transition: 'width 250ms ease-in-out'` in a `style={{}}` object.
- Import `useReducedMotion`
- When `reduced` is true, set `transition: 'none'`

### Rules
1. Do NOT change any existing styling or behavior beyond adding reduced-motion support.
2. The `useReducedMotion` hook must be SSR-safe (default to `false` on server).
3. Prefer CSS media queries (Spinner approach) where possible. Use the hook only for `style={{}}` transitions that can't use CSS.
4. Do NOT add the hook to components that don't have animations.

## Verification
- `npx tsc --noEmit` passes
- Components still animate when `prefers-reduced-motion` is not set
- Components stop animating when `prefers-reduced-motion: reduce` is set (test via browser devtools: Rendering → Emulate CSS media feature `prefers-reduced-motion`)
