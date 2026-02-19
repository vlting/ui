# Component Contract — Sheet

## 1. Public API

### Base Props

`Sheet` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: any page that needs a slide-in auxiliary panel. The trigger element is outside the Sheet.

May contain: arbitrary content — forms, filter controls, member detail views, navigation links, multi-step flows. A close button or drag handle is provided by the Sheet itself.

---

## 2. Behavioral Guarantees

- Closed: sheet is not in the DOM or off-screen.
  - Open: sheet is visible and interactive.
  - Snap points (mobile): sheet rests at defined snap positions; dragging adjusts position.
  - Dragging (mobile): sheet follows touch drag with momentum.
  - Modal vs non-modal: when modal (`modal={true}`), a scrim is present and background content is non-interactive. When non-modal (`modal={false}`), background content remains interactive.
- Controlled vs uncontrolled: `open` / `onOpenChange` controlled by parent. Drag-to-dismiss calls `onOpenChange(false)` when dragged past the dismiss threshold. Snap points are managed internally.
- Keyboard behavior:
- Screen reader behavior: in modal mode, `role="dialog"` with `aria-modal="true"` and `aria-labelledby` (if a title is present). In non-modal mode, `role="region"` with `aria-label`. The drag handle is not exposed to screen readers (it is a touch-only affordance).
- Motion rules: slide-in/slide-out uses a spring or ease-out animation from motion tokens. Drag follows touch position (no motion preference applies to the drag itself). Suppressed open/close animation under reduced motion (instant appear/disappear).

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: modal sheet uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby` or `aria-label`. Non-modal sheet uses `role="region"` with `aria-label`. The scrim is hidden from screen readers. Close button has a descriptive `aria-label`.
- Focus rules: modal mode — focus trapped, returns to trigger on close. Non-modal mode — focus not trapped, but the sheet's first focusable element receives focus on open. Escape closes the sheet.
- Contrast expectations: all content within the sheet meets WCAG AA. The drag handle color meets non-text contrast (3:1). Close button icon meets non-text contrast.
- Reduced motion behavior: open/close animation is instant under `prefers-reduced-motion: reduce`. Drag interaction retains touch following (not animated, so unaffected).

---

## 4. Styling Guarantees

- Required tokens: sheet surface, scrim (optional), shadow, border, drag handle color, space tokens (internal padding, content gap), radius tokens (top corners on mobile, left/right corners on desktop side panel), z-index tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based widths or heights, no hardcoded z-index values.
- Dark mode expectations: sheet surface must be visually elevated above the page in dark mode. Scrim must effectively dim the background. Drag handle must be visible against the sheet surface.

- Responsive behavior: anchored to the bottom on mobile; to the right (or left) on tablet/desktop. The snap point behavior is only active on mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Sheet.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
