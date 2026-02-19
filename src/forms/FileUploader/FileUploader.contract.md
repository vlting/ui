# Component Contract — FileUploader

## 1. Public API

### Base Props

`FileUploader` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: FieldWrapper, form sections, modal bodies.

May contain: a DragAndDropZone slot, a file list slot with per-file items (icon, name, size, progress, remove button).

---

## 2. Behavioral Guarantees

- Idle: drop zone and empty file list.
  - File selected: file list shows selected files.
  - Uploading: per-file progress indicators animate.
  - Upload complete: per-file success indicators appear.
  - Upload error: per-file error messages appear with error token styling.
  - Disabled: drop zone and browse button are non-interactive; file list is read-only.
- Controlled vs uncontrolled: file list state may be controlled (via props) or uncontrolled (internal).
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: file list entry/exit animations and progress bar animations respect reduced-motion preferences.

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
- Reduced motion: file list animations and progress bar animations are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: all DragAndDropZone tokens; file item background, border, file name text, file size text, error text, remove button colors, progress bar tokens, success/complete indicator color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: adapts to container width; file list items wrap or truncate long file names.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `FileUploader.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
