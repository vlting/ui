# Component Contract — OrgAvatar

## 1. Public API

### Base Props

`OrgAvatar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: OrgSwitcher, navigation headers, settings cards, list items, team member rows. Wrapping in a pressable/button element is the responsibility of the parent.

May contain: an image element or a text element (initials). No other children.

---

## 2. Behavioral Guarantees

- Image loaded: displays the org logo image, clipped to the container shape.
  - Image loading: optionally shows a skeleton/placeholder background while the image loads.
  - Image error / no image: displays the initials or a generic org icon fallback.
  - Disabled: not applicable (display-only). If the parent makes it interactive, the parent handles disabled states.
- Controlled vs uncontrolled: display-only. Accepts `src`, `name` (for initials generation), and `size` as props.
- Keyboard behavior: not focusable by itself. If wrapped in a button or link, the parent handles focus.
- Screen reader behavior: the image (if present) must have an `alt` attribute equal to the org name. If the fallback initials are shown, the container must have an `aria-label` equal to the org name.
- Motion rules: image load transition (opacity fade-in) uses a subtle animation from motion tokens. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: always provide a text alternative equal to the organization name — via `alt` on the image, or `aria-label` on the container when showing initials/icon.
- Focus rules: not focusable. Does not participate in tab order.
- Contrast expectations: initials text must meet WCAG AA contrast against the fallback background token.
- Reduced motion behavior: the image fade-in animation is disabled under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: fallback background color, fallback text color, border color (optional), border radius (for square variant), size tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based width/height values, no hardcoded font sizes for initials.
- Dark mode expectations: fallback background and text tokens must have appropriate dark-mode variants. Image display is unaffected by theme, but the fallback state must remain legible.

- Responsive behavior: size prop drives all sizing; no autonomous responsive changes. The parent controls which size to use at each breakpoint.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `OrgAvatar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
