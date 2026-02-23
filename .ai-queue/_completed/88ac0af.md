# Commit History

- `37f4a2f` — fix(a11y): use styledHtml('button') for Toggle and ToggleGroup.Item
- `88ac0af` — merge commit into main

---

<!-- auto-queue -->
# Fix Toggle + ToggleGroup: eliminate wrapper divs, styles on `<button>` elements

## Problem

Toggle and ToggleGroup.Item both render `<button style="reset"><div class="tamagui-styles">...</div></button>`. The visual styles are on the inner div, not on the button. Same root cause as Button: `styled(XStack, {...})` renders a `<div>`.

## Solution

Replace `styled(XStack, {...})` with `styled.button({...})` for both `ToggleFrame` and `ToggleGroupItemFrame`. This uses `styledHtml('button', ...)` under the hood (via Proxy on `styled` export), which sets `staticConfig.Component = 'button'` → renders an actual `<button>` with Tamagui classes directly on it.

If `styled.button()` doesn't type-check, use `import { styledHtml } from '@tamagui/web'` and call `styledHtml('button', {...})` directly.

## Implementation

### ToggleFrame

Replace:
```tsx
const ToggleFrame = styled(XStack, { ...styles, variants, defaultVariants })
```
With:
```tsx
const ToggleFrame = styled.button({
  // XStack defaults (styled.button doesn't inherit these):
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  // Browser button resets:
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  // Original ToggleFrame styles:
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  cursor: 'pointer',
  animation: 'fast',
  backgroundColor: 'transparent',
  hoverStyle: { backgroundColor: '$backgroundHover' },
  pressStyle: { backgroundColor: '$backgroundPress' },
  focusWithinStyle: { outlineWidth: 2, outlineOffset: 2, outlineColor: '$outlineColor', outlineStyle: 'solid' },
  variants: { /* keep existing size, pressed, disabled variants */ },
  defaultVariants: { size: 'md', pressed: false },
})
```

Update the `Toggle` function: remove the native `<button>` wrapper. Pass `type="button"`, `aria-pressed`, `aria-disabled`, `disabled`, `onClick` directly to `<ToggleFrame>`.

### ToggleGroupItemFrame

Same approach — replace `styled(XStack, {...})` with `styled.button({...})`, adding XStack defaults and browser button resets.

Update `ToggleGroupItem`: remove the native `<button>` wrapper. Pass HTML button attributes directly to `<ToggleGroupItemFrame>`.

### ToggleGroupFrame (NO CHANGE)

Keep `ToggleGroupFrame = styled(XStack, {...})` as-is — it's a layout container (`role="group"`), not a button.

### Verification

After changes, inspect the HTML. Expected:
```html
<button type="button" aria-pressed="true" class="_bg-color4 _ai-center ...tamagui classes...">
  {children directly}
</button>
```
NO inner `<div>` between `<button>` and content.

If `styled.button()` doesn't render correctly, fall back to `import { styledHtml } from '@tamagui/web'` and use `styledHtml('button', {...})`.

## Scope

- `packages/components/Toggle/Toggle.tsx`
