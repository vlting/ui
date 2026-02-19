# Component Contract — DeadlineIndicator

## 1. Public API

### Base Props

`DeadlineIndicator` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: TaskCard, SubtaskList rows, GanttChart row metadata, TaskDetailPanel metadata section, list row cells.

May contain: An optional icon and a date label text.

---

## 2. Behavioral Guarantees

- On track: Neutral color token treatment.
  - Due soon (within a configurable threshold, e.g., 2 days): Warning token treatment.
  - Overdue: Error token treatment.
  - No deadline set: Component is not rendered (or renders a neutral "No due date" placeholder if explicitly required).
- Controlled vs uncontrolled: All state is derived from the `deadline` date prop and the current date. The component does not manage state.
- Keyboard behavior: Non-interactive by default. If made interactive (e.g., opens a date picker), it is focusable via Tab and activates with Enter or Space.
- Screen reader behavior:
- Motion rules: No motion on this component. Urgency state changes are instant.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Non-interactive instances are not Tab stops. Interactive instances include a visible focus ring.
- Contrast expectations: Text within the badge must meet 4.5:1 against the badge background. Urgency must not be communicated through color alone — an icon and/or text label must also indicate status.
- Reduced motion behavior: No animations; not applicable.

---

## 4. Styling Guarantees

- Required tokens: neutral badge background and text (on track), warning badge background and text (due soon), error badge background and text (overdue), focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, border widths, or font sizes.
- Dark mode expectations: Error, warning, and neutral badge tokens must resolve to appropriate dark-mode values. Badge text must maintain sufficient contrast on dark badge backgrounds.
- Layout rules:
- Responsive behavior: The indicator is a fixed-size inline element. It does not scale with its container but respects the minimum touch target size requirement on mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DeadlineIndicator.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
