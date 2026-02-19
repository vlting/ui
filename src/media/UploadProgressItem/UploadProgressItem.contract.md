# Component Contract — UploadProgressItem

## 1. Public API

### Base Props

`UploadProgressItem` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `uploading` state: progress bar animates; percentage increments; cancel button visible.
- In `complete` state: progress bar full; success icon replaces cancel button; status reads "Complete".
- In `error/failed` state: progress bar stops; error icon and message visible; a retry button may be shown.
- In `cancelled` state: row dims or is removed; consumer handles removal.
- In `paused` state: progress bar static; optional resume button.

- Keyboard behavior: cancel and retry buttons are focusable and activate on `Enter` and `Space`.
- Screen reader behavior: file name and current progress percentage are announced; status changes are announced via a live region.
- Motion rules: progress bar fill animation respects `prefers-reduced-motion`; when reduced motion is active, the bar jumps to the current value without transition.

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
- Reduced motion: suppress progress bar animation; display static progress value.

---

## 4. Styling Guarantees

- Required tokens: `colorPrimary` (progress fill), `colorMuted` (track), `color` (filename), `colorSuccess`, `colorError`, `background`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or progress bar height.
- Dark mode: progress fill and track tokens must maintain sufficient contrast in dark themes.

- Responsive behavior: row adapts to its container width; minimum row height is touch-friendly.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `UploadProgressItem.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
