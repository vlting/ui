# Component Spec — Input

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

## 3. Visual Behavior

- **Layout:** Vertical stack (`YStack`) containing optional Label, then Frame (horizontal `XStack` with optional leading slot, field, optional trailing slot), then optional Helper text.
- **Spacing:** Frame height scales with `size` variant (`$3.5`, `$4`, `$4.5`). Internal horizontal padding scales accordingly. Label has `$1` bottom margin. Helper has `$1` top margin. Frame has `$2` gap between slots and field.
- **Typography:** Field uses `$body` font family. Label uses `$body` with `$3` weight. Helper uses `$body` at `$2` font size. Font sizes for field and label scale with `size` variant.
- **Token usage:** All colors, spacing, radii, and fonts resolve from Tamagui design tokens. Border radius is `$4`. Error state uses `$red10` for both border and helper text. No hardcoded color or spacing values.
- **Responsive behavior:** Accepts Tamagui media query props on sub-components. The input fills its parent width by default (field uses `flex: 1`). Consumers control responsive layout via parent containers.

---

## 4. Interaction Behavior

- **States:**
  - **Idle** — Frame shows `$borderColor` border, `$background` fill. Field is editable.
  - **Focus** — Frame shows `$borderColorFocus` border with 2px solid outline (`$outlineColor`). Triggered by `focusWithinStyle`.
  - **Error** — Frame border changes to `$red10`. Helper text displays `errorMessage` in `$red10` color. `aria-invalid` is set on the field.
  - **Disabled** — Frame opacity 0.5, `cursor: not-allowed`, `pointerEvents: none`. Field receives native `disabled` attribute. No interaction possible.
  - **Hover** — No explicit hover style defined at this layer.
  - **Loading** — Not applicable. Input does not have a loading state.
- **Controlled vs uncontrolled:** Supports both. Controlled via `value` + `onChangeText`. Uncontrolled via `defaultValue`. The component does not manage internal value state.
- **Keyboard behavior:** Standard native input keyboard behavior. The field renders as an HTML `<input>` element via `tag: 'input'`, inheriting all platform keyboard interactions (typing, selection, copy/paste).
- **Screen reader behavior:** The field has `aria-label` set to the `label` prop value. `aria-invalid` is set when `error` is `true`. The field renders as a native `<input>`, so screen readers announce it as a text input by default.
- **Motion rules:** No animations are defined on the input. Focus border changes are applied via CSS pseudo-state styles (instant).

### Sub-component behavior

- **Input.Frame** — The outer container. Provides border, background, focus-within styling, and the error/disabled visual variants.
- **Input.Field** — The actual `<input>` element. Renders with `tag: 'input'`, no border, transparent background. Fills available width via `flex: 1`.
- **Input.Label** — Text displayed above the frame. Renders only when `label` prop is provided.
- **Input.Helper** — Text displayed below the frame. Shows `errorMessage` (in error tone) when `error` is `true`, otherwise shows `helperText` (in neutral tone). Renders only when display content is available.

---

## 5. Accessibility Requirements

- **ARIA requirements:**
  - `aria-invalid` must be set on the field when `error` is `true`; omitted otherwise.
  - `aria-label` must be set on the field to the `label` string value, providing the accessible name.
  - The field renders as a native `<input>` element, which provides implicit ARIA semantics.
- **Focus rules:** The `focusWithinStyle` on the frame provides a visible focus indicator (border color change + outline ring) when the field is focused. The field itself is focusable via native `<input>` behavior.
- **Contrast expectations:** Input text (`$color`) must meet WCAG 2.1 AA contrast against the input background (`$background`). Error text (`$red10`) must meet AA contrast against the page background. Label and helper text must meet AA contrast ratios.
- **Reduced motion behavior:** Not applicable — no animations are used.

---

## 6. Theming Rules

- **Required tokens:** `$background`, `$borderColor`, `$borderColorFocus`, `$outlineColor`, `$color`, `$colorSubtitle`, `$red10`, `$body` (font family).
- **Prohibited hardcoded values:** No raw hex colors, pixel spacing, or font sizes. All values must reference tokens.
- **Dark mode expectations:** All visual tokens must resolve correctly in both light and dark themes. The input border, background, text, placeholder, error, and helper colors must remain legible in both modes.

---

## 7. Composition Rules

- **What can wrap it:** Any layout primitive (YStack, XStack). Form containers. Field group wrappers.
- **What it may contain:** The composed `Input` function manages its own internal structure. `leadingSlot` and `trailingSlot` accept arbitrary `ReactNode` (typically icons or small action buttons). Sub-components (`Input.Frame`, `Input.Field`, `Input.Label`, `Input.Helper`) are also exposed for custom composition.
- **Anti-patterns:**
  - Do not place interactive elements in slots that compete with the input's focus (e.g., a button that steals focus without `tabIndex` management).
  - Do not omit the `label` prop without providing an alternative accessible name.
  - Do not use `errorMessage` without setting `error` to `true` (the message will not display).
  - Do not nest inputs inside other inputs.

---

## 8. Performance Constraints

- **Memoization rules:** The `Input` function component does not use `forwardRef` or memoization. For forms with many inputs, consumers should ensure `onChangeText` callbacks are stable (via `useCallback`). The styled sub-components are static Tamagui primitives.
- **Virtualization:** Not applicable for individual inputs. When rendering long forms, consumers should consider form-level virtualization strategies.
- **Render boundaries:** Slot rendering is conditional — `leadingSlot` and `trailingSlot` wrappers are only mounted when content is provided. Label and Helper are similarly conditional. This prevents unnecessary DOM nodes.

---

## 9. Test Requirements

- **What must be tested:**
  - Renders the input field with correct base styles.
  - Label renders when `label` prop is provided; omitted otherwise.
  - Helper text renders `helperText` when no error.
  - Helper text renders `errorMessage` when `error` is `true` and `errorMessage` is provided.
  - Error state applies `$red10` border and error-toned helper text.
  - Disabled state applies opacity, cursor, and pointer-events restrictions.
  - Each size variant (`sm`, `md`, `lg`) renders correctly.
  - Leading and trailing slots render when provided; omitted otherwise.
- **Interaction cases:**
  - `onChangeText` fires with the text value when the user types.
  - Controlled mode (`value` + `onChangeText`) reflects the controlled value.
  - Uncontrolled mode (`defaultValue`) initializes correctly.
  - Disabled input does not accept focus or input.
- **Accessibility checks:**
  - `aria-invalid` is set when `error` is `true`.
  - `aria-label` is set to the `label` value.
  - Focus-within outline is visible when the field is focused.
  - The field renders as a native `<input>` element.
