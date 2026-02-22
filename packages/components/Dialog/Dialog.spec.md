# Component Spec — Dialog

## 1. Purpose

- Provides a modal overlay that captures user attention for a focused task, confirmation, or information display.
- Should be used for confirmations, alerts, forms that require focused input, or any interaction that must block the rest of the UI until dismissed.
- Should NOT be used for non-blocking notifications (use toast or banner), for complex multi-step wizards (use a dedicated page/flow), or for content that users need to reference alongside other UI.

---

## 2. UX Intent

- **Primary interaction goal:** Temporarily focus the user's attention on a single task or message, then return them to the prior context.
- **Expected user mental model:** "Something requires my attention. I deal with it, then I go back to what I was doing." The dialog must feel like an interruption with a clear resolution path.
- **UX laws applied:**
  - **Jakob's Law** — Dialog must follow standard modal conventions: overlay backdrop, centered content, Escape to close, click-outside to close.
  - **Hick's Law** — Dialog content should present minimal choices. Actions should be clear and limited (confirm/cancel pattern preferred).
  - **Tesler's Law** — The dialog absorbs the complexity of focus management, escape handling, and backdrop dismissal so the consumer does not have to.
  - **Doherty Threshold** — Open/close animations must be fast enough (via `medium` animation token) to keep the interaction feeling responsive.
  - **Peak-End Rule** — The closing experience matters: focus restoration to the trigger and smooth exit animation leave a positive final impression.

---

## 3. Visual Behavior

- **Layout:** Overlay is fixed to the viewport, centered via flexbox. Content panel is a vertical stack (`YStack`) with internal gap of `$3`.
- **Spacing:** Content padding scales with `size` variant — `sm` uses `$4`, `md` uses `$5`, `lg` uses `$6`.
- **Typography:** `Dialog.Title` uses `$heading` font family, `$4` weight, `$6` font size. `Dialog.Description` uses `$body` font family, `$4` font size, `$colorSubtitle` color.
- **Token usage:** All colors, spacing, radii, and fonts resolve from Tamagui design tokens. Content border radius is `$6`. No hardcoded values except the overlay background (`rgba(0,0,0,0.5)`), which is intentional for cross-theme consistency.
- **Responsive behavior:** Content width is `90%` of the viewport with `maxWidth` capped by the `size` variant (400/500/640). `maxHeight` is `85%`. The dialog remains centered and scrollable on all screen sizes.

### Sub-component visual behavior

- **Dialog.Overlay** — Fixed fullscreen backdrop with semi-transparent black. Fades in on open, fades out on close.
- **Dialog.Content** — Centered panel that scales in from 0.95 and fades in. Scales out and fades out on close.
- **Dialog.Title** — Heading text styled for prominence within the dialog.
- **Dialog.Description** — Secondary text styled in a subdued color for explanatory content.

---

## 4. Interaction Behavior

- **States:**
  - **Closed** — Overlay and Content render nothing (`null`). No DOM presence.
  - **Open** — Overlay and Content are mounted. Entry animation plays. Focus is trapped inside Content.
  - **Closing** — Exit animation plays. Focus is restored to the trigger element.
- **Controlled vs uncontrolled:** `Dialog.Root` supports both patterns. Controlled via `open` + `onOpenChange`. Uncontrolled via `defaultOpen`. State management is handled entirely in the headless layer.
- **Keyboard behavior:**
  - **Escape** closes the dialog. The `onEscapeKeyDown` callback fires before close.
  - **Tab/Shift+Tab** cycles focus within the dialog content (focus trap).
  - Focus does not escape the dialog while it is open.
- **Screen reader behavior:**
  - Content announces as `role="dialog"` with `aria-modal`.
  - Title is linked via `aria-labelledby`.
  - Description is linked via `aria-describedby`.
  - Trigger announces `aria-haspopup="dialog"`.
  - Overlay is marked `aria-hidden`.
- **Motion rules:** Open/close transitions use the `medium` animation token (opacity + scale on Content, opacity on Overlay). Must honor `prefers-reduced-motion` — when reduced motion is preferred, transitions should be instant.

### Sub-component interaction behavior

