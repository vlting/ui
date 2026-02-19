# Component Contract — MultiImageUploader

## 1. Public API

### Base Props

`MultiImageUploader` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form containers, modal bodies, page sections. Must be a descendant of a Provider that supplies the design token context.

May contain: image thumbnail slots, an add slot, optional helper/error text beneath the grid. Individual slots may contain preview images, progress overlays, and remove buttons.

---

## 2. Behavioral Guarantees

- Idle: grid shows filled thumbnails and an empty add slot (if limit not reached).
  - Hover (add slot): add slot visually elevates or changes border style to invite interaction.
  - Focus (add slot): focus ring rendered around add slot.
  - Active (add slot): brief press/active visual on the slot.
  - Uploading (per-slot): individual slot shows a progress indicator overlay.
  - Error (per-slot): individual slot shows an error state with a retry affordance.
  - Disabled: all slots non-interactive; reduced opacity applied via token.
  - Full: add slot hidden or replaced with a count-limit message when maximum images are reached.
- Controlled vs uncontrolled: supports both patterns. In controlled mode, parent manages the image list and change callbacks. In uncontrolled mode, component manages internal list state.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: thumbnail appearance and removal animate only if the user has not requested reduced motion. Transitions use duration tokens.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: focus is trapped or managed to avoid loss when a thumbnail is removed. If the removed image was the last in the list, focus moves to the add slot.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: disable entrance/exit animations; show and hide thumbnails immediately when `prefers-reduced-motion` is active.

---

## 4. Styling Guarantees

- Required tokens: background color, border color, border radius, icon color, error color, disabled opacity, space (gap, padding), size (slot dimensions).
- Prohibited hardcoded values: no hardcoded colors, pixel dimensions for spacing, border-radius values, or font sizes.
- Dark mode: slot backgrounds, borders, and overlay states must all reference theme-aware tokens so they invert correctly in dark mode without any manual color overrides.

- Responsive behavior: the grid adapts column count across breakpoints. On small screens, two columns are appropriate; wider viewports may show three or more. Column count should be token-driven or controlled via props.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MultiImageUploader.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
