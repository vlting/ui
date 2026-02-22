# Component Spec -- composeEventHandlers

## 1. Purpose

- Composes multiple event handler functions into a single handler that calls each in sequence, with short-circuit support when `defaultPrevented` is set.
- Should be used when a component needs to layer internal event handling with user-provided handlers (e.g., a `Button` that has internal click logic but also accepts an `onClick` prop).
- Should NOT be used for non-event callbacks that do not have a `defaultPrevented` property. Should NOT be used when handler ordering does not matter (just call them individually).

---

## 2. UX Intent

N/A -- utility function.

---

## 3. Visual Behavior

N/A -- utility function with no visual output.

---

## 4. Interaction Behavior

- Accepts any number of event handler functions (or `undefined` values) as arguments.
- Returns a single composed handler function that, when called with an event, invokes each provided handler in left-to-right order.
- `undefined` entries are silently skipped.
- After each handler executes, the composed handler checks `event.defaultPrevented`. If `true`, remaining handlers are skipped.
- This short-circuit behavior allows a handler to call `event.preventDefault()` to stop downstream handlers from running.
- If a handler throws an error, the error propagates immediately; no subsequent handlers execute and no error is swallowed.
- The composed handler does not itself modify the event object.
- The factory function (`composeEventHandlers(...)`) returns a new function on every call. It does not memoize.
- Works with any event-like object that has a `defaultPrevented` property, not only native DOM events.

---

## 5. Accessibility Requirements

N/A -- utility function with no direct accessibility impact.

---

## 6. Theming Rules

N/A -- utility function with no theming concerns.

---

## 7. Composition Rules

- Intended for use in component internals where a library-level handler must coexist with a consumer-provided handler (e.g., `composeEventHandlers(internalOnClick, props.onClick)`).
- Dependencies: None. Zero-dependency pure function.
- Anti-patterns:
  - Do not use for composing non-event callbacks that lack `defaultPrevented` semantics; the short-circuit check would always pass through (since `defaultPrevented` would be `undefined`/falsy), making it equivalent to just calling functions in sequence.
  - Do not rely on the composed handler being referentially stable across renders; wrap in `useMemo` or `useCallback` if stability is needed.
  - Do not use to compose async event handlers; the `defaultPrevented` check runs synchronously after each call.

---

## 8. Performance Constraints

- The factory returns a new function on every call. Consuming components should memoize the result (e.g., via `useMemo`) if the composed handler is passed as a prop to child components where referential stability matters.
- The composed handler iterates through the handlers array on each invocation; cost is linear in the number of handlers (typically 2-3, so negligible).

---

## 9. Test Requirements

- **Sequential execution**: Verify handlers are called in the order provided.
- **Short-circuit on defaultPrevented**: Verify that if a handler calls `event.preventDefault()`, subsequent handlers are not invoked.
- **Undefined handlers skipped**: Verify `undefined` entries do not cause errors and are silently skipped.
- **All undefined**: Verify `composeEventHandlers(undefined, undefined)` returns a handler that does nothing.
- **Single handler**: Verify a single handler is called correctly.
- **Error propagation**: Verify that if a handler throws, the error propagates and subsequent handlers are not called.
- **Non-DOM events**: Verify the utility works with plain objects that have a `defaultPrevented` property.
- **No event mutation**: Verify the composed handler does not set properties on the event object.
