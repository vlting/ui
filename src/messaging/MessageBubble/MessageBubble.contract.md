# Component Contract — MessageBubble

## 1. Public API

### Base Props

`MessageBubble` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: message rendered.
- In `sending` state: outgoing message with a "sending" status indicator (spinner or clock icon).
- In `sent` state: checkmark or single tick.
- In `delivered` state: double checkmark.
- In `read` state: double checkmark with read color.
- In `failed` state: error indicator; a retry action may be provided.
  - **selected** (for forwarding or deletion): bubble highlighted.
  - **long-pressed** (mobile): triggers a context menu (managed by consumer).

- Keyboard behavior: if interactive (e.g., for selection), activates on `Enter` or `Space`; context menu trigger is keyboard-accessible.
- Screen reader behavior: the bubble announces sender name (if shown), message content, timestamp, and delivery status in a single accessible label or via structured children.
- Motion rules: new message entrance animation respects `prefers-reduced-motion`.

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
- Reduced motion: suppress entrance animations.

---

## 4. Styling Guarantees

- Required tokens: `backgroundOutgoing`, `backgroundIncoming`, `color` (outgoing text), `colorIncoming` (incoming text), `colorMuted` (timestamp), `colorStatusSent`, `colorStatusDelivered`, `colorStatusRead`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel padding, or border-radius values.
- Dark mode: outgoing and incoming bubble tokens must maintain readability and contrast in dark themes.

- Responsive behavior: bubble max-width is a token-defined fraction of the thread width; text wraps naturally.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MessageBubble.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
