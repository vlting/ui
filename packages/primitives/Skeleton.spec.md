# Component Spec — Skeleton

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Loading placeholder that indicates content is being fetched or rendered.
- Use as a stand-in for text blocks, images, avatars, and other content during loading states.
- Do NOT use for indefinite loading spinners (use Spinner instead). Do NOT use without an accompanying screen reader loading announcement.

---

## 2. UX Intent

- **Doherty Threshold** — provides immediate visual feedback that content is loading, reducing perceived wait time.
- **Peak-End Rule** — smooth loading transitions contribute to a positive end-to-end experience.

---

## 3. Anatomy

Single element — `styled(View)` with a subtle pulse animation and optional circle variant.

- `circle`: boolean — when true, uses a fully rounded border radius (1000) for avatar/icon placeholders.
- Consumer controls dimensions via `width` and `height` props.

> **TypeScript is the source of truth for props.** See `SkeletonProps` in `Skeleton.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. Skeleton is a passive loading indicator.

### Keyboard Interaction

None — Skeleton is not focusable and not announced as interactive.

### Motion

- Uses Tamagui `animation: 'lazy'` with an opacity pulse (0.3 → 0.5).
- **Reduced motion:** The `lazy` animation in Tamagui respects `prefers-reduced-motion`. When reduced motion is preferred, the skeleton renders static without animation.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>` with `aria-hidden="true"` — hidden from the accessibility tree.
- **Screen reader announcements:** Skeleton itself is invisible to screen readers. The consumer must provide a separate loading announcement (e.g., `<VisuallyHidden><Text>Loading...</Text></VisuallyHidden>` or an `aria-live` region).
- **Important:** Skeleton is a visual-only indicator. Never rely on it as the sole loading signal for screen reader users.

---

## 6. Styling

- **Design tokens used:**
  - `backgroundColor: '$color4'` — muted background
  - `borderRadius: '$2'` (default) or `1000` (circle variant)
  - `opacity: 0.5` (resting) / `0.3` (enter animation start)
  - `overflow: 'hidden'`
- **Responsive behavior:** Consumer sets dimensions. Skeleton fills to those dimensions.
- **Dark mode:** `$color4` resolves to appropriate dark theme value.

---

## 7. Composition

- **What can contain this component:** Any layout context — cards, lists, forms, page sections.
- **What this component can contain:** Nothing — Skeleton is a leaf placeholder element.
- **Anti-patterns:** Do not use Skeleton without a screen reader loading announcement. Do not use for interactive placeholders.

---

## 8. Breaking Change Criteria

- Removing the `circle` variant.
- Changing the animation behavior.
- Removing `aria-hidden="true"`.
- Changing `backgroundColor` from `$color4`.

---

## 9. Test Requirements

- **Behavioral tests:** Verify default renders with rectangular shape (`borderRadius: '$2'`). Verify `circle` variant applies fully rounded border radius. Verify animation prop is set.
- **Accessibility tests:** Verify `aria-hidden="true"` is in the DOM. Verify Skeleton is not focusable. Verify it is not announced by screen readers.
- **Visual regression:** Default rectangle, circle variant, multiple skeletons in a layout.
