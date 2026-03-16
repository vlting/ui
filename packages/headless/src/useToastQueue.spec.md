# Spec — useToastQueue

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Manages a queue of toast notifications with auto-dismiss support.
- Use when building Toast/Toaster components that need queued, auto-dismissing notifications.
- Do NOT use for persistent alerts or modals. Do NOT use for notifications that require user action before dismissal.

---

## 2. UX Intent

Provides a FIFO notification queue that automatically cleans up after a configurable duration. Each toast is independently timed, supporting variable importance via custom durations.

---

## 4. Behavior

- `add(toast)` generates a unique ID, appends to queue, and returns the ID. ID format: `toast-{counter}-{timestamp}` (non-deterministic).
- `toasts` array reflects the current queue in insertion order.
- `remove(id)` removes a specific toast by ID. No-op for non-existent IDs.
- `removeAll()` clears the entire queue.
- Auto-dismiss: each toast is removed after `duration` ms (default `5000`). Custom duration supported per toast.
- Timer for a toast is cleared if the toast is manually removed before expiry.
- All timers are cleaned up on unmount.
- Store is per-instance via `useRef` — multiple hook instances maintain separate queues.
- Uses `useSyncExternalStore` for subscription-based reactivity.

> **TypeScript is the source of truth for the API.** See `useToastQueue.ts` for the full typed signature. Do not duplicate type tables here.

---

## 5. Accessibility

Planned: `aria-live` region support will be added via `useLiveRegion` (Stage 5.3). The consuming Toast/Toaster component is responsible for wrapping the queue in an `aria-live` region.

---

## 7. Composition

- Uses `useSyncExternalStore` for store subscription pattern.
- Used by Toast/Toaster components.
- Independent of react-aria or other external a11y libraries.
- Dependencies: React (`useCallback`, `useEffect`, `useRef`, `useSyncExternalStore`). No external dependencies.

---

## 8. Breaking Change Criteria

- Changing the `Toast` interface shape (especially `id`, `message`, `duration`).
- Changing the return type of `add` (currently returns string ID).
- Changing auto-dismiss default duration or disabling auto-dismiss.
- Making the store a singleton instead of per-instance.

---

## 9. Test Requirements

- **Adding toasts:** `add()` returns an ID matching `/^toast-/`. Toast appears in `toasts` array. Multiple toasts queue in order. Custom properties preserved on toast.
- **Removing toasts:** `remove(id)` removes specific toast. `removeAll` clears all. Removing non-existent ID is a no-op.
- **Auto-dismiss:** Toast auto-removed after default 5000ms. Custom duration respected. Timer cleared if manually removed before expiry.
- **Timer management:** Timers cleaned up on unmount. Multiple toasts each have independent timers.
- **Store isolation:** Two hook instances have separate queues.
- **aria-live:** `it.todo` — see useLiveRegion Stage 5.3.

> **Note:** IDs are non-deterministic (module-level counter + `Date.now()`). Tests must use pattern matching (`/^toast-/`), not exact values.
