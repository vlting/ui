# Component Contract — EmployeeCard

## 1. Public API

### Base Props

`EmployeeCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: grid or list containers in directory views, sidebar panels, popover content, search result lists. Must be a descendant of the design system Provider.

May contain: - `EmployeeCard.Avatar` — profile photo or initials avatar.

---

## 2. Behavioral Guarantees

- Default (non-interactive): the card is purely presentational.
  - Hoverable/Pressable (if interactive): card surface shows a hover background change using token color; cursor changes to pointer.
  - Focused (if interactive): card has a visible focus ring.
  - Active/Pressed (if interactive): brief press feedback using active token color.
  - Loading (skeleton): when data is pending, each sub-component region shows a skeleton placeholder of appropriate width and height.
- Controlled vs uncontrolled: this is a presentation-only component. Props drive all displayed data. No internal state beyond optional hover/press visual feedback.
- Keyboard behavior: if the card is interactive, it is a focusable element activated by Enter or Space. Non-interactive cards are not in the Tab order.
- Screen reader behavior: the card announces as a single named region. The employee's full name is the primary label. Role and department are read as supplementary text in order. If interactive, the card announces as a button or link with the employee's name.
- Motion rules: hover background transition uses a short duration token suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: interactive cards must be reachable via Tab and activated via Enter/Space. Non-interactive cards are excluded from Tab order.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress hover background transition.

---

## 4. Styling Guarantees

- Required tokens: card background, card border, card shadow, avatar fallback background, name text color, role text color, department/muted text color, hover background (interactive variant), focus ring color, space tokens, typography scale tokens, radius token.
- Prohibited hardcoded values: no hardcoded colors, spacing, shadows, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; card surfaces must not become illegible against dark page backgrounds.

- Responsive behavior: card adapts width to its container. In a grid layout, a minimum width constraint prevents the card from becoming too narrow to read comfortably.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `EmployeeCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
