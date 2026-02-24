> **Note**: This is a non-visual utility. The [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md) baseline applies only to components that produce rendered output.

# Component Contract -- cn

## 1. Public API

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `...classes` | `(string \| false \| null \| undefined)[]` | No (rest parameter) | Any number of class name strings or falsy values. Falsy values (`false`, `null`, `undefined`) are filtered out. |

### Return Value

| Type | Description |
|------|-------------|
| `string` | A single space-joined string of all truthy class names. Returns `''` (empty string) if no truthy values are provided. |

---

## 2. Behavioral Guarantees

- **Falsy filtering**: All `false`, `null`, and `undefined` values are removed via `Array.prototype.filter(Boolean)`.
- **Space-joined output**: Truthy class name strings are joined with a single space character.
- **Empty string for no input**: When called with no arguments or only falsy arguments, returns an empty string (`''`).
- **No deduplication**: Duplicate class names are NOT removed. If the same string is passed twice, it appears twice in the output.
- **No trimming**: Individual class name strings are not trimmed. Leading/trailing whitespace in input strings is preserved.
- **Order preservation**: Class names appear in the output in the same order they are provided.
- **Pure function**: No side effects. Same inputs always produce the same output.

---

## 3. Accessibility Guarantees

N/A -- utility function with no direct accessibility impact.

---

## 4. Styling Guarantees

N/A -- this is a utility function with no styling concerns. It produces class name strings but does not define or apply any styles.

---

## 5. Breaking Change Criteria

- Changing the accepted parameter types (e.g., adding `number` support or removing `false`).
- Changing the return type from `string`.
- Changing the joining separator from a single space.
- Adding deduplication behavior (would change output for inputs with repeated class names).
- Adding trimming behavior (would change output for inputs with whitespace).
- Changing the filtering logic (currently `filter(Boolean)`).
