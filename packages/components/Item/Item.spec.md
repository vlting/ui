# Component Spec — Item

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Generic list-item layout for menus, settings panels, contact lists, and any context requiring structured rows.
- **When to use:** List items needing an icon/avatar + text + optional trailing action in a consistent layout.
- **When NOT to use:** Simple text-only lists (use `Text`), complex card layouts (use `Card`), navigation items (use `NavigationMenu`).

---

## 2. UX Intent

- **Primary interaction goal:** Scannable list with consistent structure across items.
- **Expected user mental model:** Each item is a row with a leading visual, main content area, and trailing action.
- **UX laws applied:**
  - **Fitts's Law** — touch targets meet minimum sizing (44px default, 36px sm, 52px lg)
  - **Hick's Law** — each item presents a focused, limited set of information
  - **Gestalt Principles** — proximity groups leading, content, and trailing into a cohesive row

---

## 3. Anatomy

- `Item` (Root) — XStack container, full width, horizontal layout
- `Item.Leading` — Left slot for avatar, icon, or checkbox (flexShrink: 0)
- `Item.Content` — Main area containing title and optional description (flex: 1)
- `Item.Title` — Primary text (medium weight)
- `Item.Description` — Secondary text (muted color via `$colorSubtitle`)
- `Item.Trailing` — Right slot for action button, badge, or chevron (flexShrink: 0)
- All sub-components except Root are optional.

> **TypeScript is the source of truth for props.** See `ItemProps` in `Item.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Idle** — default appearance with no interaction styles
- **Hover** — background shifts to `$color3` (interactive variant only)
- **Focus** — visible focus indicator: 2px solid `$outlineColor`, 2px offset (interactive variant only)
- **Active (press)** — background shifts to `$color4` (interactive variant only)

### Keyboard Interaction

- **Tab** — focuses the item (when `interactive` variant is set)
- **Enter / Space** — activates the item (consumer must attach `onPress`/`onClick`)
- No arrow key navigation — consumers wrap items in a list and manage focus if needed.

### Motion

- None. Hover and press feedback is immediate via Tamagui style props.

---

## 5. Accessibility

- **Semantic element:** Renders as a `div` (XStack). No implicit ARIA role.
- **ARIA attributes:** Consumers add `role="listitem"` when inside a `role="list"` container, or `role="option"` inside a listbox.
- **Focus management:** Interactive items receive focus via `tabIndex: 0` (set by consumer or via Tamagui's focusable behavior).
- **Screen reader announcements:** Title and description text are announced naturally as text content.
- **Contrast:** Title uses `$color` (primary text), Description uses `$colorSubtitle` (muted) — both must meet 4.5:1 against background.

---

## 6. Styling

- **Design tokens used:** `$1`–`$4` (space), `$2.5` (gap), `$3`–`$5` (fontSize), `$color`, `$colorSubtitle`, `$color3`, `$color4`, `$outlineColor`, `$body` (fontFamily), `$3` (borderRadius).
- **Responsive behavior:** Full width, adapts to container. No breakpoint-specific behavior.
- **Reduced motion:** No animations to degrade.
- **Dark mode:** Automatic via token system; no component-specific overrides needed.

---

## 7. Composition

- **What can contain this component:** Any layout container (`YStack`, `ScrollView`, `FlatList`, etc.). Commonly wrapped in a `role="list"` container.
- **What this component can contain:**
  - `Item.Leading`: Avatar, Icon, Checkbox, RadioGroup.Item
  - `Item.Content`: Always contains `Item.Title`; `Item.Description` is optional
  - `Item.Trailing`: Button, Badge, Icon, Switch
- **Anti-patterns:** Do not nest `Item` inside `Item`. Do not place complex forms inside `Item`.

---

## 8. Breaking Change Criteria

- Removing or renaming any sub-component (`Leading`, `Content`, `Title`, `Description`, `Trailing`)
- Changing size variant token values
- Changing the interactive variant behavior (hover/press/focus)
- Changing the rendered element type

---

## 9. Test Requirements

- **Behavioral tests:** Renders all 6 sub-components; renders with only required sub-components (Content + Title); size variants apply without errors; interactive variant renders without errors.
- **Accessibility tests:** Focus indicator present on interactive variant (visual regression); contrast ratios meet AA standards.
- **Visual regression:** Default, hover, focus, and pressed states for interactive variant across all sizes.
