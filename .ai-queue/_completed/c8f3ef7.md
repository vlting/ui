<!-- auto-queue -->
<!-- target-branch: feat/docs-site/component-visual-quality -->
# Polish Combobox and ContextMenu visual quality

## Instructions

### Context
Combobox and ContextMenu are both dropdown/popup components that need visual polish. Both currently use crude unicode characters for icons and have tight spacing.

Read `DESIGN_CONSTITUTION.md` before making changes.

### Combobox Improvements (`packages/components/Combobox/Combobox.tsx`)

1. **Chevron icon**: Replace '▼' / '▲' unicode characters with proper chevron icons. Import ChevronsUpDown from `@tamagui/lucide-icons` or use an SVG. The chevron should be a subtle visual cue, not the focal point.

2. **Trigger styling**: Improve border and background — use `borderWidth: 1`, `borderColor: '$borderColor'`, with hover state that darkens the border (`hoverStyle: { borderColor: '$color8' }`).

3. **Dropdown padding**: Increase internal padding from `$0.5` to `$1` for more breathing room.

4. **Item height and padding**: Increase item height from `$3` to at least `$4` (32px+) for comfortable touch targets. Add vertical padding (`paddingVertical: '$1'`).

5. **Search input styling**: Add a bottom border to visually separate the search input from the options list (`borderBottomWidth: 1`, `borderColor: '$borderColor'`).

6. **Selected item**: Show the selected option with a check icon (import Check from lucide-icons) and slightly bolder text or different background.

7. **Highlight color**: Use `$color3` instead of `$color2` for stronger highlight on hover/keyboard navigation.

### ContextMenu Improvements (`packages/components/ContextMenu/ContextMenu.tsx`)

1. **Item height**: Increase from `$2.5` (10px) to `$4` (32px+) for proper touch targets and readability.

2. **Item padding**: Increase horizontal padding from `$0.75` to `$2` for more comfortable spacing.

3. **Menu padding**: Increase from `$0.5` to `$1` for better internal spacing.

4. **Separator styling**: Replace the negative-margin hack with proper full-width separator using `marginVertical: '$0.5'`, `backgroundColor: '$borderColor'`.

5. **Hover state**: Strengthen hover background from `$color2` to `$color3`.

6. **Text sizing**: Ensure fontSize is appropriate for the new item height — use `$3` (14px) for items.

7. **Shortcut text**: Style shortcuts with `color: '$colorSubtitle'` and `fontSize: '$2'` (smaller than item text) for visual hierarchy.

8. **Menu border**: Ensure the border is subtle but visible (`borderWidth: 1`, `borderColor: '$borderColor'`).

## Scope
- `packages/components/Combobox/Combobox.tsx`
- `packages/components/ContextMenu/ContextMenu.tsx`

## Verification
- [ ] Combobox has proper chevron icon, comfortable item heights, search border
- [ ] ContextMenu has proper item heights (32px+), comfortable padding, clean separators
- [ ] Both components have stronger hover states and better visual hierarchy

## Task Progress
<!-- lat: 2026-03-02T21:26:59Z -->
<!-- agent-pid: 68095 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Improve Combobox styling
- [ ] Improve ContextMenu styling
- [ ] Commit, rebase, merge, archive
