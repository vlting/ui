# Component Contract -- composeEventHandlers

## 1. Public API

### Generic Type Parameter

- `E` -- The event type. Not constrained; works with any event-like object.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `...handlers` | `(((event: E) => void) \| undefined)[]` | No (rest parameter) | Any number of event handler functions or `undefined` values. `undefined` entries are skipped. |

### Return Value

| Type | Description |
|------|-------------|
| `(event: E) => void` | A single composed event handler that calls each provided handler in order. |

---

## 2. Behavioral Guarantees

- **Sequential execution**: Handlers are called in the order they are provided (left to right).
- **Undefined handlers skipped**: `undefined` entries in the handlers list are silently skipped.
- **Short-circuit on `defaultPrevented`**: After each handler executes, the composed handler checks `event.defaultPrevented`. If `true`, remaining handlers are skipped and the function returns.
- **`defaultPrevented` check implementation**: The event is cast via `(event as unknown as { defaultPrevented?: boolean }).defaultPrevented`, so this works with any event-like object that has a `defaultPrevented` property, not just native DOM events.
- **No error swallowing**: If a handler throws, the error propagates and subsequent handlers are not called.
- **Pure factory**: `composeEventHandlers` itself has no side effects. It returns a new function each time it is called.
- **No modification of event**: The composed handler does not modify the event object. Only individual handlers may do so.

---

## 3. Accessibility Guarantees

N/A -- utility function with no direct accessibility impact.

---

## 4. Styling Guarantees

N/A -- this is a behavioral utility with no styling concerns.

---

## 5. Breaking Change Criteria

- Changing the parameter signature (e.g., from rest parameters to an array parameter).
- Changing the return type from `(event: E) => void`.
- Removing the `defaultPrevented` short-circuit behavior.
- Changing the execution order of handlers.
- Adding error handling that swallows exceptions from individual handlers.
- Removing support for `undefined` entries in the handlers list.
- Changing the generic type parameter contract.
