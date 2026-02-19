# Component Contract — ConversionStatCard

## 1. Public API

### Base Props

`ConversionStatCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: renders metric value, label, and trend.
  - **hover** (pointer devices): subtle background shift if the card is pressable.
- In `focus` state: visible focus ring if pressable.
- In `loading` state: skeleton or placeholder visible while data is not yet available.
- In `error` state: an error state communicates that the metric could not be loaded.
- The card is not interactive by default; pressable behavior is opt-in via consumer wrapping.

- Keyboard behavior: if pressable, activates on `Enter` and `Space`.
- Screen reader behavior: announces label, value, and trend direction (e.g., "Conversion rate, 4.2%, up 0.8% from last period").
- Motion rules: trend icon or value change animations respect `prefers-reduced-motion`.

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
- Reduced motion: suppress any counting animations or entrance animations.

---

## 4. Styling Guarantees

- Required tokens: `background`, `backgroundHover`, `borderColor`, `color`, `colorMuted`, `colorPositive`, `colorNegative`, `colorNeutral`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or font-size values.
- Dark mode: positive/negative/neutral tokens must maintain sufficient contrast in dark themes.

- Responsive behavior: card occupies full width in single-column layouts; fixed size in grid layouts.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ConversionStatCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
