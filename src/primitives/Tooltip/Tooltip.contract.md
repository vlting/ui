# Component Contract — Tooltip

## 1. Public API

### Base Props

`Tooltip` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: any trigger element — icon buttons, abbreviated labels, disabled form controls, truncated text. The Tooltip wraps or is associated with the trigger, not the other way around.

May contain: a single short string of text. No interactive elements (links, buttons). No images. No more than two lines of text.

---

## 2. Behavioral Guarantees

- Hidden: tooltip is not in the DOM or not visible.
  - Delay (hover): hover has started; tooltip will appear after the delay threshold.
  - Visible: tooltip is shown near the trigger.
  - Dismissing: tooltip fades out after mouse leaves or focus moves away.
- Controlled vs uncontrolled: primarily uncontrolled (show/hide managed internally by hover/focus detection). A `open` prop allows controlled usage for programmatic display.
- Keyboard behavior:
- Screen reader behavior: the tooltip content is associated with the trigger via `aria-describedby` (pointing to the tooltip element's ID) or `aria-label` (if used as the sole label for an icon button). The tooltip element has `role="tooltip"`. Screen readers announce the tooltip content when the trigger is focused.
- Motion rules: tooltip appearance uses a short fade-in from motion tokens. Disappearance uses a short fade-out. Suppressed under reduced motion (instant appear/disappear).

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: the tooltip has `role="tooltip"` and a unique ID. The trigger element has `aria-describedby` pointing to the tooltip ID (when tooltip is supplementary to an existing label) or `aria-label` (when tooltip is the sole label). The tooltip must not be hidden with `display:none` when visible — it must be in the accessibility tree.
- Focus rules: the tooltip itself is not focusable. Only the trigger element is in the tab order. When the trigger is focused, the tooltip is announced by screen readers.
- Contrast expectations: tooltip text against tooltip background must meet WCAG AA (4.5:1). The inverted surface pattern typically achieves high contrast naturally.
- Reduced motion behavior: fade-in/fade-out animations are instant (or omitted) under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: tooltip surface (high-contrast or inverted background), tooltip foreground (contrasting text), border-radius, shadow (optional), space tokens (internal padding, offset from trigger), type scale (caption/small).
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded z-index values (use z-index tokens), no hardcoded animation durations.
- Dark mode expectations: the tooltip surface should remain visually distinct from the background in both modes. The inverted pattern (dark in light mode, light in dark mode) is preferred. If a neutral elevation pattern is used instead, it must meet contrast requirements in both modes.

- Responsive behavior: on touch devices, tooltips do not appear on hover (touch has no hover). Focus-triggered tooltips do appear on touch (e.g., via keyboard navigation). Touch-specific patterns (long-press tooltips) are opt-in.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Tooltip.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
