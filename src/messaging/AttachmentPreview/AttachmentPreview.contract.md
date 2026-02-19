# Component Contract — AttachmentPreview

## 1. Public API

### Base Props

`AttachmentPreview` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- **idle (outgoing)**: chip shown in composition area; remove button visible.
  - **idle (incoming/sent)**: chip shown in message thread; download button visible (if applicable).
- In `hover` state: subtle background shift; remove/download button becomes more prominent.
- In `focus` state: visible focus ring on the chip or its action button.
- In `loading` state: while the attachment is being staged or thumbnailed, a spinner is shown in the icon area.
- In `error` state: if the attachment failed to process, an error state is shown with a clear visual indicator.

- Keyboard behavior: `Tab` focuses the chip; `Enter` opens a preview (if applicable); remove/download button is separately focusable and activates on `Enter`/`Space`.
- Screen reader behavior: chip announces filename, file type, and size; remove button announces "Remove attachment: [filename]".
- Motion rules: chip entrance (in composition area) respects `prefers-reduced-motion`.

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
- Reduced motion: suppress chip entrance animations.

---

## 4. Styling Guarantees

- Required tokens: `background`, `backgroundHover`, `borderColor`, `color`, `colorMuted`, `focusStyle`, `space`, `borderRadius`, `size` (icon/thumbnail dimensions).
- Prohibited hardcoded values: no literal color strings, pixel spacing, or thumbnail dimensions.
- Dark mode: chip background and border tokens must resolve correctly in dark themes.

- Responsive behavior: chip adapts to its container width; minimum dimensions maintain touch-friendly tap targets.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AttachmentPreview.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
