> **Note**: This is a non-visual utility. The [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md) baseline applies only to components that produce rendered output.

# Component Contract -- mergeRefs

## 1. Public API

### Generic Type Parameter

- `T` -- The type of the ref value (typically an HTML element type).

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `...refs` | `(Ref<T> \| undefined)[]` | No (rest parameter) | Any number of React refs (`RefCallback<T>`, `RefObject<T>`) or `undefined` values. `undefined` entries are skipped. |

Where `Ref<T>` is `React.Ref<T>`, which is `RefCallback<T> | RefObject<T> | null`.

### Return Value

| Type | Description |
|------|-------------|
| `RefCallback<T>` | A callback ref `(value: T \| null) => void` that forwards the ref value to all provided refs. |

---

## 2. Behavioral Guarantees

- **Callback ref handling**: If a ref is a function (`typeof ref === 'function'`), it is called with the value (`T | null`).
- **RefObject handling**: If a ref is a non-null, non-function object, its `.current` property is set to the value. The ref is cast to `MutableRefObject<T | null>` to allow assignment.
- **Null/undefined skipping**: `undefined` refs are skipped. `null` refs (which satisfy `Ref<T>`) are also skipped because of the `ref != null` check.
- **Order preservation**: Refs are assigned in the order they are provided (left to right).
- **Returns a new function each call**: `mergeRefs` returns a new callback ref function on every invocation. It does not memoize the result.
- **Supports cleanup via null**: When React unmounts a component, the callback ref is called with `null`, which is forwarded to all refs (callback refs receive `null`, RefObjects get `.current = null`).
- **Pure factory**: `mergeRefs` itself has no side effects. The returned callback ref's side effects are limited to assigning ref values.

---

## 3. Accessibility Guarantees

N/A -- utility function with no direct accessibility impact.

---

## 4. Styling Guarantees

N/A -- this is a behavioral utility with no styling concerns.

---

## 5. Breaking Change Criteria

- Changing the return type from `RefCallback<T>` (e.g., to `MutableRefObject<T>`).
- Changing the parameter signature (e.g., from rest parameters to an array parameter).
- Removing support for callback refs or RefObject refs.
- Removing support for `undefined`/`null` entries in the refs list.
- Changing the order in which refs are assigned.
- Adding memoization that changes referential identity behavior.
- Changing the generic type parameter contract.
