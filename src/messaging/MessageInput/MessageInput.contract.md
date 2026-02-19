# Component Contract — MessageInput

## 1. Public API

### Base Props

`MessageInput` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `empty` state: send button disabled; placeholder visible.
- In `composing` state: send button enabled; text present.
- In `with attachments` state: attachment previews visible above the input.
- In `sending` state: brief sending indicator; input may be temporarily disabled.
- In `error` state: if send fails, an error message appears and the input is re-enabled.
- In `disabled` state: entire input bar non-interactive; reduced opacity.

- Keyboard behavior: `Enter` sends the message (configurable); `Shift+Enter` inserts a newline; `Escape` may clear the input or close the emoji picker if open.
- Screen reader behavior: the text field has a clear label ("Message [contact name]"); the send button has a descriptive `aria-label`; send success is announced via a live region.
- Motion rules: sending animation and attachment chip entrance respect `prefers-reduced-motion`.

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
- Reduced motion: suppress sending animation.

---

## 4. Styling Guarantees

- Required tokens: `background` (input), `borderColor`, `borderColorFocus`, `color`, `colorMuted` (placeholder), `colorPrimary` (send button), `backgroundSend`, `focusStyle`, `space`, `borderRadius`, `size` (button dimensions).
- Prohibited hardcoded values: no literal color strings, pixel dimensions, or max-height values.
- Dark mode: input background, border, and send button tokens must resolve with sufficient contrast in dark themes.

- Responsive behavior: input bar is sticky at the bottom of its container on all viewports.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MessageInput.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
