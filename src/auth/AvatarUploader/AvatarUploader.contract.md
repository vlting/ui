# Component Contract — AvatarUploader

## 1. Public API

### Base Props

`AvatarUploader` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

idle, hover (web), focused, uploading, error, disabled.
- Idle: shows current avatar or placeholder with the edit affordance.
- Hover (web): the edit affordance becomes more prominent (increased opacity or scale).
- Focused: a visible focus ring wraps the entire interactive area.
- Uploading: progress overlay is shown; the trigger is non-interactive during upload.
- Error: previous avatar is restored; error message is visible.
- Disabled: no edit affordance shown; component is non-interactive.

- Keyboard behavior:
- Screen reader behavior: the trigger announces "Change avatar" (or equivalent). Upload progress announces percentage or indeterminate state. Errors are announced via a live region.


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
- Reduced motion: no transition on hover reveal or progress overlay when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: avatar background (placeholder), placeholder text/icon color, focus ring color, overlay background (upload state), progress indicator color, error indicator color, edit icon color.
- Prohibited hardcoded values: no raw colors, no pixel-based border-radius (use radius tokens), no hardcoded sizes.
- Dark mode: all tokens resolve correctly in dark theme; placeholder background and icon remain distinct.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AvatarUploader.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
