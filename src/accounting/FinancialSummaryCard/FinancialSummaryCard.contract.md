# Component Contract — FinancialSummaryCard

## 1. Public API

### Base Props

`FinancialSummaryCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a dashboard grid, a summary row, a report header section.

May contain: a label slot, a primary metric value slot, an optional delta/trend slot, an optional period/context label slot, an optional action slot (e.g., "View details" link).

---

## 2. Behavioral Guarantees

- In `idle` state: fully rendered with data.
- In `loading` state: a skeleton placeholder occupies the card area with animated shimmer (reduced to static if reduced motion is active).
- In `empty` state: a neutral dash or em-dash is shown in place of the metric value with a muted label.
- In `error` state: an error indicator (icon + short message) replaces the metric value.
  - **hover / focus** (if the card is interactive): a subtle elevation or border change using the hover token; focus ring visible on keyboard navigation.
- In `disabled` state: not applicable for display-only usage.
- Controlled vs uncontrolled: the card is fully controlled — all data, loading, and error states are supplied via props.
- Keyboard behavior: if the card is interactive (e.g., navigates to a detail view on click), it must be focusable and activatable with Enter or Space.
- Screen reader behavior: the card exposes a descriptive accessible name combining the label and value; trend information (up/down) includes a text equivalent (e.g., "up 12% from last period").
- Motion rules: skeleton shimmer uses `duration.normal` tokens; state transitions (loading to loaded) use `duration.fast`; all animations respect `prefers-reduced-motion`.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: interactive cards use `role="button"` or are rendered as `<a>` elements; purely display cards use no interactive ARIA; trend icons are accompanied by visually hidden text equivalents.
- Focus rules: focus ring must be visible; focus must not be trapped within the card.
- Contrast expectations: metric value text meets WCAG AA (4.5:1) against the card background; delta text (positive/negative) meets AA in both light and dark themes.
- Reduced motion behavior: skeleton shimmer and transition animations are disabled; the card renders in its final visual state immediately.

---

## 4. Styling Guarantees

- Required tokens: card background, card border, card shadow, metric value text color, label text color, positive delta color token, negative delta color token, skeleton background token.
- Prohibited hardcoded values: no raw hex codes, numeric padding, or font sizes.
- Dark mode expectations: card background must be distinguishable from the page background in dark mode; positive and negative delta colors must remain semantically distinct without relying solely on hue.
- Layout rules: fixed or fluid card container with defined min/max width tokens; internal layout is a vertical stack — label at top or bottom, metric value prominent in the center, delta/context line below.
- Responsive behavior: cards may be displayed in a responsive grid; each card maintains its internal layout regardless of grid column count.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `FinancialSummaryCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
