# Component Contract — StageBadge

## 1. Public API

### Base Props

`StageBadge` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Used inside `DealCard.Stage`, deal detail views, `KanbanColumn` headers (as a label), and any summary display of deal stage.

May contain: A text label and an optional icon or status dot. No other children.

---

## 2. Behavioral Guarantees

- Display-only (default): Non-interactive, renders stage as read-only.
  - Interactive (optional): If the badge acts as a trigger for a stage-change action, it shows hover and focus states with a visual affordance (e.g., chevron icon).
- Controlled vs uncontrolled: Fully controlled. Parent supplies the stage value and optionally an onChange callback for interactive mode.
- Keyboard behavior: If interactive, the badge is a button reachable via Tab and activatable via Enter/Space, opening a stage selection menu. Non-interactive badges are excluded from the tab order.
- Screen reader behavior: The badge text label is read as-is. Non-interactive: text is sufficient, no ARIA role required. Interactive: rendered as a `<button>` with an `aria-label` including "Change stage: [Current Stage Name]".
- Motion rules: Stage change color transition animates smoothly in interactive mode. Reduced motion: instant color change.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Non-interactive badge requires no special ARIA role (visible text is sufficient). Interactive badge uses `role="button"` with a descriptive `aria-label` communicating both the current stage and the change intent. Stage must never be communicated by color alone — the text label is mandatory.
- Focus rules: Non-interactive badges are excluded from tab order. Interactive badges are single tab stops.
- Contrast expectations: Badge text must meet WCAG AA against its stage background color token. All stage-to-token mappings must be verified for WCAG AA compliance in both light and dark themes.
- Reduced motion behavior: Color transition animations are suppressed.

---

## 4. Styling Guarantees

- Required tokens (per stage):
- Prohibited hardcoded values: No hardcoded hex color values per stage. All stage colors reference semantic theme tokens.
- Dark mode expectations: Each stage's background and text tokens have dark-mode variants maintaining WCAG AA contrast. Stages remain visually distinguishable from each other in dark mode.

- Responsive behavior: Badge size remains consistent across breakpoints. Stage labels are kept short enough to never require truncation.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `StageBadge.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
