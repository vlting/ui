# Component Spec — Heading

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Semantic heading elements (`<h1>` through `<h6>`) with design system typography.
- Use for all section headings, page titles, and content hierarchy labels.
- Do NOT use for body text, captions, or inline emphasis (use Text instead).
- Do NOT use purely for visual sizing without heading semantics — the component renders a native `<h1>`–`<h6>` element.

---

## 2. UX Intent

- **Miller's Law** — headings break content into scannable chunks, reducing cognitive load.
- **Gestalt Principles** — larger, bolder headings signal visual prominence and group the content beneath them.
- **Jakob's Law** — the six-level scale matches the familiar heading hierarchy across web and native platforms.

---

## 3. Anatomy

Compound component — `Heading` is the base (`<h2>`), with sub-components `Heading.H1` through `Heading.H6` for explicit level selection.

- Each sub-component (`Heading.H1`, `Heading.H2`, …, `Heading.H6`) is a `styled()` call on the corresponding HTML heading element.
- `<Heading>` renders `<h2>` by default (backward-compatible).
- Usage: `<Heading.H1>Page Title</Heading.H1>`, `<Heading.H3>Section</Heading.H3>`, etc.

> **TypeScript is the source of truth for props.** See `Heading.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — not focusable by default. If wrapped in a link or button, the parent handles focus.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Each sub-component renders its native heading element (`<h1>` through `<h6>`). No `aria-level` needed.
- **Screen reader announcements:** Announced as heading with level, enabling document navigation.
- **Contrast:** `$color` token must meet WCAG AA (4.5:1 for normal text, 3:1 for large text). Levels 1–2 typically qualify as large text.

---

## 6. Styling

- **Design tokens used:**
  - `fontFamily: '$heading'`
  - `color: '$color'`
  - Levels 1–2: `fontWeight: '$5'`; Levels 3–6: `fontWeight: '$4'`
  - Font size and line height scale with level (level 1 = largest)
- **Responsive behavior:** Supports STL media-query props. Consumers select the appropriate sub-component for their heading level.
- **Dark mode:** Text color switches via `$color` token automatically.

---

## 7. Composition

- **What can contain this component:** Any layout container. Should appear within sectioning content (`<section>`, `<article>`, `<main>`).
- **What this component can contain:** Inline content — text, `<span>`, `<code>`, `<a>`. Must not contain block-level layout components.
- **Anti-patterns:** Do not skip heading levels (e.g., `<h1>` then `<h3>`). Do not nest Heading inside another Heading. Do not use Heading for decorative large text — use Text with a large `size` instead.

---

## 8. Breaking Change Criteria

- Removing a heading level.
- Changing the rendered HTML element for any level.
- Changing `fontFamily` from `$heading`.
- Changing default level from 2.

---

## 9. Test Requirements

- **Behavioral tests:** Verify each sub-component (H1–H6) renders the correct HTML heading element. Verify `<Heading>` renders `<h2>` by default.
- **Accessibility tests:** Verify each sub-component renders its native heading element. Verify text contrast (theme-level verification).
