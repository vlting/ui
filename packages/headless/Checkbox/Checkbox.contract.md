# Component Contract -- Checkbox (Headless)

## 1. Public API

### Context

`CheckboxContext` provides `{ checked, onCheckedChange, disabled }` to compound children.

Calling `useCheckboxContext()` outside of `Checkbox.Root` throws:
`"Checkbox compound components must be used within Checkbox.Root"`

### Checkbox.Root

Renders a `<button>` element. When `name` is provided, also renders a hidden `<input type="checkbox">` for form submission.

#### Props (`CheckboxRootProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Content rendered inside the button element |
| checked | `boolean \| 'indeterminate'` | No | -- | Controlled checked state. When provided, component is controlled |
| defaultChecked | `boolean` | No | `false` | Initial checked state for uncontrolled usage |
| onCheckedChange | `(checked: boolean \| 'indeterminate') => void` | No | -- | Called when checked state changes (both controlled and uncontrolled) |
| disabled | `boolean` | No | `false` | Prevents state changes on click/keypress |
| required | `boolean` | No | -- | Sets `aria-required` on the button |
| name | `string` | No | -- | When provided, renders a hidden native checkbox input for form submission |
| value | `string` | No | `'on'` | Value of the hidden native checkbox input |
| className | `string` | No | -- | Passed through to the button element |

Additional props are spread onto the `<button>` element via rest props.

### Checkbox.Indicator

Renders a `<span>` element only when checked is `true` or `'indeterminate'`. Returns `null` when unchecked.

#### Props (`CheckboxIndicatorProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | No | -- | Visual indicator content (e.g., a checkmark icon) |
| className | `string` | No | -- | Passed through to the span element |

Additional props are spread onto the `<span>` element via rest props.

---

## 2. Behavioral Guarantees

- Supports controlled mode (via `checked` prop) and uncontrolled mode (via `defaultChecked` prop) using `useControllableState`.
- Click toggles between `true` and `false`. An `'indeterminate'` state can only be set via the controlled `checked` prop; clicking an indeterminate checkbox transitions it to `true`.
- When `disabled` is `true`, click and keyboard handlers are no-ops; the native `disabled` attribute is set on the button.
- When `name` is provided, a hidden `<input type="checkbox">` is rendered with `aria-hidden`, `tabIndex={-1}`, and zero-dimension styling. This input's `checked` is `true` only when the state is exactly `true` (not `'indeterminate'`).
- `onCheckedChange` is called for every state change regardless of controlled/uncontrolled mode.
- `Checkbox.Indicator` renders nothing when the state is `false`/`undefined`; renders a `<span>` when `true` or `'indeterminate'`.
- This component will never fetch data, manage global state, or contain business logic.

---

## 3. Accessibility Guarantees

### Keyboard support
- **Space**: Toggles checked state (default click behavior via `<button>` plus explicit `onKeyDown` handler that calls `preventDefault` then toggles).

### Screen reader support
- Root renders as `<button type="button" role="checkbox">`.
- `aria-checked` is set to `true`, `false`, or `'mixed'` (for indeterminate).
- `aria-required` is set when `required` is `true`.

### Data attributes
- `data-state`: `'checked'` | `'unchecked'` | `'indeterminate'` on Root.
- `data-disabled`: present (value `true`) when disabled, absent otherwise.
- `data-state`: `'checked'` | `'indeterminate'` on Indicator (only rendered when visible).

---

## 4. Styling Guarantees

- Headless component: renders plain HTML (`<button>`, `<span>`, `<input>`).
- No design tokens, no built-in styles (except the hidden input's positioning styles for zero-dimension rendering).
- No theme dependency. Consumers style via `className`, rest props, or `data-state`/`data-disabled` attribute selectors.
- No responsive behavior built in; layout is the consumer's responsibility.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing any prop from `CheckboxRootProps` or `CheckboxIndicatorProps`.
- Changing the type of `checked` (e.g., removing `'indeterminate'` support).
- Changing `onCheckedChange` callback signature.
- Changing the rendered element type (e.g., `<button>` to `<div>`).
- Changing the `role="checkbox"` or `aria-checked` behavior.
- Changing `data-state` value semantics or attribute names.
- Removing the hidden `<input>` form submission behavior when `name` is provided.
- Changing the Indicator rendering condition (e.g., rendering when unchecked).
- Changing the context error message or removing the context boundary check.
