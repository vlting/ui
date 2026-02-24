# Spec — composeEventHandlers

> This is a non-visual utility function. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this utility.

## 1. Purpose

- Composes multiple event handler functions into a single handler that calls each in sequence, with short-circuit support via `defaultPrevented`.
- Use when a component needs to layer internal event handling with user-provided handlers (e.g., a Button with internal click logic that also accepts `onClick`).
- Do NOT use for non-event callbacks without `defaultPrevented`. Do NOT use when handler ordering does not matter.

---

## 4. Behavior

- Accepts any number of event handler functions (or `undefined`) as arguments.
- Returns a single composed handler that invokes each handler in left-to-right order.
- `undefined` entries are silently skipped.
- After each handler, checks `event.defaultPrevented`. If `true`, remaining handlers are skipped.
- If a handler throws, the error propagates immediately; no subsequent handlers execute.
- The composed handler does not itself modify the event object.
- Returns a new function on every call (not memoized).
- Works with any event-like object that has a `defaultPrevented` property.

> **TypeScript is the source of truth for the API.** See `composeEventHandlers.ts` for the full typed signature.

---

## 7. Composition

- Intended for component internals where a library-level handler coexists with a consumer-provided handler.
- Dependencies: None. Zero-dependency pure function.
- **Anti-patterns:** Do not use for non-event callbacks without `defaultPrevented` semantics. Do not rely on referential stability — wrap in `useMemo`/`useCallback` if needed. Do not compose async handlers — the `defaultPrevented` check is synchronous.

---

## 8. Breaking Change Criteria

- Changing invocation order from left-to-right.
- Removing the `defaultPrevented` short-circuit behavior.
- Changing the return type from `(event: E) => void`.
- Swallowing handler errors instead of propagating.

---

## 9. Test Requirements

- **Sequential execution:** Verify handlers are called in order.
- **Short-circuit on defaultPrevented:** Verify subsequent handlers are skipped after `event.preventDefault()`.
- **Undefined handlers skipped:** Verify `undefined` entries cause no errors.
- **All undefined:** Verify returns a handler that does nothing.
- **Single handler:** Verify called correctly.
- **Error propagation:** Verify error propagates and subsequent handlers are skipped.
- **Non-DOM events:** Verify works with plain objects having `defaultPrevented`.
- **No event mutation:** Verify composed handler does not set properties on the event object.
