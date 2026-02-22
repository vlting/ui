# Component Spec -- useControllableState

## 1. Purpose

- Provides a unified state management pattern that supports both controlled and uncontrolled usage within a single component.
- Should be used when building components that accept an optional `value`/`onChange` prop pair but also need to work without them (e.g., inputs, toggles, accordions).
- Should NOT be used for global or cross-component shared state. Should NOT be used when only one mode (controlled or uncontrolled) is ever needed.

---

## 2. UX Intent

N/A -- this is a state management hook with no direct UX impact. It provides infrastructure for components that need dual controlled/uncontrolled behavior.

---

## 3. Visual Behavior

N/A -- hook with no visual output.

---

## 4. Interaction Behavior

- When `prop` is provided (`!== undefined`), the hook operates in **controlled mode**: the returned value always reflects `prop`, and calling `setValue` only invokes the `onChange` callback without touching internal state.
- When `prop` is `undefined`, the hook operates in **uncontrolled mode**: the returned value reflects internal state, and calling `setValue` updates internal state and invokes `onChange`.
- `setValue` accepts a direct value or an updater function `(prev) => next`, mirroring React's `useState` API.
- The `onChange` callback is invoked in both modes whenever `setValue` is called, ensuring the consumer is always notified of value changes.
- The latest `onChange` callback is always used (stale closure prevention), so consumers can pass inline arrow functions without causing extra re-renders or stale behavior.

---

## 5. Accessibility Requirements

N/A -- this is a behavioral hook with no direct accessibility impact. Accessibility is the responsibility of the consuming component.

---

## 6. Theming Rules

N/A -- hook with no theming concerns.

---

## 7. Composition Rules

- Intended for use inside components that expose a `value`/`defaultValue`/`onChange` prop pattern (e.g., `Input`, `Select`, `Accordion`, `Tabs`).
- Dependencies: React (`useState`, `useCallback`, `useRef`). No external dependencies.
- Anti-patterns:
  - Do not switch a component between controlled and uncontrolled mid-lifecycle (passing `prop` on some renders and `undefined` on others). This leads to unpredictable state.
  - Do not use this hook for state that must be shared across multiple components.
  - Do not use `onChange` to synchronize back into the same `prop` in the same render cycle (infinite loop risk).

---

## 8. Performance Constraints

- `setValue` is memoized via `useCallback` and is stable as long as the controlled/uncontrolled status and `prop` value do not change.
- `onChange` is stored in a ref and never appears in dependency arrays, preventing unnecessary re-renders when the consumer passes a new `onChange` function reference.
- In controlled mode, no internal `setState` call occurs, so no additional re-render is triggered by `setValue`.

---

## 9. Test Requirements

- **Uncontrolled mode**: Verify that omitting `prop` allows the hook to manage state internally, and that calling `setValue` updates the returned value.
- **Controlled mode**: Verify that providing `prop` makes the returned value always equal to `prop`, and that calling `setValue` does not change the returned value.
- **onChange in both modes**: Verify `onChange` is invoked with the resolved value in both controlled and uncontrolled modes.
- **Updater function**: Verify `setValue` correctly handles `(prev) => next` updater functions in both modes.
- **Stale onChange prevention**: Verify that changing `onChange` between renders causes the latest version to be invoked.
- **Edge case -- undefined defaultProp**: Verify the hook works when neither `prop` nor `defaultProp` is provided (value should be `undefined`).
- **Edge case -- switching modes**: Document behavior when switching from uncontrolled to controlled (or vice versa) mid-lifecycle; this is an unsupported pattern but should not throw.
