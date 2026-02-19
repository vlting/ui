# Component Contract — OrderHistoryTable

## 1. Public API

### Base Props

`OrderHistoryTable` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: an account screen, an order management page, a profile section.

May contain: column header row, order rows (with status badges and links), empty state, and loading skeleton rows.

---

## 2. Behavioral Guarantees

loading (skeleton rows), empty (no orders), populated (row list), error (load failed with retry).
- Each row is pressable and triggers an `onViewOrder(orderId)` callback.
- If a "View Details" link/button is present, it is the primary interactive element of the row.
- Sorting by column header (Date, Total) is optional; if present, the sorted column shows a direction indicator.

- Keyboard behavior:
- Screen reader behavior: table uses appropriate table semantics (caption, column headers); each row cell is associated with its column header.


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
- Reduced motion: no shimmer animation on skeletons.

---

## 4. Styling Guarantees

- Required tokens: `background` (table/row), `borderColor` (row separator), `color` (all text), alternating row background token (if used), status badge tokens, heading type token for column headers.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel padding outside the token scale.
- Dark mode: all table surfaces, separators, text, and status badges must resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `OrderHistoryTable.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
