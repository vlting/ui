# Component Contract — CampaignCard

## 1. Public API

### Base Props

`CampaignCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: card displays all passed data.
  - **hover** (pointer devices): subtle background or elevation shift using theme tokens.
- In `focus` state: visible focus ring on the card root when pressable.
- In `disabled` state: reduced opacity; non-interactive.
- The card is not interactive by default; it becomes pressable when wrapped by the consumer.

- Keyboard behavior: if pressable, activates on `Enter` and `Space`.
- Screen reader behavior: card root announces the campaign title as its accessible name; sub-components are read in document order.
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

- Required tokens: `background`, `backgroundHover`, `borderColor`, `color`, `colorMuted`, `focusStyle`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or border-radius numbers.
- Dark mode: all tokens must resolve correctly in both light and dark themes.

- Responsive behavior: full width on narrow viewports; fixed or fluid width within a grid on wider viewports.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CampaignCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
