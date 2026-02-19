# Component Contract — MediaViewerModal

## 1. Public API

### Base Props

`MediaViewerModal` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `opening` state: modal enters with a transition (fade or slide); respects reduced motion.
- In `idle/open` state: media is displayed; close and navigation controls are visible.
- In `loading` state: media is still loading; a spinner or skeleton is shown in the media area.
- In `error` state: media failed to load; an error message is displayed.
- In `closing` state: modal exits with a transition; focus returns to the trigger element.

- Keyboard behavior: `Escape` closes the modal; `Tab` is trapped within the modal while open; previous/next navigation via arrow keys if applicable.
- Screen reader behavior: modal uses `role="dialog"` with an `aria-modal` attribute and a descriptive `aria-label` or `aria-labelledby`.
- Motion rules: open/close transitions use the reduced-motion token; no transition when `prefers-reduced-motion: reduce` is active.

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
- Reduced motion: disable open/close animations; modal appears/disappears instantly.

---

## 4. Styling Guarantees

- Required tokens: `background` (modal), `backgroundOverlay` (scrim), `color`, `colorMuted`, `borderRadius`, `space`, `focusStyle`.
- Prohibited hardcoded values: no literal color strings, pixel dimensions, or opacity values.
- Dark mode: modal background and scrim tokens must resolve correctly; controls must maintain contrast.

- Responsive behavior: on narrow viewports the modal takes full screen width and height; on wider viewports it may be constrained to a max-width with a visible backdrop.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MediaViewerModal.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
