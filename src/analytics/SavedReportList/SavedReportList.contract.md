# Component Contract — SavedReportList

## 1. Public API

### Base Props

`SavedReportList` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a sidebar panel, a modal, a page section, a report management drawer.

May contain: report rows (each with name, metadata, and actions slots), a list header with a search/filter input slot, a pagination or load-more control slot, and empty/error state slots.

---

## 2. Behavioral Guarantees

- In `idle` state: rows fully rendered with report data.
- In `row hover` state: row background shifts to the hover token; inline actions become visible.
- In `row selected / active` state: row background shifts to the selected token.
- In `row focus` state: focus ring visible on the row.
- In `loading` state: skeleton rows occupy the list area.
- In `empty` state: an empty-state message with a prompt to create the first report is displayed.
- In `error` state: an error-state message spans the list area.
- Controlled vs uncontrolled: the selected report and the list data are always controlled externally via props; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus to the list container; arrow keys navigate between rows; Enter or Space opens the focused report; the row-level actions menu is reachable via Tab within the row and activatable with Enter or Space.
- Screen reader behavior: the list has `role="list"` with `aria-label`; each row has `role="listitem"` and an accessible name including the report name and last modified date; row actions have descriptive `aria-label` values.
- Motion rules: row hover transitions use `duration.fast`; list entrance (if animated) uses `duration.normal`; reduced motion disables all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="list"` with `aria-label` on the list container; each item has `role="listitem"`; action buttons within each row have descriptive `aria-label` values (e.g., "Delete Q1 2025 Revenue Report"); destructive action dialogs have `role="alertdialog"`.
- Focus rules: focus is visible on rows and action buttons; focus order within a row is name → metadata → actions; after deleting a report, focus moves to the next row or the empty state.
- Contrast expectations: report name text meets WCAG AA (4.5:1) against the row background; metadata text meets AA in muted color; action icons meet 3:1 non-text contrast.
- Reduced motion behavior: row hover transitions and list entrance animations are disabled; state changes are reflected immediately.

---

## 4. Styling Guarantees

- Required tokens: list background, row background, row hover background, row selected background, row border color, report name text color, metadata text color, action icon color, empty-state text color, skeleton background.
- Prohibited hardcoded values: no raw hex codes, pixel row heights, or font sizes.
- Dark mode expectations: row borders and hover states must remain distinguishable against the dark list background; selected row must be visually distinct from hover in dark mode.
- Layout rules: full-width vertical list; each row is a horizontally arranged flex item — report name and metadata on the leading side, actions on the trailing side; rows have a consistent height defined by a size token.
- Responsive behavior: on mobile, contextual actions collapse into a bottom sheet triggered by a row-level menu button; on desktop, actions are visible inline on hover or via a menu button.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SavedReportList.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
