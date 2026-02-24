# Spec — mergeRefs

> This is a non-visual utility function. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this utility.

## 1. Purpose

- Merges multiple React refs (callback refs, ref objects, or `null`/`undefined`) into a single callback ref that forwards the value to all of them.
- Use when a component needs to attach multiple refs to the same DOM element (e.g., an internal ref for measurement plus a forwarded ref from the consumer).
- Do NOT use when only a single ref is needed. Do NOT use outside of React ref contexts.

---

## 4. Behavior

- Accepts any number of React refs (`RefCallback<T>`, `RefObject<T>`, `null`, or `undefined`).
- Returns a single `RefCallback<T>` that forwards the value to every provided ref.
- **Callback refs:** Invoked with the value directly.
- **Ref objects:** `.current` is set to the value.
- **`null`/`undefined` entries:** Silently skipped.
- Refs are assigned in left-to-right order.
- On unmount, React calls the callback with `null`, which is forwarded to all refs.
- Returns a new function on every call (not memoized).

> **TypeScript is the source of truth for the API.** See `mergeRefs.ts` for the full typed signature.

---

## 7. Composition

- Intended for components using `React.forwardRef` that also need an internal ref.
- Dependencies: React types (`Ref`, `RefCallback`, `MutableRefObject`). No runtime dependencies beyond React.
- **Anti-patterns:** Do not call the returned callback ref manually outside React's ref lifecycle. Do not pass the result as a ref prop without memoization if the consumer uses `React.memo`. Do not use for non-React ref patterns.

---

## 8. Breaking Change Criteria

- Changing the return type from `RefCallback<T>`.
- Changing ref assignment order from left-to-right.
- No longer forwarding `null` on unmount.
- No longer supporting both callback refs and ref objects.

---

## 9. Test Requirements

- **Callback ref forwarding:** Verify callback ref receives the value.
- **Ref object forwarding:** Verify ref object's `.current` is set.
- **Multiple refs:** Verify all refs (mix of callback and object) receive the value.
- **Null/undefined skipping:** Verify `null` and `undefined` entries cause no errors.
- **Unmount cleanup:** Verify calling with `null` forwards `null` to all refs.
- **Order preservation:** Verify refs are assigned left-to-right.
- **Empty arguments:** Verify `mergeRefs()` returns a callback ref that does nothing.
- **Single ref passthrough:** Verify `mergeRefs(singleRef)` forwards correctly.
