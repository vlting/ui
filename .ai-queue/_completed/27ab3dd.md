<!-- LAT: 2026-03-10T04:52:22Z -->
<!-- PID: 29583 -->
<!-- auto-queue -->
<!-- target-branch: test/component-quality/test-hardening -->
# Task: Harden tests — overlay and navigation components

## Goal
Upgrade test files for overlay and navigation components with keyboard navigation, ARIA assertions, and focus management.

## Instructions

1. Upgrade these test files (touch ONLY these files):

- `packages/components/Dialog/Dialog.test.tsx`
- `packages/components/AlertDialog/AlertDialog.test.tsx`
- `packages/components/Sheet/Sheet.test.tsx`
- `packages/components/Drawer/Drawer.test.tsx`
- `packages/components/Tabs/Tabs.test.tsx`
- `packages/components/Accordion/Accordion.test.tsx`
- `packages/components/DropdownMenu/DropdownMenu.test.tsx`
- `packages/components/ContextMenu/ContextMenu.test.tsx`
- `packages/components/NavigationMenu/NavigationMenu.test.tsx`
- `packages/components/Menubar/Menubar.test.tsx`

2. For each, ensure:
   - **Keyboard nav** — Tab, Arrow keys, Escape to close, Enter to select
   - **ARIA** — `role="dialog"`, `aria-modal`, `aria-expanded`, `aria-selected`
   - **Focus management** — Focus trap in modals, focus returns on close
   - **Open/close** — Tests for both states

3. Use `@testing-library/react` + `userEvent`.
4. Test files only — no component changes.

## Key files
- Listed test files above