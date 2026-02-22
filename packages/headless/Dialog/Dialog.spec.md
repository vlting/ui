# Component Spec — Dialog (Headless)

## 1. Purpose

- Provides a modal dialog overlay that interrupts the user's workflow to present critical information or request a decision.
- Use when the user must acknowledge, confirm, or provide input before continuing (e.g., confirmation prompts, forms, destructive-action warnings).
- Do NOT use for non-blocking notifications (use a toast), inline content reveals (use a disclosure/accordion), or lightweight contextual menus (use a popover).

---

## 2. UX Intent

- **Primary interaction goal**: Focus the user's attention on a single task or decision by overlaying content and trapping focus until the task is complete or dismissed.
- **Expected user mental model**: A standard modal dialog that blocks background interaction, can be dismissed via Escape or overlay click, and returns focus to the trigger when closed.
- **UX laws applied**:
  - **Jakob's Law** -- Modal behavior must match user expectations from every other modal dialog: Escape closes, clicking the backdrop closes, Tab cycles within the dialog.
  - **Tesler's Law** -- The dialog absorbs complexity (focus trapping, ID linkage, focus restoration) so the consumer does not have to.
  - **Doherty Threshold** -- Opening and closing should feel immediate; the component renders/unmounts synchronously.
  - **Peak-End Rule** -- Focus restoration to the trigger on close ensures a clean, predictable ending to the interaction.

---

## 3. Visual Behavior

