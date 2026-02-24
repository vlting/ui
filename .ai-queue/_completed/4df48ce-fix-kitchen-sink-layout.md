# Commit History
- `e6f5b55` — fix(examples): fix sidebar height, nav typography, and anchor scrolling
- `4df48ce` — merge to main (no-ff)

<!-- auto-queue -->
# Fix Example App Layout: Sidebar Height, Background, Nav Styling, and Anchor Scrolling

## What Was Done

1. **Background extending past viewport**: Added `min-height: 100%` and `background-color: var(--background)` to `html` and `body` in `index.html`. Combined with existing JS-based background sync effect.

2. **Nav typography consistency**: Changed page link `fontSize` from `"$3"` (Tamagui token resolving too large) to `14` (explicit pixels), consistent with 12px sub-items and 12px group headings.

3. **Anchor scrolling**: Added `useEffect` watching `location.hash` + `location.pathname` that calls `scrollIntoView({ behavior: 'smooth' })` on the target element. React Router doesn't handle hash scrolling natively. Added `scroll-behavior: smooth` to `html` as CSS fallback.

4. **Sidebar sticky**: Added `alignItems="stretch"` to the body `XStack` to ensure the sidebar parent stretches to full content height.

## Files Modified
- `examples/kitchen-sink/index.html`
- `examples/kitchen-sink/src/layouts/BrandLayout.tsx`
