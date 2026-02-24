# Spec — cn

> This is a non-visual utility function. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this utility.

## 1. Purpose

- Conditionally composes CSS class name strings, filtering out falsy values and joining the rest with spaces.
- Use whenever class names need to be conditionally applied (e.g., `cn('base', isActive && 'active')`).
- Do NOT use as a replacement for Tamagui's `styled()` system for token-based styling. Do NOT expect deduplication or class name conflict resolution.

---

## 4. Behavior

- Accepts any number of arguments: `string`, `false`, `null`, or `undefined`.
- Filters out all falsy values.
- Joins remaining truthy strings with a single space character.
- Returns `''` when called with no arguments or only falsy arguments.
- Does NOT deduplicate class names. Does NOT trim individual input strings.
- Preserves input order in output.
- Pure function with no side effects.

> **TypeScript is the source of truth for the API.** See `cn.ts` for the full typed signature.

---

## 7. Composition

- Can be used in any component or utility that builds class name strings.
- Dependencies: None. Zero-dependency pure function.
- **Anti-patterns:** Do not pass objects or arrays as arguments. Do not rely on `cn` for class name conflict resolution. Do not use as a substitute for `styled()`.

---

## 8. Breaking Change Criteria

- Changing the accepted argument types.
- Adding deduplication or trimming behavior (would change existing output).
- Changing the separator from a single space.

---

## 9. Test Requirements

- **Single class:** Verify `cn('foo')` returns `'foo'`.
- **Multiple classes:** Verify `cn('a', 'b', 'c')` returns `'a b c'`.
- **Falsy filtering:** Verify `cn('a', false, 'b', null, 'c', undefined)` returns `'a b c'`.
- **All falsy:** Verify `cn(false, null, undefined)` returns `''`.
- **No arguments:** Verify `cn()` returns `''`.
- **No deduplication:** Verify `cn('a', 'a')` returns `'a a'`.
- **Order preservation:** Verify output order matches input order.
