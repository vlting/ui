# Component Spec — Accordion

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Vertically stacked set of collapsible sections, each with a trigger and content panel.
- Use for FAQs, settings panels, and content that benefits from progressive disclosure.
- Do NOT use when all content should be visible simultaneously (use a list or card layout).

---

## 2. UX Intent

- **Hick's Law** — progressive disclosure reduces visible choices, lowering cognitive load.
- **Tesler's Law** — accordion manages open/close state internally so consumers focus on content.
- **WAI-ARIA pattern:** [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

---

## 3. Anatomy

Compound component wrapping Tamagui Accordion primitives:
- `Accordion` (Root) — manages open state. Props: `type` (`'single'`/`'multiple'`), `defaultValue`, `collapsible`.
- `Accordion.Item` — wraps a trigger/content pair. Props: `value` (string identifier).
- `Accordion.Trigger` — clickable header that toggles its panel. Renders a rotating chevron indicator (180° on open).
- `Accordion.Content` — collapsible content panel.

> **TypeScript is the source of truth for props.** See source files in `Accordion/` for the full typed API.

---

## 4. Behavior

### States

- **Collapsed** (default) — content hidden, chevron pointing down.
- **Expanded** — content visible, chevron rotated 180°.
- **Disabled** — trigger non-interactive (when supported by Tamagui).

### Keyboard Interaction

- **Enter/Space** — toggle the focused trigger's panel.
- **Arrow Down/Up** — move focus between triggers (delegated to Tamagui).
- **Home/End** — move to first/last trigger.

### Motion

- Chevron rotates 180° on expand/collapse via CSS transition (150ms ease-in-out, matching `fast` animation token).
- Content panel expands/collapses with Tamagui animation.
- Must respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic elements:** Tamagui Accordion provides proper heading + button structure.
- **ARIA attributes:** `aria-expanded` on triggers, `aria-controls` linking trigger to panel, `role="region"` on panels.
- **Focus management:** Focus moves between triggers via arrow keys. Content is not in the tab order when collapsed.

---

## 6. Styling

- **Design tokens used:** `$borderColor` for item borders, `$background` for content, `$color` for text. Chevron uses `$color`.
- **Responsive behavior:** Full-width by default. Inherits Tamagui responsive props.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Any layout context — pages, cards, sidebars.
- **What this component can contain:** `Accordion.Item` children only at root level. Items contain a Trigger and Content.
- **Anti-patterns:** Do not nest accordions inside accordions. Do not place critical content in collapsed panels that users might miss.

---

## 8. Breaking Change Criteria

- Removing sub-components (Item, Trigger, Content).
- Removing `type` or `collapsible` props.
- Changing keyboard interaction patterns.
- Removing ARIA attributes.

---

## 9. Test Requirements

- **Behavioral tests:** Verify single mode allows only one panel open. Verify multiple mode allows concurrent panels. Verify `collapsible` allows closing the last panel. Verify chevron rotates on toggle. Verify `defaultValue` opens the specified panel.
- **Accessibility tests:** Verify `aria-expanded` toggles. Verify keyboard navigation (Enter/Space, Arrow keys). Verify collapsed content is hidden from the accessibility tree.
