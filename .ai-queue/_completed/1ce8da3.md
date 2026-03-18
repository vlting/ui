<!-- LAT: 2026-03-10T06:43:12Z -->
<!-- PID: 29583 -->
<!-- auto-queue -->
<!-- target-branch: feat/rn-parity/tier2-components -->
# Task: Port Tier 2 Components to React Native

## Context
Stage 4.4 of Epic 4 (RN Parity). Port 8 Tier 2 web components to React Native. These are more complex — they involve modals, popovers, and platform-specific behavior.

Components: **Dialog, Sheet, Select, Tabs, Accordion, Toast, Tooltip, Dropdown**

## Architecture
Same pattern as Tier 1 — create `.native.tsx` alongside `.tsx`.

### Reference files
- Tier 1 examples: `packages/components/Button/Button.native.tsx`, etc.
- stl-native styled(): `packages/stl-native/src/config/styled.tsx`
- stl-headless hooks: `packages/stl-headless/src/` (useDisclosure, useTabs, useToastQueue)
- RN porting guide: `packages/RN_PORTING_GUIDE.md`

## Implementation notes

### Dialog.native.tsx
- Use RN `Modal` component for overlay behavior
- Transparent background with `animationType="fade"`
- Compound: Dialog, Dialog.Trigger (Pressable), Dialog.Content (View inside Modal), Dialog.Header, Dialog.Footer, Dialog.Title, Dialog.Description, Dialog.Close
- Use `useDisclosure` from stl-headless

### Sheet.native.tsx
- Use RN `Modal` with `animationType="slide"` from bottom
- Content positioned at bottom with `borderTopLeftRadius`, `borderTopRightRadius`
- Compound: Sheet, Sheet.Trigger, Sheet.Content, Sheet.Header, Sheet.Footer, Sheet.Title, Sheet.Description, Sheet.Close
- Use `useDisclosure` from stl-headless

### Select.native.tsx
- Use RN `Modal` with a scrollable list of options
- Trigger shows selected value, opens modal on press
- Compound: Select, Select.Trigger, Select.Content, Select.Item, Select.Value
- Items use Pressable with highlighted state

### Tabs.native.tsx
- Horizontal pressable tab bar + content views
- Use `useTabs` from stl-headless for state management
- Compound: Tabs, Tabs.List, Tabs.Trigger, Tabs.Content
- No need for `role="tablist"` equivalent — use accessibilityRole

### Accordion.native.tsx
- Vertically stacked disclosure sections
- Use `useDisclosure` per item
- Compound: Accordion, Accordion.Item, Accordion.Trigger, Accordion.Content
- Animated expand/collapse via RN Animated or LayoutAnimation

### Toast.native.tsx
- Overlay notifications positioned at top or bottom
- Use `useToastQueue` from stl-headless
- Auto-dismiss with configurable duration
- Compound: ToastProvider, Toast, Toast.Title, Toast.Description, Toast.Close

### Tooltip.native.tsx
- On RN, tooltips are less common. Implement as a Pressable that shows a popover View
- Position near the trigger element
- Use `onLongPress` to show (since hover doesn't exist on mobile)
- Simple implementation — absolute-positioned View overlay

### Dropdown.native.tsx (DropdownMenu)
- Similar to Select but for actions (not value selection)
- Use RN `Modal` or absolute-positioned View
- Compound: DropdownMenu, DropdownMenu.Trigger, DropdownMenu.Content, DropdownMenu.Item, DropdownMenu.Separator
- Items are Pressable with `onPress` handlers

## Files to create
- `packages/components/Dialog/Dialog.native.tsx`
- `packages/components/Sheet/Sheet.native.tsx`
- `packages/components/Select/Select.native.tsx`
- `packages/components/Tabs/Tabs.native.tsx`
- `packages/components/Accordion/Accordion.native.tsx`
- `packages/components/Toast/Toast.native.tsx`
- `packages/components/Tooltip/Tooltip.native.tsx`
- `packages/components/DropdownMenu/DropdownMenu.native.tsx`

Check the actual directory names for each component (e.g., DropdownMenu vs Dropdown).

## Acceptance criteria
- All 8 .native.tsx files created with correct RN implementations
- Modal-based components (Dialog, Sheet, Select, Dropdown) use RN Modal
- Tab-based component uses useTabs from stl-headless
- Toast uses useToastQueue from stl-headless
- All components use proper accessibility roles/states
- Components use token references not hardcoded values