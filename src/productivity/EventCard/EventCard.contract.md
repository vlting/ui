# Component Contract — EventCard

## 1. Public API

### Base Props

`EventCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: CalendarView day cells, agenda list containers, horizontal scroll strips for day view events.

May contain: - EventCard.Time: the event's time range.

---

## 2. Behavioral Guarantees

- Idle: Static display of event metadata.
  - Hover (web): Subtle background elevation or color shift to signal interactivity.
  - Focus: Visible focus ring around the card boundary.
  - Active/Pressed: Brief press feedback (scale or opacity change).
  - Disabled: Card is non-interactive, de-emphasized opacity.
  - Past event: Visually de-emphasized (reduced opacity or muted color tokens) to indicate the event has elapsed.
- Controlled vs uncontrolled: EventCard is a purely presentational component. No internal state. All data is supplied via props.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Press/hover transitions use a brief duration (under 150ms). Entrance animations (if used in a list) follow the list's animation orchestration. All motion is suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: If interactive, the card is included in the natural Tab order. Focus ring must be clearly visible and use the focus token.
- Contrast expectations: Title text must meet 4.5:1 contrast. Time and Location text must meet at least 3:1. The accent bar must not be the sole means of conveying category information.
- Reduced motion behavior: Hover and press transitions are instant. No entrance slide or fade animations.

---

## 4. Styling Guarantees

- Required tokens: surface background, surface border, text primary (title), text secondary (time, location), accent/category color, focus ring color, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Surface tokens must shift to dark-mode equivalents. Accent colors must remain distinguishable against dark surfaces. Text tokens must ensure adequate contrast in dark mode.
- Layout rules:
- Responsive behavior: The card stretches to fill its container's width. On narrow viewports the title may truncate to one or two lines with an ellipsis.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `EventCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
