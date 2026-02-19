# Component Contract — DragAndDropZone

## 1. Public API

### Base Props

`DragAndDropZone` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form sections, FileUploader, FieldWrapper.

May contain: an icon slot, a primary instruction text slot, a secondary instruction text slot, a browse button slot, an optional file preview/list slot.

---

## 2. Behavioral Guarantees

- Idle: default appearance; awaiting drag or click-to-browse action.
  - Drag over (valid): accepts the dragged item; applies drag-over visual state.
  - Drag over (invalid): rejects the dragged item; applies rejected visual state.
  - Drag leave: returns to idle state.
  - Drop: item is released; processing begins.
  - Disabled: zone is non-interactive; visually muted; does not accept drag or click events.

- Keyboard behavior:
- Screen reader behavior:
- Motion rules: drag-over state transition respects reduced-motion preferences.

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
- Reduced motion: drag-over state transition animation is suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: border (default, drag-over, rejected, disabled), background (default, drag-over, rejected, disabled), icon color, label text, secondary text, browse button colors, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode; drag-over and rejected states must remain clearly distinguishable.

- Responsive behavior: adapts to the container width; on touch devices, falls back to presenting only the file browse button.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DragAndDropZone.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
