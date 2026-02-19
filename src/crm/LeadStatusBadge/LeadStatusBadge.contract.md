# Component Contract — LeadStatusBadge

## 1. Public API

### Base Props

`LeadStatusBadge` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Used inside `LeadCard.Status`, lead detail pages, lead list rows, and any summary view displaying lead qualification status.

May contain: A text label and an optional status dot icon. No other children.

---

## 2. Behavioral Guarantees

- Display-only (default): The badge is non-interactive and renders status as read-only.
  - Interactive (optional): If the badge acts as a trigger for a status change dropdown, it shows hover and focus states with a chevron indicator.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the status value and optionally an onChange callback for interactive mode.
- Keyboard behavior: If interactive, the badge is a button reachable via Tab and activatable via Enter/Space, opening a status selection menu.
- Screen reader behavior: The badge text is read as-is. If the badge is non-interactive, it has no special ARIA role. If interactive, it is a `<button>` with an `aria-label` including "Change status: [Current Status]".
- Motion rules: Status change (if interactive) transitions the background color smoothly. Reduced motion: instant color change.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Non-interactive badge has no special ARIA role (text is sufficient). Interactive badge uses `role="button"` with an `aria-label` communicating both the current status and the change affordance. Status must never be communicated by color alone — the text label is always present.
- Focus rules: Non-interactive badges are not in the tab order. Interactive badges are a single tab stop.
- Contrast expectations: Badge text must meet WCAG AA against its status background color token. Status background tokens must be chosen to ensure this contrast is maintained in both light and dark modes.
- Reduced motion behavior: Color transition animations on status change are suppressed.

---

## 4. Styling Guarantees

- Required tokens (per status):
- Prohibited hardcoded values: No hardcoded hex colors per status. All status colors reference semantic theme tokens.
- Dark mode expectations: Each status background token has a dark-mode variant that maintains WCAG AA contrast with its text token. Status is still visually distinguishable in dark mode.

- Responsive behavior: Badge size remains consistent across breakpoints. Text does not truncate — status labels are kept short by design.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `LeadStatusBadge.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
