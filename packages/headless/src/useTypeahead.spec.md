# Spec — useTypeahead

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Type-to-select for listboxes, menus, selects, and any navigable list.
- Buffers keystrokes, matches against items by prefix (case-insensitive), fires `onMatch` with the matched index.
- Do NOT use for search/filter (see `useSearch`). Typeahead selects, it does not filter.

---

## 2. UX Intent

Lets keyboard users quickly jump to list items by typing the first few characters. Familiar pattern from native `<select>` elements and OS file browsers. Buffer clears after a timeout so subsequent typing starts fresh.

---

## 4. Behavior

- Keystroke buffer accumulates printable characters (single char, `e.key.length === 1`).
- Modifier combinations (`Ctrl`, `Meta`, `Alt`) and non-printable keys are ignored.
- Buffer clears after `timeout` (default `500`ms) of no typing.
- On each keystroke: append to buffer, search items for case-insensitive prefix match.
- First matching item's index is passed to `onMatch(index)`.
- No match → no `onMatch` call.
- `clearBuffer()` imperatively clears buffer and timer.
- `onMatch` uses a ref to avoid stale closures.

> **TypeScript is the source of truth for the API.** See `useTypeahead.ts` for the full typed signature.

---

## 5. Accessibility

No direct a11y surface. Typeahead is a DX/UX convenience. Consumer is responsible for ARIA on the list (e.g., `aria-activedescendant`).

---

## 7. Composition

- Used by useListState, Select, Menu.
- Composes via spreading `getTypeaheadProps()` onto the list container alongside `getListProps`.
- Dependencies: React (`useCallback`, `useRef`). No external deps.
- **Anti-patterns:** Do not use on `<input>` elements — use `useSearch` instead. Do not override `onKeyDown` after spreading `getTypeaheadProps`.

---

## 8. Breaking Change Criteria

- Changing `getTypeaheadProps()` return shape.
- Changing default `timeout` value.
- Changing match algorithm (prefix vs. contains).
- Removing `clearBuffer` from return.
- Changing buffer accumulation behavior.

---

## 9. Test Requirements

- **Basic matching:** Single char matches first item starting with that char. Multiple chars accumulate and match prefix.
- **Case insensitive:** Lowercase input matches uppercase items and vice versa.
- **Buffer timeout:** Buffer clears after timeout (default 500ms). New typing after timeout starts fresh buffer.
- **Custom timeout:** Respects custom timeout value.
- **No match:** No `onMatch` call when nothing matches.
- **Modifier keys:** Ctrl+key, Meta+key, Alt+key are ignored. Non-printable keys (Enter, Escape, ArrowDown) are ignored.
- **clearBuffer:** Imperatively clears buffer; subsequent typing starts fresh.
- **Prop-getter:** `getTypeaheadProps()` returns `onKeyDown`.
