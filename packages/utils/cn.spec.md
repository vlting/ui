# Component Spec -- cn

## 1. Purpose

- Provides a concise way to conditionally compose CSS class name strings, filtering out falsy values and joining the rest with spaces.
- Should be used whenever class names need to be conditionally applied (e.g., `cn('base', isActive && 'active', isDisabled && 'disabled')`).
- Should NOT be used as a replacement for a full CSS-in-JS solution. Should NOT be used when Tamagui's styled system or token-based styling is appropriate. Should NOT be expected to deduplicate or merge conflicting class names (use `tailwind-merge` or similar for that).

---

## 2. UX Intent

N/A -- utility function.

---

## 3. Visual Behavior

N/A -- utility function with no visual output.

---

## 4. Interaction Behavior

- Accepts any number of arguments, each being a `string`, `false`, `null`, or `undefined`.
- Filters out all falsy values (`false`, `null`, `undefined`, and empty strings that are falsy).
- Joins remaining truthy strings with a single space character.
- Returns an empty string (`''`) when called with no arguments or only falsy arguments.
- Does NOT deduplicate class names. `cn('a', 'a')` returns `'a a'`.
- Does NOT trim individual input strings. Whitespace within inputs is preserved as-is.
- Preserves the order of inputs in the output.
- Pure function with no side effects. Same inputs always produce the same output.

---

## 5. Accessibility Requirements

N/A -- utility function with no accessibility impact.

---

## 6. Theming Rules

N/A -- utility function with no theming concerns.

---

## 7. Composition Rules

- Can be used in any component or utility that needs to build class name strings.
- Dependencies: None. Zero-dependency pure function.
- Anti-patterns:
  - Do not pass objects or arrays as arguments; only strings and falsy primitives are accepted.
  - Do not rely on `cn` for class name conflict resolution or specificity management.
  - Do not use `cn` as a substitute for Tamagui's `styled()` system for token-based styling.

---

## 8. Performance Constraints

- Negligible cost per call: a single `filter` and `join` on a small array.
- No memoization needed. The function is trivially cheap to call on every render.

---

## 9. Test Requirements

- **Single class**: Verify `cn('foo')` returns `'foo'`.
- **Multiple classes**: Verify `cn('a', 'b', 'c')` returns `'a b c'`.
- **Falsy filtering**: Verify `cn('a', false, 'b', null, 'c', undefined)` returns `'a b c'`.
- **All falsy**: Verify `cn(false, null, undefined)` returns `''`.
- **No arguments**: Verify `cn()` returns `''`.
- **No deduplication**: Verify `cn('a', 'a')` returns `'a a'`.
- **Whitespace preservation**: Verify `cn(' a ', 'b')` returns `' a  b'` (whitespace in inputs is not trimmed).
- **Order preservation**: Verify output order matches input order.