- **Dialog.Trigger** — Clones its child element and injects `onClick` (to open) and `aria-haspopup="dialog"`. Does not render its own DOM element.
- **Dialog.Close** — Clones its child element and injects `onClick` (to close). Does not render its own DOM element.
- **Dialog.Overlay** — Clicking the overlay closes the dialog (handled in headless layer).
- **Dialog.Content** — Traps focus. Listens for Escape key. Renders only when open.

---

## 5. Accessibility Requirements

- **ARIA requirements:**
  - Content must have `role="dialog"` and `aria-modal="true"`.
  - Content must have `aria-labelledby` pointing to the Title element's ID.
  - Content must have `aria-describedby` pointing to the Description element's ID.
  - Trigger must set `aria-haspopup="dialog"` on its child.
  - Overlay must be `aria-hidden`.
  - IDs are auto-generated via `React.useId()`.
- **Focus rules:**
  - Focus must be trapped within the dialog content when open.
  - Focus must be restored to the trigger element when the dialog closes.
  - The first focusable element inside the dialog should receive focus on open.
- **Contrast expectations:** Dialog content background must have sufficient contrast against both the overlay and the content text. Title and Description text must meet WCAG 2.1 AA ratios against the content background.
- **Reduced motion behavior:** Entry/exit animations (opacity fade, scale transition) must be removed or made instant when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- **Required tokens:** `$background` (content background), `$color` (title text), `$colorSubtitle` (description text), `$heading` (font family), `$body` (font family).
- **Prohibited hardcoded values:** No raw hex colors, pixel spacing, or font sizes except the overlay background, which uses a fixed `rgba(0,0,0,0.5)` for consistent scrim behavior across themes.
- **Dark mode expectations:** Content background, text colors, and border radius must resolve correctly in both light and dark themes. The overlay scrim color is theme-independent by design.

---

## 7. Composition Rules

- **What can wrap it:** `Dialog.Root` wraps all other Dialog sub-components. It can be placed anywhere in the component tree.
- **What it may contain:**
  - `Dialog.Trigger` — exactly one child element (the trigger).
  - `Dialog.Overlay` — wraps `Dialog.Content`.
  - `Dialog.Content` — contains `Dialog.Title`, `Dialog.Description`, `Dialog.Close`, and any arbitrary content.
  - `Dialog.Close` — exactly one child element (the close control).
- **Anti-patterns:**
  - Do not render `Dialog.Content` outside of `Dialog.Overlay`.
  - Do not nest dialogs inside other dialogs.
  - Do not omit `Dialog.Title` — it provides the accessible label for the dialog.
  - Do not use Dialog for non-modal content that the user should interact with alongside other UI.
  - Do not place `Dialog.Trigger` or `Dialog.Close` outside of `Dialog.Root`.

---

## 8. Performance Constraints

- **Memoization rules:** Dialog state is managed in the headless layer via context. The styled wrappers are thin and do not need memoization. Consumers should avoid placing expensive render trees inside `Dialog.Content` unless gated by the open state.
- **Virtualization:** Not applicable.
- **Render boundaries:** Overlay and Content render `null` when closed, preventing unnecessary DOM presence and style calculation. The headless layer uses context, so only Dialog sub-components re-render on state changes.

---

## 9. Test Requirements

- **What must be tested:**
  - Dialog renders nothing when closed.
  - Dialog renders Overlay and Content when open.
  - Controlled mode (`open` + `onOpenChange`) works correctly.
  - Uncontrolled mode (`defaultOpen`) opens the dialog on mount.
  - Each `size` variant (`sm`, `md`, `lg`) applies correct maxWidth and padding.
  - Title and Description render with correct typography styles.
- **Interaction cases:**
  - Clicking Trigger opens the dialog.
  - Clicking Close closes the dialog.
  - Clicking the Overlay closes the dialog.
  - Pressing Escape closes the dialog.
  - `onEscapeKeyDown` callback fires before close on Escape.
  - Focus is trapped inside Content when open.
  - Focus returns to Trigger when dialog closes.
- **Accessibility checks:**
  - Content has `role="dialog"` and `aria-modal`.
  - `aria-labelledby` links Content to Title.
  - `aria-describedby` links Content to Description.
  - Trigger child receives `aria-haspopup="dialog"`.
  - Overlay is `aria-hidden`.
  - Tab key cycles focus within the dialog (does not escape).
