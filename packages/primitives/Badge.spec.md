# Component Spec — Badge

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Small status label for categorization, counts, or status indicators.
- Use for tags, status chips, notification counts, and inline metadata labels.
- Do NOT use as an interactive element (button or link). Do NOT use for long-form text.

---

## 2. UX Intent

- **Gestalt Principles** — visual differentiation through color and shape distinguishes badges from surrounding content, drawing attention to status or category.
- **Fitts's Law** — non-interactive; badge size is for readability, not targeting.

---

## 3. Anatomy

Single element — `styled(Text)` with variant, tone, and size variant groups.

- `variant`: `default` | `solid` (alias) | `secondary` | `destructive` | `outline` | `subtle`. Default: `default`.
- `tone`: `neutral` | `primary` | `success` | `warning` | `danger` (currently empty — reserved for tone-based color overrides).
- `size`: `sm` | `md` | `lg`. Default: `md`.

> **TypeScript is the source of truth for props.** See `BadgeProps` in `Badge.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — Badge does not receive focus.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders as text (Tamagui Text → `<span>` on web).
- **ARIA attributes:** None by default. If the badge conveys status meaning, the consumer should ensure the status is also communicated through text context or `aria-label` on a parent.
- **Contrast:** Each variant's foreground/background combination must meet WCAG 4.5:1 for text contrast. The `destructive` variant uses `$red10` on `$color1` — verify in both themes.

---

## 6. Styling

- **Design tokens used:**
  - Text: `fontFamily: '$body'`, `fontSize: '$1'`/`'$2'`, `fontWeight: '$4'`
  - Colors vary by variant (e.g., `default`: `$color6` bg / `$color1` text; `outline`: transparent bg / `$borderColor` border)
  - Spacing: `paddingHorizontal`/`paddingVertical` from token scale
  - Shape: `borderRadius: '$10'` (pill shape), `overflow: 'hidden'`
  - Layout: `alignSelf: 'flex-start'` prevents stretching in flex containers
- **Responsive behavior:** Inherits Tamagui responsive props.
- **Dark mode:** Color tokens resolve automatically.

---

## 7. Composition

- **What can contain this component:** Any layout context — cards, list items, table cells, headings, navigation.
- **What this component can contain:** Short text content only. No nested interactive elements.
- **Anti-patterns:** Do not wrap Badge in a button to make it clickable — use a proper Button with badge styling. Do not use `destructive` variant for non-error contexts.

---

## 8. Breaking Change Criteria

- Removing a variant value.
- Changing default variant from `default`.
- Changing default size from `md`.
- Removing the `solid` alias.
- Changing the pill shape (`borderRadius: '$10'`).

---

## 9. Test Requirements

- **Behavioral tests:** Verify each variant applies correct background and text colors. Verify each size applies correct fontSize and padding. Verify default variant and size. Verify `solid` alias produces same output as `default`.
- **Accessibility tests:** Verify no implicit role. Verify text contrast for all variants in both light and dark themes.
