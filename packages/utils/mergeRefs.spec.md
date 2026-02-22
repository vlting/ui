# Component Spec -- mergeRefs

## 1. Purpose

- Merges multiple React refs (callback refs, ref objects, or `undefined`/`null`) into a single callback ref that forwards the value to all of them.
- Should be used when a component needs to attach multiple refs to the same DOM element (e.g., an internal ref for measurement plus a forwarded ref from the consumer).
- Should NOT be used when only a single ref is needed. Should NOT be used outside of React ref contexts.

---

## 2. UX Intent

N/A -- utility function.

---

## 3. Visual Behavior

N/A -- utility function with no visual output.

---

## 4. Interaction Behavior

- Accepts any number of React refs (`RefCallback<T>`, `RefObject<T>`, `null`, or `undefined`) as arguments.
- Returns a single `RefCallback<T>` that, when called by React with a value (the DOM element or `null` on unmount), forwards that value to every provided ref.
- **Callback refs**: Invoked with the value directly.
- **Ref objects**: Their `.current` property is set to the value.
- **`null` and `undefined` entries**: Silently skipped.
- Refs are assigned in the order they are provided (left to right).
- On unmount, React calls the returned callback ref with `null`, which is forwarded to all refs -- callback refs receive `null`, ref objects get `.current = null`.
- Returns a new function on every call. The result is NOT memoized.

---

## 5. Accessibility Requirements

N/A -- utility function with no direct accessibility impact.

---

## 6. Theming Rules

N/A -- utility function with no theming concerns.

---

## 7. Composition Rules

- Intended for use in components that use `React.forwardRef` and also need an internal ref (e.g., `<Input ref={mergeRefs(internalRef, forwardedRef)} />`).
- Dependencies: React types (`Ref`, `RefCallback`, `MutableRefObject`). No runtime dependencies beyond React itself.
- Anti-patterns:
  - Do not call the returned callback ref manually outside of React's ref assignment lifecycle. React manages when callback refs are called.
  - Do not pass the result directly as a ref prop without memoization if the consuming component uses `React.memo` or `shouldComponentUpdate` -- the new function reference on every render will defeat memo comparisons. Wrap in `useMemo` or `useCallback` when referential stability matters.
  - Do not use `mergeRefs` to merge non-React ref patterns (e.g., plain mutable variables).

---

## 8. Performance Constraints

- Returns a new function on every call. When used in render, this means a new callback ref identity each render, which causes React to call the old callback ref with `null` and the new one with the element. This is functionally correct but has a small cost.
- For performance-critical paths, the consumer should memoize the result: `useMemo(() => mergeRefs(refA, refB), [refA, refB])`.
- The internal loop over refs is trivially cheap (typically 2-3 refs).

---

## 9. Test Requirements

- **Callback ref forwarding**: Verify that a callback ref receives the value when the merged ref is called.
- **Ref object forwarding**: Verify that a ref object's `.current` is set to the value when the merged ref is called.
- **Multiple refs**: Verify that all provided refs (mix of callback and object) receive the value.
- **Null/undefined skipping**: Verify that `null` and `undefined` entries do not cause errors.
- **Unmount cleanup**: Verify that calling the merged ref with `null` forwards `null` to all refs.
- **Order preservation**: Verify refs are assigned in left-to-right order.
- **Empty arguments**: Verify `mergeRefs()` returns a callback ref that does nothing when called.
- **Single ref passthrough**: Verify `mergeRefs(singleRef)` correctly forwards to the single ref.
