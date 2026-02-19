# Component Contract — InventoryTable

## 1. Public API

### Base Props

`InventoryTable` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page layout containers, dashboard panels, drawer/sheet bodies.

May contain: column header cells, data rows, an empty state slot, a loading state slot, optional pagination controls below the table.

---

## 2. Behavioral Guarantees

- Idle: rows display default background.
  - Hover (web): row receives a distinct background token on pointer hover.
  - Focus: keyboard-focused row or cell receives a visible focus ring using the focus color token.
  - Selected: selected row receives a distinct background and/or indicator using selection color tokens.
  - Disabled: non-interactive rows are visually de-emphasized using muted color tokens.
  - Loading: the table body renders a skeleton or loading indicator while data is pending; column headers remain visible.
  - Empty: when no rows are present, an empty state message occupies the table body area.
- Controlled vs uncontrolled: selection state may be controlled (via props) or uncontrolled (internal state).
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: row transitions (selection highlight) respect reduced-motion preferences; no animation when `prefers-reduced-motion` is active.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress row highlight transitions and any animated loading states when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: background (default, hover, selected, striped), border color, text (primary, secondary, muted), focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve correctly in both light and dark themes; striped row treatment must maintain readable contrast in dark mode.

- Responsive behavior: on narrow viewports, non-essential columns may be hidden or collapsed into a detail disclosure pattern. Minimum touch target size observed for any interactive row or cell element.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `InventoryTable.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
