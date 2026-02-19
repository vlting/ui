# Component Contract — CashFlowChart

## 1. Public API

### Base Props

`CashFlowChart` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `ChartWrapper` (for consistent title, legend, and action affordances); a card or panel container.

May contain: axis elements, data series paths/areas, grid lines, tooltip overlay, legend entries, an empty/error state slot.

---

## 2. Behavioral Guarantees

- In `idle` state: chart is fully rendered with data.
- In `hover / focus` state: a tooltip or annotation appears near the nearest data point, showing the date and value.
- In `loading` state: a skeleton or placeholder occupies the chart area while data is being supplied.
- In `empty` state: a neutral empty-state message is displayed when no data is provided.
- In `error` state: an error-state message is displayed when data cannot be rendered.
- In `disabled` state: not applicable — the chart is a display-only element.
- Controlled vs uncontrolled: the active time range and selected data point may be controlled externally via props; internal hover state is uncontrolled.
- Keyboard behavior: focusable via Tab; arrow keys move focus between data points; Enter or Space reveals the tooltip for the focused point.
- Screen reader behavior: the chart container has a descriptive `aria-label` summarising the chart title and time range; individual data points expose their date and value via `aria-label` on focusable elements or a visually hidden summary table.
- Motion rules: transitions for tooltip appearance and data-point highlighting use `duration.fast` tokens; all motion respects the `prefers-reduced-motion` media query by disabling or minimising animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="img"` with `aria-label` on the chart root when the chart is purely visual; alternatively expose a visually hidden data table as a fallback.
- Focus rules: focus ring must be visible and use the focus color token; focus must never be trapped inside the chart.
- Contrast expectations: all axis labels, grid lines, and data annotations must meet WCAG AA contrast ratio (4.5:1 for text, 3:1 for non-text graphical elements).
- Reduced motion behavior: all entrance animations and tooltip transitions are disabled; the chart renders in its final state immediately.

---

## 4. Styling Guarantees

- Required tokens: background color, border color, text color (axis labels), positive-value fill token, negative-value fill token, grid line color token, tooltip background and text tokens.
- Prohibited hardcoded values: no raw hex codes, pixel spacing values, or font-size numbers anywhere in the component.
- Dark mode expectations: positive and negative fill tokens must remain distinguishable in dark mode without relying solely on hue; luminosity contrast between the chart background and data series must remain sufficient.
- Layout rules: fills its container width; height is determined by a size token or explicit prop; never clips data points.
- Responsive behavior: on narrow viewports the x-axis label density must reduce gracefully (fewer tick labels, no overlap); the chart container may switch to a horizontal scroll affordance rather than compressing data.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CashFlowChart.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
