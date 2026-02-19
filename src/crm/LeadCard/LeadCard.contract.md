# Component Contract — LeadCard

## 1. Public API

### Base Props

`LeadCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed inside a lead list, a lead pipeline `KanbanColumn`, or a qualification queue view.

May contain: - `LeadCard.Name` — the lead's name, optionally as a link.

---

## 2. Behavioral Guarantees

- Idle: Default appearance.
  - Hover: Subtle background or shadow change indicating the card is interactive.
  - Focus: Visible focus ring on the card or the primary name link.
  - Loading: Skeleton for name, status, and value.
  - Qualified: The status badge reflects the "Qualified" state; card may have a distinct visual treatment.
  - Disqualified: The card has a muted/reduced-opacity visual treatment.
- Controlled vs uncontrolled: Fully controlled. Parent supplies lead data and action callbacks.
- Keyboard behavior: Tab focuses the card. Enter opens the lead detail. Action buttons within the card are separately focusable.
- Screen reader behavior: Lead name is the primary accessible label. Status and value are announced as supplementary information. Action buttons have descriptive labels incorporating the lead name.
- Motion rules: Hover state transitions animate subtly. Status badge color transitions (if status changes). Reduced motion: instant changes.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Card acts as a list item in its list context. Lead name is a link or button. Status badge has an accessible label (not icon-only). Value is announced with a currency context. Action buttons have descriptive `aria-label` values including the lead name.
- Focus rules: Name link/button is the first focusable element. Action buttons follow in tab order.
- Contrast expectations: Name text, status badge text, value text, and meta text all meet WCAG AA against the card background.
- Reduced motion behavior: Hover and status transitions are suppressed.

---

## 4. Styling Guarantees

- Required tokens: card background, card hover background, card border color, card shadow/elevation, name text color, value text color, meta/muted text color, spacing tokens, border radius token.
- Prohibited hardcoded values: No hardcoded colors, pixel dimensions, or status-specific hex values (status colors are provided by `LeadStatusBadge` via semantic tokens).
- Dark mode expectations: Card background uses a dark surface token. All text adapts to dark theme tokens.

- Responsive behavior: Card width is determined by its container (list or board column). Content does not overflow; long names are truncated with an ellipsis.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `LeadCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
