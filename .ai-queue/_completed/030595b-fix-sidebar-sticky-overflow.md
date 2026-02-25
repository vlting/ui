<!-- auto-queue -->
# Commit History
- `052d8f3` — fix(kitchen-sink): add overflow:visible to fix sticky sidebar
- `030595b` — merge commit to main

# Fix Sticky Sidebar — Tamagui Overflow Issue

## Problem

The sidebar in `BrandLayout.tsx` already has `position: 'sticky'` (line 437), `top: 56` (line 438), and `height: 'calc(100vh - 56px)'` (line 440) — but it does NOT stick. It scrolls away with the content.

## Root Cause

**React Native Web (and by extension Tamagui) sets `overflow: hidden` as the default on all `View`-based components.** This is inherited from React Native's box model. `position: sticky` ONLY works when no ancestor between the sticky element and the scroll container has `overflow: hidden` or `overflow: auto`.

The parent `<XStack flex={1} alignItems="stretch">` at line 425 almost certainly has `overflow: hidden` from Tamagui's defaults, which kills the sticky behavior.

## Fix

In `examples/kitchen-sink/src/layouts/BrandLayout.tsx`, add `overflow="visible"` to every Tamagui ancestor of the sidebar that might inherit `overflow: hidden`:

### 1. The body XStack (line 425)
```tsx
// Before:
<XStack flex={1} alignItems="stretch">

// After:
<XStack flex={1} alignItems="stretch" overflow="visible">
```

### 2. The outer YStack (line 333)
```tsx
// Before:
<YStack className="brand-layout" minHeight="100vh" backgroundColor="$background" ...>

// After:
<YStack className="brand-layout" minHeight="100vh" backgroundColor="$background" overflow="visible" ...>
```

### 3. Verify with browser DevTools

After making the changes:
1. Start the dev server (`yarn dev:kitchen-sink`)
2. Navigate to `http://localhost:5173/fun/components/buttons` (a page with long content)
3. Open browser DevTools → Inspect the sidebar `<nav>` element
4. Check the **Computed** styles panel for every ancestor up to `<html>`:
   - If ANY ancestor has `overflow: hidden` or `overflow: auto`, add `overflow: visible` to it
5. Scroll down — the sidebar should now stick below the header

### 4. Alternative: Use CSS override if Tamagui props don't work

If Tamagui's `overflow="visible"` prop doesn't successfully override the default, use the embedded `<style>` block (already at line 477) to force it:

```css
.brand-layout,
.brand-layout > [data-is="XStack"],
.brand-layout > div > div {
  overflow: visible !important;
}
```

Or more specifically, use Playwright to inspect the actual class names/data attributes Tamagui generates and target them precisely.

### 5. Alternative: Don't use Tamagui for the layout wrapper

If Tamagui's overflow behavior is too difficult to override, replace the body `XStack` with a plain `<div>`:

```tsx
// Replace the XStack at line 425 with:
<div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
  {/* sidebar nav */}
  {/* main content — also replace YStack with div */}
  <div role="main" style={{ flex: 1, minWidth: 0 }}>
    <Outlet />
  </div>
</div>
```

This avoids fighting React Native Web's overflow default entirely. The layout wrapper doesn't need Tamagui's token system — it's structural, not styled.

## Verification

1. Navigate to a page with content longer than the viewport (e.g., buttons page)
2. Scroll down — sidebar must remain visible, pinned below the header
3. Sidebar should scroll independently if its content exceeds the viewport height
4. Test in both light and dark mode
5. Test on mobile viewport (sidebar should still be fixed-position off-screen, slide in on hamburger click)

## Scope
- **Modifies**: `examples/kitchen-sink/src/layouts/BrandLayout.tsx`
