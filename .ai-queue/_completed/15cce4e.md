<!-- auto-queue -->
<!-- depends-on: 004, 005 -->
# Commit History
- `154c772` fix(kitchen-sink): pad table to 15 rows and fix keyboard nav focus ring
- `15cce4e` fix(kitchen-sink): pad table to 15 rows and fix keyboard nav focus ring (#006) [merge]

# Kitchen-Sink Demo Fixes: Table, Hooks, and Component Verifications

This integration segment depends on:
- Segment 004 (kitchen-sink IA overhaul — restructures all pages)
- Segment 005 (Pagination, Toggle, Switch UI lib fixes)

After those complete, this segment makes targeted fixes to specific demos.

## 1. Table Paginated Example — Pad Third Page to 5 Rows

**File:** `examples/kitchen-sink/src/pages/ComposedPage.tsx` (or wherever the paginated table lives after 004's restructuring)

**Problem:** The paginated table has 12 data rows with `ROWS_PER_PAGE = 5`. Page 3 shows only 2 rows (12 - 10 = 2), causing a height shift compared to pages 1 and 2.

**Fix:** Add 3 more team members to `ALL_TEAM_MEMBERS` (total: 15) so that page 3 also has exactly 5 rows. Use realistic data that fits the pattern (Name, Role, Status, Hours).

**Alternative:** If adding data doesn't make sense, pad the table body with empty/placeholder rows to always show `ROWS_PER_PAGE` rows:
```tsx
const displayRows = [...rows]
while (displayRows.length < ROWS_PER_PAGE) {
  displayRows.push({ name: '', role: '', status: '', hours: 0 })
}
```
But adding real data is preferred — it looks better.

## 2. useKeyboardNavigation Demo — Focus Indication and Border Fix

**File:** `examples/kitchen-sink/src/pages/HooksPage.tsx` (or wherever the hooks demos live after 004's restructuring)

**Problem:**
1. Needs clearer focus indication when navigating with keyboard
2. Should NOT show a border/outline when the item is not focused

**Current implementation:** Uses `outlineWidth={i === activeIndex ? 2 : 0}` which changes outline based on active state, not focus state. The outline shows whenever an item is the "active" index, even if the user isn't actively keyboard-navigating.

**Fix:**
- Only show the focus outline when the keyboard navigation container is actually focused (i.e., the user is keyboard-navigating). When the container loses focus, no item should show an outline.
- Implementation approach:
  1. Track whether the container has focus with a `hasFocus` state
  2. Use the container's `onFocus`/`onBlur` events to toggle `hasFocus`
  3. Only apply `outlineWidth: 2` when BOTH `hasFocus && i === activeIndex`
  4. When `hasFocus` is false, show no border or outline on any item
- Keep the background color indicator (`$color4`) for the active item regardless of focus — this shows keyboard position
- The focus outline is the additional ring that appears only during active keyboard navigation

## 3. Verify Toggle, Switch, and Pagination Demos

After segment 005 fixes the UI lib components, verify each demo works correctly:

### Toggle demo
- Standalone toggle should show clear pressed/unpressed visual state
- ToggleGroup items should show which item is selected
- If the demo needs updating to better showcase state (e.g., adding labels that describe the state), update it

### Switch demo
- Knobs should be vertically centered with no overlap
- All three sizes (sm, md, lg) should look proportional
- If the demo wrapper needs styling adjustments, apply them

### Pagination demo
- Controls should not shift as you navigate between pages
- Test with both 10-page and 50-page demos
- Ellipsis should maintain consistent spacing

## 4. Alphabetical Ordering Check

Segment 004 should have applied alphabetical ordering to all pages. Verify this is correct on every page. If any sections are out of order, fix them.

## Scope
- `examples/kitchen-sink/src/pages/ComposedPage.tsx` (or equivalent after 004's restructuring)
- `examples/kitchen-sink/src/pages/HooksPage.tsx` (or equivalent)
- `examples/kitchen-sink/src/pages/ButtonsPage.tsx` (or equivalent — verify Toggle/Pagination)
- `examples/kitchen-sink/src/pages/FormsPage.tsx` (or equivalent — verify Switch)
- Any other kitchen-sink page files that need ordering fixes

## Acceptance Criteria
- Table paginated example has 5 rows on every page (no height shifts)
- useKeyboardNavigation demo shows focus ring ONLY when keyboard-navigating (not when blurred)
- No border/outline on items when the container is not focused
- Toggle shows clear pressed/unpressed state in the demo
- Switch knobs are visually centered with no overlap in the demo
- Pagination controls don't shift between pages in the demo
- All pages have sections in alphabetical order
