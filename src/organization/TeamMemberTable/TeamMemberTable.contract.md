# Component Contract — TeamMemberTable

## 1. Public API

### Base Props

`TeamMemberTable` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page-level layout containers, settings sections, admin dashboard panels.

May contain: rows composed of an Avatar, member name and email, RoleBadge, AccessControlBadge (if applicable), status indicator, join date, and row action controls (buttons or overflow menu).

---

## 2. Behavioral Guarantees

- Idle: populated with member rows.
  - Empty: displays an empty-state message when there are no members.
  - Loading: skeleton rows while data is loading.
  - Row hover: row background shifts to hover token.
  - Row selected (if multi-select supported): row shows a selected state with a checkbox.
- Controlled vs uncontrolled: data, sorting, and pagination are controlled by the parent via props. The component emits callbacks for user actions (`onRoleChange`, `onRemoveMember`, `onResendInvite`, `onSortChange`, `onPageChange`).
- Keyboard behavior:
- Screen reader behavior: table uses `<table>`, `<thead>`, `<th scope="col">`, and `<tbody>` semantics. Sortable headers include `aria-sort`. Row action menus have `aria-label` describing the member they target. Status badges convey their meaning via text.
- Motion rules: row hover transition is a subtle background color change. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: table must have an accessible label. Sortable column headers have `aria-sort`. Action buttons within rows must have `aria-label` that includes the member's name (e.g., "Remove Alice Smith"). Multi-select checkboxes use `aria-label` with the member name.
- Focus rules: tab order progresses through all interactive controls in reading order (left-to-right, top-to-bottom). Row action menus trap focus while open.
- Contrast expectations: all text, badge labels, and icons must meet WCAG AA contrast against their background tokens.
- Reduced motion behavior: row hover and any row appear/disappear animations are disabled under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: surface, surface-raised, hover state, selected state, border, primary text, secondary text, space tokens (row height, cell padding), type scale tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded font sizes.
- Dark mode expectations: table header, row backgrounds, hover states, and borders must all resolve to appropriate dark-mode token values. Badge components used inside rows handle their own dark-mode theming.

- Responsive behavior: on narrow viewports, secondary columns (e.g., join date) may be hidden. On mobile, a card-per-member layout may replace the table. The Member and Role columns must always be visible.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TeamMemberTable.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
