# Component Contract — PayrollSummaryCard

## 1. Public API

### Base Props

`PayrollSummaryCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: payroll dashboard grids, employee self-service portals, finance reporting panels, drawer side panels. Must be a descendant of the design system Provider.

May contain: a pay period header, a net pay prominence section, a gross/deductions breakdown section, and an optional footer (payment date, payment method indicator). All sections are driven by props.

---

## 2. Behavioral Guarantees

- Default (non-interactive): purely presentational.
  - Hoverable/Pressable (if interactive, navigates to full detail): card surface shows hover background token; cursor becomes a pointer.
  - Focused (if interactive): visible focus ring on the card.
  - Loading: skeleton placeholders replace figure values and the period label while data is pending.
  - Error: error state message replaces the card body when data cannot be loaded (managed by parent).
- Controlled vs uncontrolled: purely display-driven by props. All payroll figures are passed as formatted strings or numeric values with locale/currency configuration.
- Keyboard behavior: if interactive, the card is focusable and activated by Enter or Space. Non-interactive cards are not in the Tab order.
- Screen reader behavior: the card announces as a named region or article. Key figures (pay period, gross, deductions, net pay) are read in a logical top-to-bottom order. Currency values are announced with their currency label. If interactive, the card announces as a button or link labeled with the pay period.
- Motion rules: hover background transition uses a short duration token suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: interactive cards reachable via Tab and activated by Enter/Space. Non-interactive cards excluded from Tab order.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress hover transition.

---

## 4. Styling Guarantees

- Required tokens: card background, border, shadow, header text, figure label text, figure value text, deduction value color (semantic muted or danger token), net pay text (prominent heading token), hover background, focus ring, space tokens, radius token, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; financial data must remain fully legible against dark card surfaces.

- Responsive behavior: card fills its container width. On very narrow screens, the layout remains single-column. Net pay remains visually prominent at all breakpoints.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PayrollSummaryCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
