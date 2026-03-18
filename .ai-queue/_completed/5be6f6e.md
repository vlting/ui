<!-- LAT: 2026-03-09T15:41:49Z -->
<!-- PID: 5917 -->
<!-- auto-queue -->
<!-- target-branch: feat/stl-components/compound-components -->
# Task: Migrate Popover, HoverCard, Select, Combobox to stl + headless hooks

## Migration pattern
- Import `styled` from `'../stl-react/src/config'`
- Import hooks from `'../../packages/stl-headless/src'`
- Use `usePopoverPosition` for positioned overlays
- Use `useListState` + `useSearch` for Select/Combobox

## Files to modify

### `packages/components/Popover/Popover.tsx`
- Replace Tamagui Popover with custom positioned overlay
- Use `useDisclosure` + `usePopoverPosition`
- Compound: Root, Trigger, Anchor, Content, Arrow, Close
- Click outside to close

### `packages/components/HoverCard/HoverCard.tsx`
- Replace with hover-triggered positioned overlay
- Use `useDisclosure` + `usePopoverPosition`
- Hover delay timers (openDelay, closeDelay)
- Keep existing useState/useRef/useCallback logic for timers

### `packages/components/Select/Select.tsx`
- Replace `@tamagui/select` with custom listbox
- Use `useDisclosure` (dropdown open/close) + `useListState` (item highlight/select)
- Native `<button>` trigger + positioned `<ul role="listbox">` dropdown
- Compound: Root, Trigger, Content, Item, ItemText, ItemIndicator, Group, Label, Separator, ScrollUpButton, ScrollDownButton, Viewport, Value, Icon
- Keyboard: Arrow nav, Enter select, Escape close, type-ahead

### `packages/components/Combobox/Combobox.tsx`
- Replace `@tamagui/select` wrapper with searchable listbox
- Use `useDisclosure` + `useListState` + `useSearch`
- Input + dropdown list with filtered items
- Compound: Root, Input, Content, Item, Empty
- Same keyboard behavior as Select + text input filtering

## Acceptance criteria
- Zero Tamagui imports in all 4 files
- Proper ARIA (listbox, option, combobox roles)
- Keyboard navigation works
- Positioned overlays use usePopoverPosition