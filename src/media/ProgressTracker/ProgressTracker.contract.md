# Component Contract — ProgressTracker

## 1. Public API

### Base Props

`ProgressTracker` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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



---

## 2. Behavioral Guarantees

- In `idle` state: all steps rendered in their current completion state.
- In `step completed` state: a step transitions from "current" to "completed" when the user advances.
- In `navigable steps` state: completed steps may be pressable to navigate back (controlled externally).
- In `disabled` state: non-interactive; shows progress but does not respond to interaction.

- Keyboard behavior: if steps are navigable, `Tab` moves focus between step nodes; `Enter` or `Space` activates a navigable step.
- Screen reader behavior: the tracker announces the current step label and position (e.g., "Step 2 of 5: Account details — current").
- Motion rules: step completion transitions (e.g., checkmark reveal, line fill) respect `prefers-reduced-motion`.

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
- Reduced motion: suppress step transition animations.

---

## 4. Styling Guarantees

- Required tokens: `colorCompleted`, `colorCurrent`, `colorRemaining`, `colorMuted`, `background` (node background), `borderColor`, `space`, `size` (node diameter).
- Prohibited hardcoded values: no literal color strings, pixel sizes, or transition durations.
- Dark mode: completed, current, and remaining states must all maintain sufficient contrast in dark themes.

- Responsive behavior: on narrow viewports switches to a condensed textual format ("Step N of M") or a single-row scrollable tracker.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ProgressTracker.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
