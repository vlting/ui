# Component Contract — ThreadComposer

## 1. Public API

### Base Props

`ThreadComposer` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed on a dedicated "New Thread" page, or within a modal/sheet triggered from a community page or `CommunityHeader` action.

May contain: A title input, a body textarea (optionally rich text), a `TagFilterBar`-style tag selector (multi-select), and form action buttons.

---

## 2. Behavioral Guarantees

- Idle (empty): All fields empty, submit button disabled.
  - Partially filled: Title has content, submit becomes enabled. Body and tags are optional.
  - Validation error: Required field missing or invalid input; inline error messages appear below the relevant field.
  - Submitting: Submit button shows a loading indicator; all fields are disabled.
  - Submit success: Form resets or the parent navigates away — no persistent success state in the component itself.
- Controlled vs uncontrolled: May support both patterns. Uncontrolled default with optional controlled overrides for title, body, and selected tags.
- Keyboard behavior: Tab moves through fields in logical order (title → body → tags → cancel → submit). Enter in the title field focuses the body. Shift+Enter in the body inserts a newline. Enter on the submit button submits the form.
- Screen reader behavior: All fields have associated labels (not just placeholders). Validation errors are announced via `aria-live` regions. The submit button communicates its disabled state.
- Motion rules: Textarea auto-grow animates smoothly. Error messages fade in. Reduced motion: instant transitions.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Each input has an explicit `<label>` association (not placeholder-only). Error messages are linked to their inputs via `aria-describedby`. The submit button has `aria-disabled="true"` when the form is not submittable. A `role="alert"` or `aria-live="polite"` region announces validation feedback.
- Focus rules: On mount, focus is placed on the title input. On validation error, focus moves to the first invalid field. On successful submission, focus management is delegated to the parent.
- Contrast expectations: All input text, labels, placeholder text, and error messages meet WCAG AA contrast ratios.
- Reduced motion behavior: Auto-grow animation and error message fade are suppressed.

---

## 4. Styling Guarantees

- Required tokens: input background, input border color, input focus border color (accent), error color token, input text color, placeholder text color, label text color, submit button primary background, submit button primary text, cancel button background, cancel button text, spacing tokens, border radius token for inputs and buttons.
- Prohibited hardcoded values: No hardcoded colors, pixel dimensions, or font sizes.
- Dark mode expectations: Input backgrounds use dark surface tokens. Focus borders use dark accent tokens. Error color token remains semantically red/error in dark mode.

- Responsive behavior: Full-width layout on all breakpoints. On mobile, the composer may occupy a modal or bottom sheet. The body textarea expands vertically as the user types (auto-grow).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ThreadComposer.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
