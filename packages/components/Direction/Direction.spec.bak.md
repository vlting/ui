# Component Spec — Direction

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- RTL/LTR context provider for internationalization support
- When to use: Wrapping an app or sub-tree that needs direction-aware layout (e.g., Arabic, Hebrew content)
- When NOT to use: If the entire app is always LTR and never needs to support RTL languages

---

## 2. UX Intent

- **Primary interaction goal:** Provide direction context so descendant components can adapt layout and alignment for RTL or LTR text
- **Expected user mental model:** A context boundary that tells child components which direction text flows
- **UX laws applied:**
  - **Jakob's Law** — follows the standard web `dir` attribute pattern that developers already know from HTML

---

## 3. Anatomy

- `DirectionProvider` — context wrapper, accepts `dir?: 'ltr' | 'rtl'` and `children`
- `useDirection()` — hook returning current direction string

> **TypeScript is the source of truth for props.** See `DirectionProviderProps` in `Direction.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

This is a stateless context provider — no visual states apply.

### Keyboard Interaction

N/A — no interactive elements rendered.

### Motion

N/A — no visual output.

---

## 5. Accessibility

- **Semantic element:** Does not render any DOM elements itself — wraps children in a React context provider only
- **ARIA attributes:** None — children handle their own direction-related accessibility (e.g., `dir` attribute on elements)
- **Focus management:** N/A
- **Screen reader announcements:** N/A
- **Contrast:** N/A

---

## 6. Styling

- No visual output — pure context provider
- **Design tokens used:** None
- **Responsive behavior:** N/A
- **Reduced motion:** N/A
- **Dark mode:** N/A

---

## 7. Composition

- **What can contain this component:** App root, layout wrappers, or any sub-tree needing direction context
- **What this component can contain:** Any React children
- **Anti-patterns:** Nesting multiple `DirectionProvider`s unnecessarily — innermost wins, which may be confusing

---

## 8. Breaking Change Criteria

- Changing the context default value from `'ltr'`
- Removing `useDirection` hook
- Changing the `dir` prop type from `'ltr' | 'rtl'`
- Removing `Direction.Provider` compound export

---

## 9. Test Requirements

- **Behavioral tests:**
  - Default direction is `'ltr'`
  - Controlled direction via `dir` prop overrides default
  - Hook returns correct value inside provider
  - Hook returns fallback `'ltr'` outside provider
  - `Direction.Provider` compound pattern works identically to `DirectionProvider`
- **Accessibility tests:** N/A (no DOM output)
- **Visual regression:** N/A (no visual output)
