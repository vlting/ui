# Component Contract — MFAForm

## 1. Public API

### Base Props

`MFAForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

idle, filling, submitting, error, success.
- For segmented (individual character-box) mode:
  - Focus automatically advances to the next box after each digit entry.
  - Backspace in an empty box moves focus to the previous box.
  - Pasting a complete code fills all boxes at once.
- For single-input mode: standard text input behavior; numeric keyboard hint on mobile.
- Auto-submission: optionally fires the submit callback automatically when all digits are filled, without requiring the user to press a button.

- Keyboard behavior:
- Screen reader behavior: each box (if segmented) announces its position (e.g., "Digit 1 of 6"). Form-level errors are announced via `role="alert"`. Auto-submit is announced via a live region.


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
- Reduced motion: no shake or transition animation when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: input background, input border, input border-focused, input border-error, input text color, label color, error text color, button background, button text, surface background, focus ring color.
- Prohibited hardcoded values: no raw colors, no pixel sizes, no hardcoded border-radius.
- Dark mode: all token references resolve correctly; error and focus states remain visually distinct.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MFAForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
