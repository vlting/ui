# Component Contract — FunnelVisualization

## 1. Public API

### Base Props

`FunnelVisualization` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: all stages rendered with provided data.
- In `hover` state: hovering a stage highlights it and may surface a tooltip with additional detail.
- In `focus` state: focused stage shows a visible focus ring.
- In `loading` state: skeleton or placeholder while data is being provided.
- In `empty` state: a meaningful empty state when no funnel data is provided.
- The funnel is primarily presentational; stage selection or drill-down is optional and controlled externally.

- Keyboard behavior: if stages are interactive, arrow keys navigate between stages; `Enter` or `Space` activates.
- Screen reader behavior: the funnel communicates as a structured list of stages, each announcing its name, volume, and conversion rate.
- Motion rules: entrance animations and hover transitions respect `prefers-reduced-motion`; no animation when reduced motion is active.

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
- Reduced motion: suppress entrance animations and hover transitions.

---

## 4. Styling Guarantees

- Required tokens: stage fill tokens (supporting multiple distinct stages), `color` (text), `colorMuted`, `background`, `borderColor`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or dimension values.
- Dark mode: all tokens must resolve with sufficient contrast in dark themes.

- Responsive behavior: on narrow viewports the funnel switches to a vertical orientation; on wider viewports it may render horizontally.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `FunnelVisualization.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
