# Component Contract — DatingProfileEditor

## 1. Public API

### Base Props

`DatingProfileEditor` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a screen or page layout component, a modal sheet, or a step in a multi-step onboarding flow.

May contain: text inputs, a photo gallery uploader (PhotoGalleryUploader), an interest selector (InterestSelector), a location radius selector (LocationRadiusSelector), toggle switches, and select/dropdown controls.

---

## 2. Behavioral Guarantees

idle, focused, filled, invalid, disabled.
- The editor is controlled: the parent owns all field values and receives change callbacks.
- Inline validation feedback appears after a field loses focus (not on every keystroke) to reduce noise.
- A save or "Done" action is surfaced at the top (sticky) or bottom of the editor; it reflects a loading state while the parent processes the save.

- Keyboard behavior:
- Screen reader behavior: each field has an associated visible or `aria-label` label; error messages are announced live via `aria-live`.


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
- Reduced motion: disable any animated transitions between sections or steps.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor`, `color`, `placeholderColor`, semantic error token, focus ring token, and all spacing/radius tokens for field and section layout.
- Prohibited hardcoded values: no raw color values, no pixel-based spacing or border radius outside the token scale.
- Dark mode: input surfaces, labels, placeholder text, and error states must all resolve correctly via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DatingProfileEditor.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
