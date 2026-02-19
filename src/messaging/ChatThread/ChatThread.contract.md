# Component Contract — ChatThread

## 1. Public API

### Base Props

`ChatThread` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: messages rendered; scrolled to bottom.
- In `loading` state: skeleton message bubbles shown while initial history loads.
  - **loading more** (pagination): a loading indicator at the top while older messages load.
- In `empty` state: a meaningful empty state when the conversation has no messages.
- In `error` state: an error state when messages fail to load.
- In `new message` state: auto-scrolls to bottom if the user is already near the bottom; shows a "new messages" indicator otherwise.
- The thread is not interactive in itself; interactions are handled by child `MessageBubble` components.

- Keyboard behavior: scrollable region is focusable and scrollable via keyboard; individual messages and interactive elements within bubbles are reachable by Tab.
- Screen reader behavior: the thread is announced as a log region (`role="log"` or `aria-live="polite"`) so new messages are announced as they arrive.
- Motion rules: auto-scroll animation respects `prefers-reduced-motion`; instant jump to bottom when reduced motion is active.

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
- Reduced motion: disable smooth-scroll animation; jump to bottom instantly.

---

## 4. Styling Guarantees

- Required tokens: `background`, `color` (system message text), `colorMuted` (date separator), `space` (message gap, group gap).
- Prohibited hardcoded values: no literal color strings, pixel spacing, or max-width values.
- Dark mode: thread background and separator tokens must resolve correctly in dark themes.

- Responsive behavior: full width at all viewports; message bubble max-width is constrained to a token-defined percentage of the thread width.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ChatThread.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
