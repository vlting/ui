# Spec — useDisclosure

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Manages open/close state for disclosure patterns: accordions, collapsibles, dropdowns, popovers.
- Supports controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) modes.
- Returns prop-getters (`getToggleProps`, `getContentProps`) that wire ARIA attributes automatically.
- Do NOT use for state that isn't binary open/close. Do NOT use for modal dialogs (use a dedicated dialog hook).

---

## 2. UX Intent

Infrastructure hook enabling the WAI-ARIA disclosure pattern. Ensures toggles and content panels are correctly linked via `aria-expanded` and `aria-controls`.

---

## 4. Behavior

- When `open` is provided, the hook operates in **controlled mode**: `isOpen` always reflects `open`, and state changes only fire `onOpenChange`.
- When `open` is `undefined`, the hook operates in **uncontrolled mode**: `isOpen` reflects internal state, toggled by `onOpen`, `onClose`, `onToggle`.
- `getToggleProps()` returns `{ onClick, 'aria-expanded': boolean, 'aria-controls': string }`.
- `getContentProps()` returns `{ hidden: boolean, id: string }`. The `id` is generated via `useId()` and matches `aria-controls`.
- `onOpenChange` is called in both modes whenever open state changes.

> **TypeScript is the source of truth for the API.** See `useDisclosure.ts` for the full typed signature.

---

## 5. Accessibility

- **`aria-expanded`** on the toggle reflects current open state (WCAG 4.1.2 — Name, Role, Value).
- **`aria-controls`** on the toggle links to the content element's `id`, establishing a programmatic relationship.
- **`hidden`** attribute on content ensures assistive technology skips collapsed content.
- Follows the WAI-ARIA [Disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

---

## 7. Composition

- Intended for use inside components that need show/hide behavior: Accordion, Collapsible, Dropdown, Popover.
- Dependencies: React (`useState`, `useCallback`, `useId`). No external dependencies.
- **Tech debt:** Should compose `useControllableState` for controlled/uncontrolled logic instead of hand-rolling.
- **Anti-patterns:** Do not switch between controlled and uncontrolled mid-lifecycle.

---

## 8. Breaking Change Criteria

- Changing `getToggleProps` or `getContentProps` return shapes.
- Removing `aria-expanded` or `aria-controls` from toggle props.
- Changing `onOpenChange` invocation behavior.
- Removing `onOpen`, `onClose`, or `onToggle` from the return.

---

## 9. Test Requirements

- **Uncontrolled mode:** Default closed, opens on click, closes on click, onOpenChange called.
- **Controlled mode:** Follows `open` prop, onOpenChange called but internal state doesn't change.
- **Actions:** `onOpen`, `onClose`, `onToggle` work correctly.
- **Accessibility:** `aria-expanded` reflects state, `aria-controls` links to content `id`, content has `hidden` attribute, ID is consistent across renders.
- **Prop-getters:** `getToggleProps` returns correct shape, `getContentProps` returns correct shape.
