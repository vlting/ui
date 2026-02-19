# Component Contract — EmailTemplateEditor

## 1. Public API

### Base Props

`EmailTemplateEditor` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: sections rendered with existing or empty content.
- In `focused section` state: the active section has a visible focus or active border.
- In `error` state: a section with invalid content (e.g., empty subject) shows an inline error message.
- In `disabled` state: the entire editor or individual sections can be disabled; non-interactive, reduced opacity.
- In `loading` state: when template data is being fetched, a skeleton or placeholder occupies each section.

- Keyboard behavior: `Tab` moves between sections and controls; within editable text zones, standard text editing shortcuts apply.
- Screen reader behavior: each section label is associated with its editable region via `aria-label` or `<label>` association.
- Motion rules: section focus transitions respect `prefers-reduced-motion`.

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
- Reduced motion: suppress decorative section transitions.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor`, `borderColorFocus`, `color`, `colorMuted`, `colorError`, `backgroundError`, `space`, `borderRadius`, `focusStyle`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or font-size values.
- Dark mode: all tokens must resolve correctly in dark themes with sufficient contrast for editable zones.

- Responsive behavior: on narrow viewports the editor is single-column; on wider viewports it may support a split editor+preview layout.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `EmailTemplateEditor.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
