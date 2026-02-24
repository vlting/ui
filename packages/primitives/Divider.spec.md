# Component Spec — Divider

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Visual separator between content sections or sibling elements.
- Use to create clear visual boundaries within lists, card sections, toolbars, or between content blocks.
- Do NOT use as a decorative border on a container (use border tokens on the container itself).
- Do NOT use to create significant whitespace (use Spacer instead).

---

## 2. UX Intent

- **Gestalt Principles** — reinforces visual grouping by establishing explicit boundaries between element clusters; supports the principle of common region.
- **Jakob's Law** — horizontal dividers between content sections follow universally understood web and native conventions.

---

## 3. Anatomy

Single element — `styled(View)` with orientation variants. No sub-components.

- `orientation`: `'horizontal'` (default) or `'vertical'`.
- Horizontal: 1px tall, full width, `marginVertical: '$2'`.
- Vertical: 1px wide, full height, `marginHorizontal: '$2'`.

> **TypeScript is the source of truth for props.** See `Divider.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — Divider must never appear in the tab order.

### Motion

None. Dividers must not animate.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>`. Consumers should add `role="separator"` (via `accessibilityRole="separator"`) when the divider conveys meaningful content separation.
- **ARIA attributes:** None by default. Decorative dividers need no ARIA.
- **Contrast:** `$borderColor` token must meet 3:1 contrast ratio against its background (theme-level responsibility).

---

## 6. Styling

- **Design tokens used:**
  - `backgroundColor: '$borderColor'` — line color
  - `marginVertical: '$2'` (horizontal) / `marginHorizontal: '$2'` (vertical) — spacing
- **Responsive behavior:** Supports Tamagui responsive and media-query props. Consumers can change orientation or visibility at different breakpoints.
- **Dark mode:** `$borderColor` resolves to appropriate dark theme value automatically.

---

## 7. Composition

- **What can contain this component:** Any layout container (VStack, HStack, Stack, Box, ScrollView).
- **What this component can contain:** Nothing — Divider is a leaf element.
- **Anti-patterns:** Do not stack multiple Dividers to create thicker lines. Do not use horizontal Divider inside HStack without understanding cross-axis behavior.

---

## 8. Breaking Change Criteria

- Removing or renaming the `orientation` variant.
- Changing the default orientation from `horizontal`.
- Changing the spacing tokens (`$2`) or color token (`$borderColor`).

---

## 9. Test Requirements

- **Behavioral tests:** Verify horizontal renders as full-width 1px line with vertical margin. Verify vertical renders as full-height 1px line with horizontal margin. Verify default orientation is horizontal. Verify `flexShrink: 0` prevents collapse.
- **Accessibility tests:** Verify no role is set by default. Verify consumer-applied `accessibilityRole="separator"` is forwarded. Verify not focusable.
