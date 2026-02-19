# Component Contract — ReadReceipt

## 1. Public API

### Base Props

`ReadReceipt` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `no readers` state: component is not rendered (or renders empty).
- In `one or more readers` state: avatars rendered in a row.
- In `overflow` state: excess readers collapsed to "+N" indicator.
  - **pressable** (optional): pressing the row or the "+N" opens a full reader list (managed by consumer).

- Keyboard behavior: if pressable, the row is focusable and activates on `Enter` or `Space`.
- Screen reader behavior: the component announces "Read by [names]" or "Read by [N] people" as a single accessible label.
- Motion rules: avatar entrance animation (when new reader appears) respects `prefers-reduced-motion`.

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
- Reduced motion: suppress avatar entrance animations.

---

## 4. Styling Guarantees

- Required tokens: `backgroundAvatar` (fallback avatar), `colorAvatar` (initials text), `borderColor` (avatar ring), `color` (overflow count, label), `colorMuted`, `space`, `size` (avatar diameter).
- Prohibited hardcoded values: no literal color strings, pixel avatar sizes, or overlap offsets.
- Dark mode: avatar ring and count tokens must maintain sufficient contrast in dark themes.

- Responsive behavior: the row does not grow to fill the full thread width; it is constrained to a compact size.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ReadReceipt.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
