# Component Contract — LeaveRequestCard

## 1. Public API

### Base Props

`LeaveRequestCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: approval queue lists, leave management dashboards, employee self-service portals, and scrollable panels. Must be a descendant of the design system Provider.

May contain: requester identity section, status badge, leave metadata section (type, dates, duration), optional footer with submission details or quick action buttons. Quick action buttons in the footer (approve/reject) delegate via callback props.

---

## 2. Behavioral Guarantees

- Default (non-interactive): purely presentational.
  - Pending status: status badge shows warning/pending semantic token colors.
  - Approved status: status badge shows success semantic token colors.
  - Rejected status: status badge shows error/danger semantic token colors.
  - Cancelled status: status badge shows muted/neutral semantic token colors.
  - Hoverable/Pressable (if interactive): card surface shows hover background token; cursor becomes a pointer.
  - Focused (if interactive): card has a visible focus ring.
  - Loading: skeleton placeholders replace each data region when data is pending.
- Controlled vs uncontrolled: purely display-driven by props. No internal state beyond optional hover/press feedback.
- Keyboard behavior: if interactive, the card is a focusable element activated by Enter or Space. Non-interactive cards are not in the Tab order.
- Screen reader behavior: the card announces as a named region or article. Key data points (requester name, leave type, date range, duration, status) are read in a logical order. If interactive, the card announces as a button or link labeled with the requester name and leave type.
- Motion rules: hover background transition uses a short duration token suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: interactive cards are reachable via Tab and activated by Enter/Space. Non-interactive cards are excluded from Tab order.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress hover transition.

---

## 4. Styling Guarantees

- Required tokens: card background, border, shadow, status badge semantic colors (pending, approved, rejected, cancelled), avatar fallback color, text colors (primary, secondary, muted), hover background, focus ring color, space tokens, radius token, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references, including status badge colors, must resolve to accessible values in dark mode without manual overrides.

- Responsive behavior: card fills its container width. On very narrow screens, the header row stacks the avatar/name above the status badge if horizontal space is insufficient.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `LeaveRequestCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
