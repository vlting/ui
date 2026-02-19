# Component Contract — MetricCard

## 1. Public API

### Base Props

`MetricCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a dashboard grid, a summary row, a report section header.

May contain: a label slot, a primary metric value slot, an optional delta/trend slot, an optional period label slot, an optional sparkline slot, and an optional action slot (e.g., "See breakdown").

---

## 2. Behavioral Guarantees

- In `idle` state: fully rendered with the metric value and trend data.
- In `loading` state: a skeleton placeholder with animated shimmer (disabled under reduced motion).
- In `empty` state: a neutral dash or em-dash is shown in place of the metric value.
- In `error` state: an error icon and a short message replace the metric value.
  - **hover / focus** (if the card is interactive): subtle elevation or border change using the hover token; focus ring visible on keyboard navigation.
- Controlled vs uncontrolled: fully controlled — all data, loading, and error states are supplied via props.
- Keyboard behavior: if the card is interactive (navigates to a detail view), it must be focusable and activatable with Enter or Space.
- Screen reader behavior: the card exposes a descriptive accessible name combining the label, value, and trend (e.g., "Monthly Active Users: 12,400, up 8% from last month").
- Motion rules: skeleton shimmer uses `duration.normal`; state transitions use `duration.fast`; all animations respect `prefers-reduced-motion`.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: interactive cards use `role="button"` or are rendered as `<a>` elements; display-only cards need no interactive ARIA; trend icons are accompanied by visually hidden text equivalents (e.g., "increased" or "decreased").
- Focus rules: focus ring must be visible; focus must not be trapped within the card.
- Contrast expectations: metric value meets WCAG AA (4.5:1) against the card background; delta text meets AA in both light and dark themes; sparkline stroke meets 3:1 non-text contrast.
- Reduced motion behavior: skeleton shimmer and transition animations are disabled; the card renders in its final state immediately.

---

## 4. Styling Guarantees

- Required tokens: card background, card border, card shadow, metric value text color, label text color, positive delta color token, negative delta color token, sparkline stroke token, skeleton background token.
- Prohibited hardcoded values: no raw hex codes, numeric padding, or font sizes.
- Dark mode expectations: card background must be distinguishable from the page background in dark mode; positive and negative delta colors must remain semantically distinct.
- Layout rules: fixed or fluid card container with defined min/max width tokens; internal layout is a vertical stack — label (above or below), metric value (prominent), delta row, optional sparkline area at the bottom.
- Responsive behavior: cards may be arranged in a responsive grid; each card maintains its internal layout regardless of grid column count.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MetricCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
