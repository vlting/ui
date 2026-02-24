# Component Spec — Input

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Provides a styled text input field with optional label, helper text, error messaging, and leading/trailing slots for icons or actions.
- Should be used for single-line text entry in forms: names, emails, search queries, passwords (with appropriate type), and any standard text input need.
- Should NOT be used for multi-line text entry (use a textarea component), for selection from predefined options (use a select or combobox), or for complex rich-text editing.

---

## 2. UX Intent

- **Primary interaction goal:** Allow the user to type text into a clearly delineated field with immediate feedback on focus, error, and helper context.
- **Expected user mental model:** "I click/tap the field, type my input, and see feedback if something is wrong." The input should look and behave like every text field the user has encountered (Jakob's Law).
- **UX laws applied:**
  - **Jakob's Law** — Input must follow standard form field conventions: border, focus ring, label above, helper/error below.
  - **Gestalt Principles (Proximity)** — Label, field, and helper text are stacked vertically with tight spacing to communicate they belong to the same group.
  - **Fitts's Law** — Three size variants (`sm`, `md`, `lg`) ensure adequate target height. The `lg` variant should be preferred for touch-first contexts.
  - **Tesler's Law** — The component absorbs the complexity of label-to-field association, error/helper text switching, and slot layout so the consumer provides simple props.
  - **Doherty Threshold** — Focus ring must appear instantly on focus. Error state changes must be immediate.

---

## 3. Anatomy

Input is a function component that composes styled sub-components into a vertical layout (`YStack`). Sub-components are also exposed as static properties for custom composition.

- **Input (root function)** — Composes Label, Frame (with optional leading/trailing slots and Field), and Helper into a vertical stack. Handles controlled/uncontrolled value, error/helper text logic, and ARIA wiring.
- **Input.Frame** — A `styled(TamaguiInput)` that extends `@tamagui/input` with `error` and `fieldSize` variants. Provides `focusVisibleStyle` with a 2px outline ring (`$color10`). The `error` variant applies `$red10` border color. The `fieldSize` variant controls border radius and padding per size.
- **Input.Label** — A `styled(Text)` rendered inside a native `<label>` element (with `htmlFor` linking to the input's `useId()`). Uses `$body` font family, `$3` weight, `$1` bottom margin, and size-responsive font sizes.
- **Input.Helper** — A `styled(Text)` for helper or error text below the input. Has a `tone` variant: `neutral` uses `$colorSubtitle`, `error` uses `$red10`. Renders only when display content is available.

When `leadingSlot` or `trailingSlot` is provided, the input field is wrapped in an `XStack` with `SlotFrame` wrappers for each slot.

Helper text display logic: if `error` is `true` and `errorMessage` is provided, `errorMessage` is shown in error tone; otherwise `helperText` is shown in neutral tone. If neither applies, no helper is rendered.

> **TypeScript is the source of truth for props.** See `InputProps` in `Input.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Idle** — Field shows theme-default border and background. Field is editable.
- **Focus** — Field shows `focusVisibleStyle`: 2px solid outline with `$color10` color and 1px offset.
- **Error** — Field border changes to `$red10` (via `error` variant). Helper text displays `errorMessage` in `$red10` color. `aria-invalid` is set on the field.
- **Disabled** — Passed as `disabled` prop to the underlying `@tamagui/input`, which handles native disabled behavior. No interaction possible.
- **Hover** — Handled by the underlying Tamagui Input component's built-in hover styles.
- **Loading** — Not applicable. Input does not have a loading state.

### Keyboard Interaction

- Standard native input keyboard behavior. The field renders as an HTML `<input>` element (via `@tamagui/input`), inheriting all platform keyboard interactions (typing, selection, copy/paste).

### Motion

- No animations are defined on the input. Focus styling changes are instant via CSS pseudo-states.

---

## 5. Accessibility

- **Semantic element:** Renders a native `<input>` HTML element via `@tamagui/input`. A native `<label>` element is rendered with `htmlFor` pointing to the input's auto-generated ID (`useId()`).
- **ARIA attributes:**
  - `aria-invalid` is set on the field when `error` is `true`; omitted otherwise.
  - `aria-describedby` links the field to the helper text element when helper text is displayed (via auto-generated ID).
  - `aria-label` is set on the field to the `placeholder` value as a fallback when no `label` prop is provided.
- **Focus management:** The `focusVisibleStyle` on the field provides a visible focus indicator (outline ring) when the field is focused. The field itself is focusable via native `<input>` behavior.
- **Screen reader announcements:** The label is associated via the native `<label htmlFor>` pattern. Error and helper text are associated via `aria-describedby`.
- **Contrast:** Input text (`$color`) must meet WCAG 2.1 AA contrast against the input background. Error text (`$red10`) must meet AA contrast against the page background. Label and helper text must meet AA contrast ratios.

---

## 6. Styling

- **Design tokens used:**
  - Colors: `$borderColor`, `$color10` (focus outline), `$red10` (error), `$color`, `$colorSubtitle` (helper text), `$background`.
  - Font: `$body` family throughout, `$3` weight for label.
  - Sizes map to Tamagui size tokens: `sm`=`$3`, `md`=`$4`, `lg`=`$5`.
  - Field size variant controls border radius (`$3`/`$4`/`$5`) and padding per size.
  - Spacing: `$1` margin for label-to-field and field-to-helper gaps, `$2` gap between slots.
- **Responsive behavior:** Accepts Tamagui media query props on sub-components. The input fills its parent width by default (field uses `flex: 1`). Consumers control responsive layout via parent containers.
- **Reduced motion:** Not applicable -- no animations are used.
- **Dark mode:** All visual tokens must resolve correctly in both light and dark themes. The input border, background, text, placeholder, error, and helper colors must remain legible in both modes. No hardcoded values are used.

---

## 7. Composition

- **What can contain this component:** Any layout primitive (YStack, XStack). Form containers. Field group wrappers.
- **What this component can contain:** The composed `Input` function manages its own internal structure. `leadingSlot` and `trailingSlot` accept arbitrary `ReactNode` (typically icons or small action buttons). Sub-components (`Input.Frame`, `Input.Label`, `Input.Helper`) are also exposed for custom composition.
- **Anti-patterns:**
  - Do not place interactive elements in slots that compete with the input's focus (e.g., a button that steals focus without `tabIndex` management).
  - Do not omit the `label` prop without providing an alternative accessible name.
  - Do not use `errorMessage` without setting `error` to `true` (the message will not display).
  - Do not nest inputs inside other inputs.

---

## 8. Breaking Change Criteria

- Removing any prop from `InputProps`.
- Removing any static sub-component (`Input.Frame`, `Input.Label`, `Input.Helper`).
- Changing the `onChangeText` callback signature (currently `(text: string) => void`).
- Changing the helper text precedence logic (errorMessage over helperText when error is true).
- Removing `aria-invalid` or `aria-describedby` from the field.
- Changing the underlying element from `<input>` to a different element type.
- Removing the `focusVisibleStyle` focus indicator.
- Removing slot support (`leadingSlot`, `trailingSlot`).
- Changing the variant value sets or default values.

---

## 9. Test Requirements

- **Behavioral tests:**
  - Renders the input field with correct base styles.
  - Label renders when `label` prop is provided; omitted otherwise.
  - Native `<label>` element has correct `htmlFor` attribute.
  - Helper text renders `helperText` when no error.
  - Helper text renders `errorMessage` when `error` is `true` and `errorMessage` is provided.
  - Error state applies `$red10` border and error-toned helper text.
  - Disabled state passes `disabled` to the native input.
  - Each size variant (`sm`, `md`, `lg`) renders correctly.
  - Leading and trailing slots render when provided; omitted otherwise.
  - Supports multiple `type` values (`text`, `password`, `email`, `number`, `search`, `tel`, `url`, `date`, `file`).
- **Accessibility tests:**
  - `aria-invalid` is set when `error` is `true`.
  - `aria-describedby` links to helper text when displayed.
  - `aria-label` falls back to `placeholder` when no `label` is provided.
  - Focus outline is visible when the field is focused.
  - The field renders as a native `<input>` element.
- **Visual regression:**
  - Idle, focus, error, and disabled states.
  - Each size variant.
  - With and without leading/trailing slots.
