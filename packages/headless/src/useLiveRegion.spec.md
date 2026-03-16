# Spec — useLiveRegion

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Screen reader announcements for dynamic content: toasts, form validation, live updates.
- Wraps `@react-aria/live-announcer` via the adapter module.
- Returns `announce()` for programmatic announcements + `getLiveRegionProps()` for explicit live region containers.

---

## 2. UX Intent

Ensures screen reader users are notified of dynamic content changes that sighted users see visually. Polite announcements for non-urgent updates (toasts, status changes). Assertive announcements for urgent alerts (errors, time-sensitive).

---

## 4. Behavior

- `announce(message, politeness?)` sends message to screen reader via `@react-aria/live-announcer`.
- Default politeness: `'polite'` (hook-level). Per-call override available.
- `getLiveRegionProps()` returns ARIA attributes for explicit live region containers.
- `role='status'` for polite, `role='alert'` for assertive.
- `aria-atomic=true` — reads the full region content on change.
- `clearAnnouncer` called on unmount for cleanup.

> **TypeScript is the source of truth for the API.** See `useLiveRegion.ts` for the full typed signature.

---

## 5. Accessibility

- **WCAG 4.1.3 Status Messages:** Dynamic content changes must be programmatically determinable without receiving focus.
- `aria-live='polite'` — waits for current speech to finish. Use for toasts, status updates.
- `aria-live='assertive'` — interrupts current speech. Use for errors, alerts, time-sensitive content.
- `aria-atomic=true` — reads full region, not just the delta.
- `role='status'` / `role='alert'` — implicit live region semantics for assistive technology.

---

## 7. Composition

- Uses `@react-aria/live-announcer` via `_adapters/react-aria` adapter.
- Used by useToastQueue (unlocks `it.todo` test), form validation, any component with dynamic announcements.
- Dependencies: React (`useCallback`, `useEffect`). External: `@react-aria/live-announcer` (optional).
- **Anti-patterns:** Do not call `announce()` on every render. Do not use assertive for non-urgent messages.

---

## 8. Breaking Change Criteria

- Changing `announce()` function signature.
- Changing `getLiveRegionProps()` return shape.
- Changing politeness values or defaults.
- Removing cleanup on unmount.

---

## 9. Test Requirements

- **announce:** Calls react-aria announce with message and default politeness. Respects per-call politeness override. Uses hook-level politeness as default.
- **getLiveRegionProps:** Returns `role='status'` for polite. Returns `role='alert'` for assertive. Returns `aria-live` matching politeness. Returns `aria-atomic=true`.
- **cleanup:** `clearAnnouncer` called on unmount.
- **Prop-getter shape:** `getLiveRegionProps` returns correct object shape.
