# Component Contract — ABTestVariantCard

## 1. Public API

### Base Props

`ABTestVariantCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: card renders with all provided data.
  - **hover** (pointer devices): subtle background shift using a theme hover token; no layout change.
- In `focus` state: visible focus ring using focus token color and 2 px minimum width.
- In `selected/active` state: border or background highlight to indicate the chosen or highlighted variant; must not rely on color alone.
- In `disabled` state: reduced opacity via token; non-interactive.
- The card itself is not an interactive control by default; it may be made pressable by a wrapping consumer.

- Keyboard behavior: if pressable, activates on `Enter` and `Space`.
- Screen reader behavior: the card container should expose its label and key metric values in reading order.
- Motion rules: hover/focus transitions use the system reduced-motion token; no animation when `prefers-reduced-motion: reduce` is active.

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
- Reduced motion: suppress decorative transitions; retain instant state changes.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor`, `color` (text), `colorHover`, `backgroundHover`, `focusStyle`, `borderRadius`, `space` (padding).
- Prohibited hardcoded values: no literal color strings, pixel spacing, border-radius numbers, or font-size values.
- Dark mode: all tokens must resolve correctly in both light and dark themes; metric highlight tokens must maintain sufficient contrast in both modes.

- Responsive behavior: on narrow viewports the card occupies full width; on wider viewports it may sit in a grid alongside peer variant cards.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ABTestVariantCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
