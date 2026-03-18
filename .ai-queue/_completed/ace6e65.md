<!-- LAT: 2026-03-09T15:10:55Z -->
<!-- PID: 6276 -->
<!-- auto-queue -->
<!-- target-branch: feat/stl-components/simple-components -->
# Task: Migrate Tamagui wrapper components (Button, Collapsible, Progress, Slider, Switch, Tooltip, Tabs)

These components wrap Tamagui's built-in components. Replace with native HTML + stl styling.

## Migration pattern
Import `styled` from `'../stl-react/src/config'`. Replace Tamagui component wrappers with native HTML elements + stl styling.

## Files to modify

### `packages/components/Button/Button.tsx`
- Replace `Button from @tamagui/button` with stl `styled("button", css)`
- Keep ButtonContext for variant propagation
- Keep loading spinner, disabled state logic
- Remove @ts-expect-error comments (15+)
- Use `"button"` element with proper ARIA
- Map all size/variant CSS to stl variant pattern

### `packages/components/Collapsible/Collapsible.tsx`
- Replace `Collapsible from @tamagui/collapsible` with a simple disclosure pattern
- Use native `<details>`/`<summary>` or custom expand/collapse with CSS transitions
- Keep compound sub-components (Root, Trigger, Content)

### `packages/components/Progress/Progress.tsx`
- Replace `Progress from @tamagui/progress` with native `<progress>` or styled divs
- Use `"div"` for track, inner `"div"` for indicator with width percentage
- Keep value/max props

### `packages/components/Slider/Slider.tsx`
- Replace `Slider from @tamagui/slider` with native `<input type="range">` + stl styling
- Or use styled divs for track/thumb if custom appearance needed
- Keep min/max/step/value props

### `packages/components/Switch/Switch.tsx`
- Replace `Switch from @tamagui/switch` with native `<button role="switch">` + stl styling
- Use CSS transitions for thumb movement
- Keep size variant mapping
- Proper ARIA: `role="switch"`, `aria-checked`

### `packages/components/Tooltip/Tooltip.tsx`
- Replace `Tooltip from @tamagui/tooltip` with a CSS-based tooltip or simple positioned div
- Use `"div"` with `position: absolute` for content
- Keep the compound pattern (Root, Trigger, Content)
- Add `role="tooltip"` ARIA

### `packages/components/Tabs/Tabs.tsx`
- Replace `Tabs from @tamagui/tabs` with native `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Keep compound pattern (Root, List, Trigger, Content)
- Proper ARIA: `aria-selected`, `aria-controls`, `tabIndex`

## Acceptance criteria
- Zero Tamagui imports in all 7 files
- Zero @ts-expect-error comments
- All component APIs preserved (props, compound patterns)
- Semantic HTML and ARIA attributes preserved
