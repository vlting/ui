# Component Spec — Text

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Primary body text primitive with size, tone, and weight variants mapped to design tokens.
- Use for all body copy, labels, descriptions, captions, and inline text content.
- Do NOT use for headings or titles (use Heading instead). Do NOT use for single-character icon-like glyphs (use Icon).

---

## 2. UX Intent

- **Hick's Law** — variant props reduce decision-making at the usage site; developers pick from a constrained set of meaningful options rather than specifying raw token values.
- **Miller's Law** — the five-step size scale (xs–xl) and six tone options provide enough variety without overwhelming.

---

## 3. Anatomy

Compound component — base `Text` renders `<p>` with three independent variant groups: `size`, `tone`, and `weight`. All are composable (e.g., `size="lg" tone="danger" weight="bold"`).

Sub-components are added **only when the HTML element changes**:
- `Text.Small` — renders `<small>`, fixed styles (no variants)
- `Text.Code` — renders `<code>`, mono font with subtle background (no variants)

> **TypeScript is the source of truth for props.** See `Text.ts` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive by default. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — not focusable by default.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Base `Text` renders `<p>`. `Text.Small` renders `<small>`. `Text.Code` renders `<code>`.
- **ARIA attributes:** None by default. When `tone` conveys status meaning (success, warning, danger), the consumer must ensure the meaning is communicated non-visually (WCAG 1.4.1 — not through color alone).
- **Contrast:** All tone color tokens must meet WCAG AA (4.5:1 for sizes xs–md; 3:1 for large text at lg–xl). The `muted` tone (`$colorSubtitle`) must still meet minimum contrast.

---

## 6. Styling

- **Design tokens used:**
  - `fontFamily: '$body'`, `color: '$color'`
  - Size variants (`xs`–`xl`): mapped to `fontSize`/`lineHeight` token pairs. Default: `md`.
  - Tone variants: `neutral` (`$color`), `muted` (`$colorSubtitle`), `primary` (`$color10`), `success` (`$forest10`), `warning` (`$amber10`), `danger` (`$tomato10`)
  - Weight variants: `light` (`'300'`), `normal` (`'400'`), `medium` (`'500'`), `semibold` (`'600'`), `bold` (`'700'`)
- **Responsive behavior:** Supports all STL responsive and media-query props.
- **Dark mode:** All color tokens resolve to appropriate dark theme values automatically.

---

## 7. Composition

- **What can contain this component:** Any layout container, inline container, or another Text (for nested styling).
- **What this component can contain:** Plain text, nested Text for inline style variations, or Icon for inline icon-text.
- **Anti-patterns:** Do not use for heading content. Do not override `fontFamily` to `$heading`. Do not use `danger` tone as the sole error indicator — pair with a label or icon. Do not deeply nest Text — keep to one level.

---

## 8. Breaking Change Criteria

- Removing a size, tone, or weight variant.
- Changing the default size from `md`.
- Changing `fontFamily` from `$body`.
- Changing the token mapping for any variant value.

---

## 9. Test Requirements

- **Behavioral tests:** Verify default size is `md`. Verify each size variant applies correct `fontSize`/`lineHeight`. Verify each tone applies correct color token. Verify each weight applies correct `fontWeight`. Verify variants compose correctly. Verify `Text.Small` renders `<small>`. Verify `Text.Code` renders `<code>`.
- **Accessibility tests:** Verify no role is set by default. Verify `muted` tone meets contrast requirements (theme-level verification).
