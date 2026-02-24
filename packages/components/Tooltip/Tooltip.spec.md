> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Tooltip

## 1. Purpose

- Displays a brief text label on hover/focus near a trigger element.
- Use for supplementary descriptions of icon buttons, truncated text, or unlabeled controls.
- Do NOT use for interactive content — use Popover. Do NOT use for rich content or forms.

---

## 2. UX Intent

- **Primary interaction goal:** Understand what an element does without clicking it.
- **Expected user mental model:** Hovering over or focusing an element reveals a short description.
- **UX laws applied:**
  - **Tesler's Law** — positioning, delay, and dismiss handled automatically.
  - **Doherty Threshold** — appears quickly after hover delay.
  - **Gestalt Proximity** — tooltip appears adjacent to its trigger.

---

## 3. Anatomy

- **Tooltip** — Single-component API wrapping Tamagui Tooltip internals (Trigger, Content, Arrow).
- **TooltipProvider** — Groups multiple tooltips with shared delay configuration.

> **TypeScript is the source of truth for props.** See the exported types in `Tooltip.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Hidden** — Tooltip not visible.
- **Delayed** — Hover/focus started; waiting for `delay` timer.
- **Visible** — Tooltip shown with enter animation.
- **Dismissing** — Exit animation playing.

### Keyboard Interaction

- **Focus** on trigger — Shows tooltip after delay.
- **Escape** — Dismisses tooltip.
- Tooltip content is non-interactive; no Tab trapping.
- Follows the [WAI-ARIA Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).

### Motion

- Tamagui enter/exit animations (opacity, scale).
- Should respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Tamagui Tooltip provides `role="tooltip"` semantics.
- **ARIA attributes:** `role="tooltip"` on content; `aria-describedby` on trigger pointing to tooltip (Tamagui-managed).
- **Focus management:** No focus trapping; tooltip appears on trigger focus and disappears on blur.
- **Screen reader announcements:** Tooltip content announced as description of the trigger.
- **Important:** Tooltip must never contain focusable elements. Must be triggered by both hover AND focus.

---

## 6. Styling

- **Design tokens used:** Content uses `$color` background with `$background` text (inverted for contrast). `$2` padding, `$2` border radius. Arrow matches content background.
- **Responsive behavior:** Positioning adapts via Tamagui floating logic; `side` and `align` props control placement.
- **Dark mode:** Token-based; inverted color scheme resolves automatically.

---

## 7. Composition

- **What can contain this component:** Any layout; wrap around icon buttons, truncated text, or controls needing description.
- **What this component can contain:** `content` prop accepts string text. Trigger wraps a single child element.
- **Anti-patterns:** Do not put interactive elements in tooltip content. Do not use as the sole label for a control (use `aria-label` or visible label). Do not use for error messages.

---

## 8. Breaking Change Criteria

- Removing `content`, `side`, `delay`, or `align` props.
- Removing `role="tooltip"` semantics.
- Removing Escape-to-dismiss behavior.
- Removing focus-triggered display (hover-only would violate WCAG).
- Removing TooltipProvider.

---

## 9. Test Requirements

- **Behavioral tests:** Shows on hover after delay; shows on focus; hides on blur/mouse leave; Escape dismisses; `content` prop renders as text.
- **Accessibility tests:** `role="tooltip"` on content; `aria-describedby` on trigger; no focusable elements inside; both hover and focus triggers work.
- **Visual regression:** Each `side` placement (top, right, bottom, left), with arrow.
