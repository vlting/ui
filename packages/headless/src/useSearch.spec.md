# Spec — useSearch

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Client-side filtering for search fields, command palettes, and combobox filtering.
- Accepts a list of items and a consumer-provided filter function; returns filtered results and input prop-getter.
- Do NOT use for server-side/async search. Do NOT use when filtering logic lives outside the component.

---

## 2. UX Intent

Provides instant, synchronous filtering as the user types. Results update on every keystroke with no debounce (consumer can add debounce externally if needed).

---

## 4. Behavior

- `query` state starts as empty string `''`.
- When `query` is empty, `filtered` returns all `items` (no filtering applied).
- When `query` is non-empty, each item is tested via `filterFn(item, query)`. Only passing items are in `filtered`.
- `filtered` is memoized via `useMemo` — same reference when deps haven't changed.
- `getInputProps()` returns `{ value, onChange, type: 'search' }`.
- `onChange` handles `ChangeEvent<HTMLInputElement>` and updates `query` from `e.target.value`.
- `setQuery` allows programmatic query updates.

> **TypeScript is the source of truth for the API.** See `useSearch.ts` for the full typed signature. Do not duplicate type tables here.

> **Note:** Consumer should wrap input in a labeled Field for a11y. `getInputProps` adds `type: 'search'` for semantics.

---

## 7. Composition

- Used by Command, Combobox components.
- Dependencies: React (`useState`, `useCallback`, `useMemo`). No external dependencies.
- **DX Note:** Was `inputProps` (static object), normalized to `getInputProps()` (getter) for consistency with other prop-getter hooks.

---

## 8. Breaking Change Criteria

- API change: `inputProps` → `getInputProps()` (getter function).
- Changing `getInputProps` return shape.
- Changing when `filtered` recomputes.
- Removing `setQuery` or changing its signature.

---

## 9. Test Requirements

- **Initial state:** Query is empty, all items returned, input value is empty.
- **Filtering:** Typing filters items via filterFn. Clearing input shows all items. Case matching depends on filterFn.
- **setQuery:** Programmatic setQuery updates both query and filtered results.
- **Memoization:** `filtered` returns same reference when query hasn't changed.
- **getInputProps:** Returns `value`, `onChange`, `type='search'`. `onChange` handles ChangeEvent.
- **Edge cases:** Empty items array. No matches returns empty array. filterFn receives correct args.
