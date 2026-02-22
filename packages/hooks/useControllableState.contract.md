# Component Contract -- useControllableState

## 1. Public API

### Generic Type Parameter

- `T` -- The type of the controlled/uncontrolled value.

### Parameters

Accepts a single object of type `UseControllableStateParams<T>`:

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `prop` | `T` | No | `undefined` | The controlled value. When provided (`!== undefined`), the hook operates in controlled mode. |
| `defaultProp` | `T` | No | `undefined` | The initial value for uncontrolled mode. Passed to `useState` as the initial state. |
| `onChange` | `(value: T) => void` | No | `undefined` | Callback invoked whenever the value changes, in both controlled and uncontrolled modes. |

### Return Value

| Type | Description |
|------|-------------|
| `readonly [T \| undefined, (nextValue: T \| ((prev: T \| undefined) => T)) => void]` | A tuple of `[value, setValue]`. `value` is the current controlled or uncontrolled value. `setValue` accepts a direct value or an updater function (same signature as React's `setState`). |

---

## 2. Behavioral Guarantees

- **Controlled vs. uncontrolled determination**: If `prop !== undefined`, the hook is controlled. Otherwise, it is uncontrolled and manages its own internal state via `useState`.
- **In controlled mode**: `setValue` does NOT update internal state. It resolves the next value and calls `onChange` only.
- **In uncontrolled mode**: `setValue` updates internal state via `setInternalValue` and calls `onChange` with the resolved value.
- **Updater function support**: `setValue` accepts either a direct value of type `T` or an updater function `(prev: T | undefined) => T`, mirroring React's `useState` API.
- **Stale closure prevention**: The `onChange` callback is stored in a ref (`onChangeRef`) and updated on every render, so the latest `onChange` is always invoked without needing it in dependency arrays.
- **`setValue` stability**: `setValue` is memoized via `useCallback` with dependencies `[isControlled, prop]`. It is stable as long as the controlled/uncontrolled status and `prop` value do not change.
- **No side effects beyond `onChange`**: The hook does not perform any DOM mutations, network calls, or effects. The only external side effect is invoking the `onChange` callback.
- **React hook rules apply**: Must be called at the top level of a React function component or custom hook. Cannot be called conditionally.

---

## 3. Accessibility Guarantees

N/A -- this is a behavioral hook with no direct accessibility impact. It provides state management infrastructure that accessibility-concerned components can build upon.

---

## 4. Styling Guarantees

N/A -- this is a behavioral hook with no styling concerns.

---

## 5. Breaking Change Criteria

- Changing the parameter object shape (adding required fields, removing fields, renaming fields).
- Changing the return tuple structure (reordering, adding, or removing elements).
- Changing the controlled/uncontrolled determination logic (currently `prop !== undefined`).
- Changing when `onChange` is invoked (currently invoked in both controlled and uncontrolled modes on every `setValue` call).
- Removing updater function support from `setValue`.
- Changing the generic type parameter contract.
