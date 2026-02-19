# Component Contract — PieChart

## 1. Public API

### Base Props

`PieChart` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `ChartWrapper` (for title, legend, and action affordances); a card or panel; a dashboard grid cell.

May contain: pie/donut path elements, segment boundary strokes, an optional center label slot (donut), a tooltip overlay, a legend, and empty/error state slots.

---

## 2. Behavioral Guarantees

- In `idle` state: all segments rendered at full opacity.
- In `segment hover / focus` state: the hovered/focused segment is visually emphasized (slight scale or pull-out effect); other segments are dimmed; a tooltip shows the category name, value, and percentage.
- In `legend item hover` state: the corresponding segment is emphasized; others are dimmed.
- In `legend item toggle` state: a segment is hidden and the remaining segments re-proportion to fill the total.
- In `loading` state: a skeleton circle occupies the chart area.
- In `empty` state: a neutral placeholder circle and an empty-state message are displayed.
- In `error` state: an error message replaces the chart area.
- Controlled vs uncontrolled: visible segments may be controlled externally; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus into the chart; arrow keys cycle through segments; Enter or Space reveals the tooltip for the focused segment; Escape exits chart focus.
- Screen reader behavior: chart root has `aria-label` describing the chart title and total; each segment has an accessible description with the category name, value, and percentage; a visually hidden data table provides full data access.
- Motion rules: segment entrance animation (expand from center) uses `duration.normal`; hover emphasis uses `duration.fast`; tooltip appearance uses `duration.fast`; reduced motion disables all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="img"` with `aria-label` on the chart root; individual segment paths have `aria-label` with category name, value, and percentage; a visually hidden data table provides a full accessible alternative.
- Focus rules: focus ring is visible on focused segments; Tab navigates into and out of the chart cleanly; focus cycles through segments with arrow keys.
- Contrast expectations: segment fills must be distinguishable from adjacent segments at 3:1 non-text contrast; segment boundary strokes ensure separation between similarly valued segments; legend label text meets WCAG AA (4.5:1).
- Reduced motion behavior: entrance and hover animations are disabled; segments render in their final state immediately; tooltip appears without transition.

---

## 4. Styling Guarantees

- Required tokens: segment color tokens (one per category slot, extensible), segment boundary stroke token, chart background, center label text tokens (donut variant), legend text color, tooltip background and text, skeleton background.
- Prohibited hardcoded values: no raw hex codes, numeric radii, or pixel font sizes.
- Dark mode expectations: segment fills must remain distinguishable against the dark chart background without relying solely on hue; legend items and tooltip text must maintain sufficient contrast.
- Layout rules: the chart renders as a square or proportionally defined area; the pie/donut is centered within the container; optional center label (for donut variant) occupies the inner circle; the legend is placed below or to the right.
- Responsive behavior: on narrow viewports, the chart size scales down proportionally; the legend stacks below the chart and may scroll if the item count requires it.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PieChart.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
