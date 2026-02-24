> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Textarea

## 1. Purpose

- Renders a multi-line text input with optional label, helper text, and error messaging.
- Use for multi-line free-form text entry (comments, descriptions, messages).
- Do NOT use for single-line input — use Input instead.

---

## 2. UX Intent

- **Primary interaction goal:** Enter and edit multi-line text.
- **Expected user mental model:** A resizable text box with a label above and optional helper/error text below.
- **UX laws applied:**
  - **Fitts's Law** — full-width input area; adequate height via `rows` prop.
  - **Peak-End Rule** — clear error states with visible error messages.
  - **Tesler's Law** — label/error/helper text management handled internally.

---

## 3. Anatomy

- **Textarea** — Single-component API containing:
  - Label text (when `label` prop provided).
  - Tamagui TextArea (extended with error variant).
  - Helper text or error message below the input.

Uses `useId` for accessibility linking between label, input, and description.

> **TypeScript is the source of truth for props.** See `TextareaProps` in `Textarea.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — Default border, placeholder visible when empty.
- **Focus** — Border color change; focus ring visible.
- **Error** — Red border (`$red8`); error message displayed below.
- **Disabled** — Reduced opacity; no interaction.
- **Filled** — User-entered text visible; placeholder hidden.

### Keyboard Interaction

- **Tab** — Moves focus to/from textarea.
- Standard multi-line text editing (Enter for newline, arrow keys for cursor movement).
- Native `<textarea>` behavior.

### Motion

- No animations.

---

## 5. Accessibility

- **Semantic element:** Tamagui TextArea renders a native `<textarea>`.
- **ARIA attributes:** `aria-invalid="true"` when `error` prop is true; `aria-describedby` links to helper/error text; `aria-label` falls back to `placeholder` when no label provided.
- **Focus management:** Standard focusable input.
- **Screen reader announcements:** Label announced on focus; error message announced via `aria-describedby` linkage.

---

## 6. Styling

- **Design tokens used:** Size variant controls padding, font size, and border radius (`sm`/`md`/`lg`). `$borderColor` for default border; `$red8` for error border; `$colorSubtitle` for helper text; `$red10` for error text. `$body` font family.
- **Responsive behavior:** Full-width by default; `rows` prop controls initial height.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Forms, settings panels, comment sections.
- **What this component can contain:** No children (text content via `value`/`defaultValue`).
- **Anti-patterns:** Do not use without either a `label` prop or an external `<label>` with matching `htmlFor`. Do not use `maxLength` without visual feedback (character count).

---

## 8. Breaking Change Criteria

- Removing `label`, `error`, `errorMessage`, `helperText`, `size`, or `rows` props.
- Changing the rendered element from `<textarea>`.
- Removing `aria-invalid` or `aria-describedby` in error state.
- Changing the accessibility ID linking strategy.

---

## 9. Test Requirements

- **Behavioral tests:** Text entry and `onChangeText` callback; label rendering; error state shows error message; helper text shows when no error; `maxLength` constraint; disabled prevents input.
- **Accessibility tests:** `aria-invalid` set on error; `aria-describedby` links to helper/error text; label associated via `htmlFor`/`id`.
- **Visual regression:** Default, focused, error, disabled, with helper text, each size variant.
