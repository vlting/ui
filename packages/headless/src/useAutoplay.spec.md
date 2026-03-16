# Spec — useAutoplay

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Manages play/pause state with interval-based ticking for carousel and slideshow autoplay.
- Automatically respects `prefers-reduced-motion` — pauses when the user preference is active.
- Use when building auto-advancing UI (Carousel, image galleries, testimonial rotators).
- Do NOT use for animations or transitions — only for discrete "advance to next" ticking.

---

## 2. UX Intent

Provides an accessible autoplay primitive that automatically degrades when the user has `prefers-reduced-motion` enabled. Manual play/pause/toggle gives consumers full control over the autoplay lifecycle.

---

## 4. Behavior

- **`isPlaying` is derived, not direct state:** `isPlaying = enabled && !manualPause && !reducedMotion`.
- When `isPlaying` is `true`, `onTick` is called every `interval` ms via `setInterval`.
- When `isPlaying` is `false` (any reason), the interval is cleared.
- `play()` clears `manualPause`. `pause()` sets `manualPause`. `toggle()` flips `manualPause`.
- `onTick` uses a ref (`tickRef.current = onTick`) to avoid stale closures — changing `onTick` between renders always invokes the latest version.
- `interval` defaults to `5000` ms. `enabled` defaults to `true`.
- Changing `interval` while playing clears and restarts the timer.
- Unmounting clears the timer.

> **TypeScript is the source of truth for the API.** See `useAutoplay.ts` for the full typed signature.

---

## 7. Composition

- Used by Carousel and any auto-advancing component.
- Dependencies: React (`useState`, `useEffect`, `useCallback`, `useRef`). Uses internal `usePrefersReducedMotion` helper.
- **Anti-patterns:** Do not call `onTick` directly — let the interval manage it. Do not set `enabled` and `manualPause` to conflicting states in the same render.

---

## 8. Breaking Change Criteria

- Changing the return type shape (`{ isPlaying, play, pause, toggle }`).
- Changing `isPlaying` derivation logic (e.g., ignoring `reducedMotion`).
- Removing `prefers-reduced-motion` respect.
- Changing the default `interval` or `enabled` values.
- Removing ref-based stale closure prevention for `onTick`.

---

## 9. Test Requirements

- **Basic behavior:** Starts playing when enabled (default). Calls `onTick` at interval. Stops when `enabled=false`.
- **Manual control:** `pause()` stops ticking. `play()` resumes. `toggle()` flips pause state.
- **Reduced motion:** `isPlaying` is `false` when `matchMedia` matches. Resumes when preference changes.
- **Interval management:** Changing interval clears and restarts timer. Unmount clears timer.
- **onTick ref:** Changing onTick callback between renders uses latest version (no stale closure).
- **isPlaying derivation:** `false` when `enabled=false` regardless of pause state. `false` when reducedMotion regardless of enabled/pause.
