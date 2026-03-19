# Component Spec — Carousel

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Horizontally or vertically scrolling content viewer with navigation controls.
- Use for image galleries, feature showcases, and content that benefits from a slide-by-slide presentation.
- Do NOT use when all content should be visible at once (use a grid). Do NOT use for critical content that users might miss.

---

## 2. UX Intent

- **Doherty Threshold** — smooth CSS transitions (300ms) provide responsive feedback during navigation.
- **Miller's Law** — one slide at a time reduces information overload.
- **WAI-ARIA pattern:** [Carousel / Auto-Rotating Content](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

---

## 3. Anatomy

Compound component with React Context for state:
- `Carousel` (Root) — manages slide index and autoplay. Props: `orientation`, `loop`, `autoplay`, `autoplayInterval`.
- `Carousel.Content` — slide container with CSS transform animation.
- `Carousel.Item` — individual slide.
- `Carousel.Previous` / `Carousel.Next` — navigation buttons.
- `Carousel.Dots` — dot indicators showing current position.

> **TypeScript is the source of truth for props.** See source files in `Carousel/` for the full typed API.

---

## 4. Behavior

### States

- **Active slide** — fully visible.
- **Nav buttons** — disabled at boundaries when `loop` is false (reduced opacity).
- **Autoplay** — advances slides at `autoplayInterval` (if enabled).

### Keyboard Interaction

- **ArrowLeft/Right** (horizontal) or **ArrowUp/Down** (vertical) — navigate slides.

### Motion

- CSS transform with 300ms transition for slide changes.
- Must respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **ARIA attributes:** `role="region"`, `aria-roledescription="carousel"`, `aria-label` on root. `role="group"`, `aria-roledescription="slide"` on items. `role="button"`, `aria-label` on navigation controls.
- **Focus management:** Arrow keys navigate between slides.
- **Autoplay:** Should pause on focus or hover to allow users to read content.

---

## 6. Styling

- **Design tokens used:** `$background` for container, `$color` for controls, opacity tokens for disabled state.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Pages, hero sections, cards, modals.
- **What this component can contain:** Content, Item, Previous, Next, Dots sub-components.
- **Anti-patterns:** Do not use for critical content without alternative access. Do not autoplay without a pause mechanism.

---

## 8. Breaking Change Criteria

- Removing sub-components.
- Removing keyboard navigation.
- Removing autoplay support.
- Removing ARIA carousel semantics.

---

## 9. Test Requirements

- **Behavioral tests:** Verify slides advance on navigation. Verify loop wraps at boundaries. Verify non-loop disables buttons at edges. Verify autoplay advances at interval. Verify dot indicators update.
- **Accessibility tests:** Verify `role="region"` with `aria-roledescription="carousel"`. Verify slide `aria-roledescription="slide"`. Verify keyboard navigation. Verify navigation buttons have `aria-label`.
