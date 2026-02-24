# Component Spec — Dialog

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

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

## 3. Anatomy

Dialog is a compound component exported as a plain object with sub-components. It is built on `@tamagui/dialog`, which provides portal rendering, focus management, and ARIA semantics. The styled layer adds visual presentation only.

- **Dialog.Root** — Wraps `@tamagui/dialog` `Dialog`. Accepts controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) patterns.
- **Dialog.Trigger** — Wraps `@tamagui/dialog` `Dialog.Trigger` with `asChild`. Clones its child element and injects open behavior.
- **Dialog.Overlay** — Kept for API compatibility but currently renders `null` (the overlay is rendered inside the Content portal).
- **Dialog.Content** — Portals content into the DOM. Renders both the overlay backdrop (`$overlayBackground` with opacity fade) and the centered content panel (`$background`, `$6` border radius, shadow). Size variant controls `maxWidth` (sm=400, md=500, lg=640) and padding (sm=`$4`, md=`$5`, lg=`$6`).
- **Dialog.Header** — A vertical layout container (`View`) with `$1` gap for grouping Title and Description.
- **Dialog.Footer** — A horizontal layout container (`XStack`) right-aligned with `$2` gap and `$3` top padding, for action buttons.
- **Dialog.Title** — Wraps `@tamagui/dialog` `Dialog.Title` with styled text (`$heading` family, `$4` weight, `$6` font size, `$color`).
- **Dialog.Description** — Wraps `@tamagui/dialog` `Dialog.Description` with styled text (`$body` family, `$4` font size, `$colorSubtitle`).
- **Dialog.Close** — Wraps `@tamagui/dialog` `Dialog.Close` with `asChild`. Clones its child element and injects close behavior.

> **TypeScript is the source of truth for props.** See `DialogRootProps` and `DialogContentProps` in `Dialog.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Closed** — Overlay and Content are not rendered. No DOM presence.
- **Open** — Overlay fades in (opacity 0 to 1). Content panel scales in from 0.95 and fades in. Focus is trapped inside Content.
- **Closing** — Exit animation plays (reverse of open). Focus is restored to the trigger element.

### Keyboard Interaction

- **Escape** closes the dialog.
- **Tab/Shift+Tab** cycles focus within the dialog content (focus trap provided by `@tamagui/focus-scope`).
- Focus does not escape the dialog while it is open.
- Follows the WAI-ARIA APG [Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### Motion

- Open/close transitions use the `medium` animation token:
  - Overlay: opacity fade (0 to 1).
  - Content: opacity fade + scale (0.95 to 1).
- Must honor `prefers-reduced-motion` — when reduced motion is preferred, transitions should be instant.

---

## 5. Accessibility

- **Semantic element:** Content renders with `role="dialog"` and `aria-modal="true"` (provided by `@tamagui/dialog`).
- **ARIA attributes:**
  - `aria-labelledby` links Content to the Title element's auto-generated ID.
  - `aria-describedby` links Content to the Description element's auto-generated ID.
  - Trigger sets `aria-haspopup="dialog"` on its child (via `@tamagui/dialog`).
  - IDs are auto-generated via `React.useId()`.
- **Focus management:**
  - Focus is trapped within the dialog content when open.
  - Focus is restored to the trigger element when the dialog closes.
  - The first focusable element inside the dialog receives focus on open.
- **Screen reader announcements:** Content announces as `role="dialog"`. Title provides the accessible label. Description provides the accessible description.
- **Contrast:** Dialog content background must have sufficient contrast against both the overlay and the content text. Title and Description text must meet WCAG 2.1 AA ratios against the content background.

---

## 6. Styling

- **Design tokens used:**
  - Colors: `$background` (content panel), `$overlayBackground` (scrim), `$color` (title text), `$colorSubtitle` (description text), `$shadowXlColor` (shadow).
  - Font: `$heading` family for Title, `$body` family for Description.
  - Spacing: `$3` gap inside content, `$4`/`$5`/`$6` padding per size variant.
  - Radius: `$6` on the content panel.
  - Animation: `medium` token for enter/exit transitions.
- **Responsive behavior:** Content width is 90% of viewport with `maxWidth` capped by the `size` variant (400/500/640). `maxHeight` is 85%. The dialog remains centered and scrollable on all screen sizes.
- **Reduced motion:** Entry/exit animations (opacity fade, scale transition) must be removed or made instant when `prefers-reduced-motion: reduce` is active.
- **Dark mode:** Content background, text colors, and border radius must resolve correctly in both light and dark themes. The overlay background uses `$overlayBackground` token which resolves per theme.

---

## 7. Composition

- **What can contain this component:** `Dialog.Root` wraps all other Dialog sub-components. It can be placed anywhere in the component tree.
- **What this component can contain:**
  - `Dialog.Trigger` — exactly one child element (the trigger).
  - `Dialog.Content` — contains `Dialog.Header`, `Dialog.Title`, `Dialog.Description`, `Dialog.Footer`, `Dialog.Close`, and any arbitrary content.
  - `Dialog.Close` — exactly one child element (the close control).
- **Anti-patterns:**
  - Do not nest dialogs inside other dialogs.
  - Do not omit `Dialog.Title` — it provides the accessible label for the dialog.
  - Do not use Dialog for non-modal content that the user should interact with alongside other UI.
  - Do not place `Dialog.Trigger` or `Dialog.Close` outside of `Dialog.Root`.

---

## 8. Breaking Change Criteria

- Removing any sub-component (`Root`, `Trigger`, `Overlay`, `Content`, `Title`, `Description`, `Close`, `Header`, `Footer`).
- Removing the `open`/`defaultOpen`/`onOpenChange` controlled/uncontrolled API on Root.
- Removing the `size` variant from Content.
- Removing focus trapping, focus restoration, or Escape-to-close behavior.
- Removing `role="dialog"`, `aria-modal`, `aria-labelledby`, or `aria-describedby` from the content element.

---

## 9. Test Requirements

- **Behavioral tests:**
  - Dialog renders nothing when closed.
  - Dialog renders Overlay and Content when open.
  - Controlled mode (`open` + `onOpenChange`) works correctly.
  - Uncontrolled mode (`defaultOpen`) opens the dialog on mount.
  - Each `size` variant (`sm`, `md`, `lg`) applies correct maxWidth and padding.
  - Title and Description render with correct typography styles.
  - Header groups Title and Description vertically.
  - Footer right-aligns action buttons.
- **Accessibility tests:**
  - Content has `role="dialog"` and `aria-modal`.
  - `aria-labelledby` links Content to Title.
  - `aria-describedby` links Content to Description.
  - Tab key cycles focus within the dialog (does not escape).
  - Focus returns to trigger when dialog closes.
- **Visual regression:**
  - Open state with overlay and centered content panel.
  - Each size variant.
  - Entry and exit animation states.
