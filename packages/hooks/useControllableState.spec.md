# Spec — useControllableState

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Unified state management pattern supporting both controlled and uncontrolled usage within a single component.
- Use when building components that accept an optional `value`/`onChange` prop pair but also need to work without them (e.g., inputs, toggles, accordions).
- Do NOT use for global or cross-component shared state. Do NOT use when only one mode (controlled or uncontrolled) is ever needed.

---

## 2. UX Intent

Infrastructure hook with no direct UX impact. It enables the controlled/uncontrolled dual-mode pattern that users expect from form-like components.

---

## 4. Behavior

- When `prop` is provided (`!== undefined`), the hook operates in **controlled mode**: the returned value always reflects `prop`, and `setValue` only invokes the `onChange` callback without updating internal state.
- When `prop` is `undefined`, the hook operates in **uncontrolled mode**: the returned value reflects internal state, and `setValue` updates internal state and invokes `onChange`.
- `setValue` accepts a direct value or an updater function `(prev) => next`, mirroring React's `useState` API.
- `onChange` is invoked in both modes whenever `setValue` is called.
- The latest `onChange` callback is always used via ref (stale closure prevention).

> **TypeScript is the source of truth for the API.** See `useControllableState.ts` for the full typed signature. Do not duplicate type tables here.

---

## 7. Composition

- Intended for use inside components exposing a `value`/`defaultValue`/`onChange` pattern (Input, Select, Accordion, Tabs).
- Dependencies: React (`useState`, `useCallback`, `useRef`). No external dependencies.
- **Anti-patterns:** Do not switch between controlled and uncontrolled mid-lifecycle. Do not use `onChange` to synchronize back into the same `prop` in the same render cycle (infinite loop risk).

---

## 8. Breaking Change Criteria

- Changing the return type from `[T | undefined, setter]`.
- Removing updater function support in `setValue`.
- Changing when `onChange` is invoked (e.g., no longer calling it in controlled mode).
- Removing stale-closure prevention for `onChange`.

---

## 9. Test Requirements

- **Uncontrolled mode:** Verify omitting `prop` allows internal state management. Verify `setValue` updates the returned value.
- **Controlled mode:** Verify providing `prop` makes the returned value always equal `prop`. Verify `setValue` does not change the returned value.
- **onChange in both modes:** Verify `onChange` is invoked with the resolved value in both modes.
- **Updater function:** Verify `setValue((prev) => next)` works correctly in both modes.
- **Stale onChange prevention:** Verify changing `onChange` between renders causes the latest version to be invoked.
- **Edge cases:** Verify behavior when neither `prop` nor `defaultProp` is provided (value = `undefined`). Verify switching from uncontrolled to controlled mid-lifecycle does not throw.
