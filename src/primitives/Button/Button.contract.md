# Component Contract — Button

## 1. Public API

### Base Props

`Button` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: forms, dialog footers, toolbar groups, card footers, list item actions, page-level CTAs.

May contain: a text label, a leading icon, a trailing icon, or a loading spinner. Icon-only variant requires an `aria-label`.

---

## 2. Behavioral Guarantees

- Idle: default visual for the variant.
  - Hover: hover-state token applied to background or text.
  - Focus: focus ring visible.
  - Active/pressed: pressed-state visual feedback.
  - Loading: loading spinner visible, label optionally hidden or alongside spinner, not interactive.
  - Disabled: visually muted, not interactive, `aria-disabled="true"` or `disabled` attribute.
- Controlled vs uncontrolled: the button does not own state. It fires an `onPress` / `onClick` callback. Loading and disabled states are controlled by the parent.
- Keyboard behavior:
- Screen reader behavior: the button's label text is its accessible name. If icon-only (no visible label), an `aria-label` must be provided. Loading state announces "loading" via an `aria-label` update or via an `aria-live` region. Disabled button is conveyed via `aria-disabled` or `disabled` attribute.
- Motion rules: hover and active background transitions use a short duration from motion tokens. Focus ring appearance is instant (no transition). Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: always has an accessible name (label text or `aria-label`). When loading, `aria-label` may update to convey the loading state (e.g., "Saving..."). `aria-disabled="true"` is used when the button must remain in the tab order but is non-functional. `disabled` attribute is used when it should be fully skipped.
- Focus rules: always visible focus ring. The focus ring must not be clipped by overflow:hidden on parent containers.
- Contrast expectations: label text against button background must meet WCAG AA in all variants and states (idle, hover, active). Disabled state is exempt from contrast requirements per WCAG but must still be perceivably distinct from non-disabled.
- Reduced motion behavior: hover and active background transitions are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: primary accent, on-accent text, secondary/outline border, tertiary/ghost text, destructive semantic tokens, hover-state overlay, pressed-state overlay, disabled tokens (background and text), focus ring token, space tokens (padding, icon gap, minimum height), border-radius token, type scale token (button label).
- Prohibited hardcoded values: no raw hex colors, no pixel-based padding or min-height, no hardcoded font sizes or weights.
- Dark mode expectations: all button variants must maintain correct contrast and visual hierarchy in dark mode. Destructive variant must remain clearly destructive-looking. Focus ring must be visible against both light and dark backgrounds.

- Responsive behavior: the button itself does not change layout at breakpoints. The parent controls layout. A `fullWidth` prop causes the button to fill its container.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Button.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