This is a headless component. It renders semantic HTML (`<div>`, `<h2>`, `<p>`) with no built-in styles, design tokens, or theme dependencies (except the Overlay's `position: fixed; inset: 0` base style). All visual behavior -- backdrop appearance, dialog positioning, sizing, animations, and layout -- is the consumer's responsibility. Consumers style via `className`, `style`, rest props, or `data-state` attribute selectors.

---

## 4. Interaction Behavior

### States

| State | Condition | DOM Presence |
|-------|-----------|-------------|
| Closed | `open` is `false` or `undefined` | Content and Overlay return `null` (not in DOM) |
| Open | `open` is `true` | Content and Overlay are rendered |

- There is no loading, error, hover, or active state managed by this component.

### Controlled vs Uncontrolled

- **Controlled**: Pass `open` and `onOpenChange`. The component reflects the `open` prop and calls `onOpenChange` on interaction.
- **Uncontrolled**: Pass `defaultOpen` (defaults to `false`). The component manages its own state internally and calls `onOpenChange` on every change.

### Keyboard Behavior

| Key | Context | Behavior |
|-----|---------|----------|
| **Escape** | When dialog is open (document-level listener) | Calls `onEscapeKeyDown` (if provided), then closes the dialog via `onOpenChange(false)`. |
| **Tab** | When dialog is open, focus inside Content | Moves focus to the next focusable element within Content. If on the last focusable element, wraps to the first. |
| **Shift+Tab** | When dialog is open, focus inside Content | Moves focus to the previous focusable element within Content. If on the first focusable element, wraps to the last. |

- The Escape listener is registered at the `document` level and is only active when the dialog is open.
- Tab/Shift+Tab trapping is handled by `useFocusTrap`.

### Screen Reader Behavior

- Content is announced as a modal dialog (`role="dialog"`, `aria-modal`).
- The dialog's accessible name is provided by `aria-labelledby` pointing to the Title's auto-generated `id`.
- The dialog's accessible description is provided by `aria-describedby` pointing to the Description's auto-generated `id`.
- Trigger injects `aria-haspopup="dialog"` onto its child element, indicating to assistive technology that a dialog will open.
- Overlay has `aria-hidden` set so it is not announced.

### Motion Rules

- No motion is built in. Consumer-applied transitions (open/close animations) should respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

### ARIA Attributes

| Element | Attribute | Value |
|---------|-----------|-------|
| Content (`<div>`) | `role` | `"dialog"` |
| Content (`<div>`) | `aria-modal` | `true` |
| Content (`<div>`) | `aria-labelledby` | Auto-generated ID matching Title's `id` |
| Content (`<div>`) | `aria-describedby` | Auto-generated ID matching Description's `id` |
| Content (`<div>`) | `id` | Auto-generated via `React.useId()` |
| Trigger (cloned child) | `aria-haspopup` | `"dialog"` |
| Overlay (`<div>`) | `aria-hidden` | `true` |
| Title (`<h2>`) | `id` | Auto-generated, linked to Content's `aria-labelledby` |
| Description (`<p>`) | `id` | Auto-generated, linked to Content's `aria-describedby` |

### Data Attributes

| Element | Attribute | Values |
|---------|-----------|--------|
| Overlay | `data-state` | `"open"` / `"closed"` (only rendered when open, so effectively always `"open"`) |
| Content | `data-state` | `"open"` (only rendered when open) |

### Focus Rules

- **Focus trap**: When the dialog opens, focus is trapped within Content. Tab and Shift+Tab cycle between focusable elements inside Content and cannot escape to the background page.
- **Auto-focus on open**: When the dialog opens, focus is automatically moved to the first focusable element inside Content.
- **Focus restore on close**: When the dialog closes, focus is restored to the trigger element via `triggerRef`.

### Contrast Expectations

N/A -- headless component. Consumer is responsible for meeting WCAG contrast ratios for dialog content and backdrop.

### Reduced Motion Behavior

N/A -- no built-in animations. Consumer-applied animations must respect `prefers-reduced-motion`.

---

## 6. Theming Rules

This is a headless component. It has no theming, no design tokens, and no built-in styles (except Overlay's positional base style). Theming is entirely the consumer's responsibility.

---

## 7. Composition Rules

### What Can Wrap It

- `Dialog.Root` can be placed anywhere in the component tree. It renders no DOM element itself (context provider only).
- Typically placed near the trigger element in the component hierarchy.

### What It May Contain

- `Dialog.Root` must contain `Dialog.Trigger`, `Dialog.Overlay`, and `Dialog.Content` (and optionally `Dialog.Close`).
- `Dialog.Content` must contain `Dialog.Title` (for accessible labeling). `Dialog.Description` is recommended but optional.
- `Dialog.Content` may contain `Dialog.Close` and any other arbitrary content.
- `Dialog.Trigger` must receive exactly one React element as its child (it clones that element).
- `Dialog.Close` must receive exactly one React element as its child (it clones that element).

### Anti-Patterns

- Do NOT use any compound child (`Trigger`, `Overlay`, `Content`, `Title`, `Description`, `Close`) outside of `Dialog.Root`. It will throw a context error.
- Do NOT omit `Dialog.Title` inside `Dialog.Content`; without it, the dialog has no accessible name.
- Do NOT nest `Dialog.Root` components unless building a stacked-dialog pattern intentionally.
- Do NOT place interactive content inside `Dialog.Overlay`; it is `aria-hidden` and exists for click-to-dismiss only.

### Context Boundaries

- All compound children must be rendered inside `Dialog.Root`.
- Using any compound child outside of Root throws: `"Dialog compound components must be used within Dialog.Root"`.
- IDs for `contentId`, `titleId`, and `descriptionId` are auto-generated via `React.useId()` and automatically linked across Content, Title, and Description.

---

## 8. Performance Constraints

### Memoization Rules

- `onOpenChange` callback should be stable (memoized by the consumer) to avoid unnecessary re-renders.
- `onEscapeKeyDown` callback should be stable; it is a dependency of the internal `useCallback` for the Escape key handler.
- The Escape key document listener is added/removed based on open state, not re-registered every render.

### Render Boundaries

- Content and Overlay return `null` when closed. They are fully unmounted from the DOM, preventing any hidden render cost.
- Opening a dialog does not affect sibling components outside the dialog tree.

---

## 9. Test Requirements

### What Must Be Tested

- Dialog renders nothing (Content, Overlay) when closed.
- Dialog renders Content and Overlay when open.
- Controlled mode reflects the `open` prop and calls `onOpenChange`.
- Uncontrolled mode toggles state via Trigger click and calls `onOpenChange`.
- Overlay click closes the dialog.
- `onEscapeKeyDown` is called before the dialog closes on Escape.
- Focus moves to the first focusable element inside Content on open.
- Focus is restored to the trigger element on close.
- Title `id` matches Content's `aria-labelledby`.
- Description `id` matches Content's `aria-describedby`.

### Interaction Cases

- **Mouse**: Clicking Trigger opens the dialog. Clicking Overlay closes the dialog. Clicking Close child closes the dialog.
- **Keyboard -- Escape**: Closes the dialog from any focused element within Content.
- **Keyboard -- Tab**: Cycles forward through focusable elements within Content, wrapping from last to first.
- **Keyboard -- Shift+Tab**: Cycles backward through focusable elements within Content, wrapping from first to last.
- **Focus trap**: Tab does not move focus outside Content to the background page.

### Accessibility Checks

- `role="dialog"` is present on Content.
- `aria-modal` is present on Content.
- `aria-labelledby` on Content matches the Title element's `id`.
- `aria-describedby` on Content matches the Description element's `id`.
- `aria-haspopup="dialog"` is injected onto the Trigger's child element.
- `aria-hidden` is present on Overlay.
- `data-state` attributes reflect the correct open/closed state.
- Focus is trapped within Content when open.
- Focus is restored to the trigger on close.
- Using any compound child outside of `Dialog.Root` throws the expected context error.
