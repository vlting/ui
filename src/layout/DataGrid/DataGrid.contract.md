# Component Contract — DataGrid

## 1. Public API

### Base Props

`DataGrid` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

| Category | Examples |
|----------|---------|
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `flex`, `flexDirection` |
| Spacing | `padding`, `paddingHorizontal`, `margin`, `gap` (space tokens) |
| Visual | `backgroundColor`, `borderColor`, `borderRadius`, `opacity` |
| Theme | `theme`, `themeInverse` |
| Animation | `animation`, `enterStyle`, `exitStyle` |
| Accessibility | `accessible`, `accessibilityLabel`, `accessibilityRole`, `aria-*` |
| Events | `onPress`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the `.spec.md`.

### Composition Context

Intended to be wrapped by: page-level admin views, full-screen data workbench layouts, panel sections with defined height constraints. Must be a descendant of the design system Provider. The grid must be placed in a container with explicit height or max-height to enable internal scrolling.

May contain: a column header row (with sort, resize, and filter affordances), data rows with cells, optional row group headers, optional footer row for aggregations, and an optional toolbar above the grid.

---

## 2. Behavioral Guarantees

- Default: rows visible, columns in their initial order, no sort applied.
  - Sorted: active sort column shows a directional arrow; rows reorder.
  - Filtered: rows not matching the active filter are hidden; filter indicator appears in the column header.
  - Selected row(s): row background changes to selected token; selection checkbox is checked.
  - Cell editing (if enabled): double-click or Enter on a cell opens an inline editor within the cell; cell border changes to focused/editing token.
  - Column resizing: resize handle is dragged; column width updates in real time.
  - Loading: skeleton rows replace data rows while initial data is fetched.
  - Empty: empty state message replaces the grid body when no rows exist or match filters.
  - Error: error message replaces the grid body when data cannot be displayed.
- Controlled vs uncontrolled: row data, column definitions, sort state, filter state, and selection state all support controlled and uncontrolled patterns. The grid emits change callbacks for each interactive concern.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: row hover background transition uses a short duration token suppressed under reduced motion. Sort and filter transitions are immediate.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: the grid manages focus with a roving tabindex pattern across cells. Focus is visible at all times. Inline cell editors capture focus when active.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress row hover transition.

---

## 4. Styling Guarantees

- Required tokens: header background, header text, row background, alternating row background (optional), row hover background, row selected background, cell editing background, divider color (horizontal and vertical), sort arrow color, resize handle color, focus ring, loading skeleton color, space tokens, size tokens (row height, cell padding), typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, pixel dimensions, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; row separators and selection/hover states must remain distinguishable against dark backgrounds.

- Responsive behavior: on small screens, the grid scrolls horizontally within its container. Column pinning (first/last column fixed during horizontal scroll) is supported via a configuration prop. A card-per-row mobile alternative layout may be offered but is a separate concern from the grid itself.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DataGrid.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
