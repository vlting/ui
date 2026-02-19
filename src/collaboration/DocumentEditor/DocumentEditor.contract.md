# Component Contract — DocumentEditor

## 1. Public API

### Base Props

`DocumentEditor` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Should be placed inside a page-level layout or split-panel container. May have a toolbar above and a comment sidebar to the side.

May contain: The editable content region (rich text engine child), a `SharedCursorOverlay`, comment anchor markers in the gutter. Optionally a word count or status bar below.

---

## 2. Behavioral Guarantees

- Idle / editing: Content area is interactive and accepts input from child editing components.
  - Read-only: Content is visible but the editing surface does not accept input. Visual cues distinguish the read-only state.
  - Loading: A skeleton or placeholder is shown in place of content while the document loads.
  - Collaborative: Peer cursors and selections are visible via the `SharedCursorOverlay` child component.
- Controlled vs uncontrolled: The editor shell is a controlled container. The parent manages document content state and passes it to child components.
- Keyboard behavior: The document surface itself does not intercept keyboard events — it delegates to its editable child content. The surrounding chrome (toolbar, sidebar toggles) must be keyboard navigable.
- Screen reader behavior: The editable content area should be announced as a document or text editing region. Non-content chrome elements (toolbars, overlays) must have appropriate ARIA roles.
- Motion rules: Cursor and selection overlays animate smoothly. Reduced motion: overlays appear instantly with no position interpolation.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: The editable content area must have an appropriate role (e.g., `role="textbox"` with `aria-multiline="true"`, or rely on native contenteditable semantics). The overall page region should be a `main` landmark or be contained within one.
- Focus rules: On mount, focus should be placed on the editable area if the document is in editing mode. Focus must not be trapped in the shell container itself.
- Contrast expectations: Document surface background and text must meet WCAG AA. Page-behind-canvas contrast must be visually distinguishable.
- Reduced motion behavior: All transition animations for overlays and layout shifts are suppressed.

---

## 4. Styling Guarantees

- Required tokens: document surface background, outer canvas background, page shadow/elevation, content max-width size token, horizontal padding spacing token, vertical padding spacing token, border radius token for page corners (if elevated style is used).
- Prohibited hardcoded values: No hardcoded pixel dimensions, colors, or shadows.
- Dark mode expectations: The outer canvas darkens to a deep neutral. The document surface uses a dark surface token. Text inherits the dark theme text token.

- Responsive behavior: On narrow viewports, margins collapse to a minimal padding to maximize readable width. The page surface fills the viewport width on mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DocumentEditor.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
