> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../../FRONTEND_QUALITY.contract.md).

# Component Contract -- Input

## 1. Public API

### Input (Root Function)

Function component that composes `InputFrame`, `InputField`, `InputLabel`, `InputHelper`, and `SlotFrame` into a vertical layout (`YStack`).

#### Props (InputProps)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Controls height, padding, and font size across frame, field, and label. |
| placeholder | `string` | No | -- | Placeholder text for the input field. |
| value | `string` | No | -- | Controlled input value. |
| defaultValue | `string` | No | -- | Uncontrolled initial input value. |
| onChangeText | `(text: string) => void` | No | -- | Callback with the new text value. Wired via the native `onChange` event's `nativeEvent.text`. |
| label | `string` | No | -- | Label text rendered above the input. Also used as `aria-label` on the field. |
| helperText | `string` | No | -- | Helper text rendered below the input. Overridden by `errorMessage` when `error` is `true`. |
| error | `boolean` | No | -- | When `true`, applies error border color (`$red10`) and sets `aria-invalid` on the field. |
| errorMessage | `string` | No | -- | Error message displayed below the input when `error` is `true`. Takes precedence over `helperText`. |
| disabled | `boolean` | No | -- | When `true`, sets opacity to 0.5, `cursor: not-allowed`, `pointerEvents: none`, and passes `disabled` to the field. |
| leadingSlot | `React.ReactNode` | No | -- | Content rendered before the input field (e.g., icon). Wrapped in a `SlotFrame`. |
| trailingSlot | `React.ReactNode` | No | -- | Content rendered after the input field (e.g., icon or button). Wrapped in a `SlotFrame`. |

Supports both controlled (`value` + `onChangeText`) and uncontrolled (`defaultValue`) patterns.

### Input.Frame

`styled(XStack)` -- the outer input container. Exposed as a static property.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Height and horizontal padding. `sm` = `$3.5`/`$2`, `md` = `$4`/`$3`, `lg` = `$4.5`/`$4`. |
| error | `boolean` | No | -- | When `true`, sets `borderColor: '$red10'`. |
| disabled | `boolean` | No | -- | When `true`, sets opacity 0.5, not-allowed cursor, no pointer events. |

Base styles: `borderWidth: 1`, `borderColor: '$borderColor'`, `borderRadius: '$4'`, `backgroundColor: '$background'`, `gap: '$2'`. Focus-within style applies `borderColor: '$borderColorFocus'` with a 2px outline.

Also accepts all Tamagui `XStack` style props.

### Input.Field

`styled(View, { tag: 'input' })` -- the actual `<input>` element. Exposed as a static property.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Font size. `sm` = `$2`, `md` = `$4`, `lg` = `$5`. |

Base styles: `flex: 1`, `fontFamily: '$body'`, `color: '$color'`, `backgroundColor: 'transparent'`, `borderWidth: 0`, `outlineWidth: 0`. Renders as an HTML `<input>` element via `tag: 'input'`.

Also accepts all Tamagui `View` style props.

### Input.Label

`styled(Text)` -- label text above the input. Exposed as a static property.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Font size. `sm` = `$2`, `md` = `$3`, `lg` = `$4`. |

Base styles: `fontFamily: '$body'`, `fontWeight: '$3'`, `color: '$color'`, `marginBottom: '$1'`.

Also accepts all Tamagui `Text` style props.

### Input.Helper

`styled(Text)` -- helper/error text below the input. Exposed as a static property.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| tone | `'neutral' \| 'error'` | No | `'neutral'` | Text color. `neutral` = `$colorSubtitle`, `error` = `$red10`. |

Base styles: `fontFamily: '$body'`, `fontSize: '$2'`, `marginTop: '$1'`.

Also accepts all Tamagui `Text` style props.

---

## 2. Behavioral Guarantees

- The composed `Input` function renders a vertical stack: optional Label, then Frame (with optional leading slot, field, optional trailing slot), then optional Helper.
- Helper text display logic: if `error` is `true` and `errorMessage` is provided, `errorMessage` is shown; otherwise `helperText` is shown. If neither applies, no helper is rendered.
- The `onChangeText` callback receives the text string extracted from `e.nativeEvent.text`, not the raw event.
- `leadingSlot` and `trailingSlot` only render their `SlotFrame` wrappers when the slot content is provided.
- The component does not manage focus state or validate input -- it is a presentational wrapper.
- Label is only rendered when the `label` prop is provided.
- Disabled state applies at both the frame level (visual) and the field level (native `disabled` attribute).
- The component will never auto-focus, submit forms, or manage cursor position.

---

## 3. Accessibility Guarantees

- `aria-invalid` is set on the input field when `error` is `true`; otherwise omitted.
- `aria-label` is set on the input field to the `label` string value.
- The `focusWithinStyle` on the frame provides a visible focus indicator (outline) when the input field is focused.
- The input renders as a native `<input>` HTML element via `tag: 'input'`, inheriting standard input accessibility.
- No explicit `<label>` element with `htmlFor` is used -- the label is a styled Text with `aria-label` on the field as the accessible name.

---

## 4. Styling Guarantees

- All spacing, sizing, border, and color values use Tamagui design tokens.
- `borderRadius` uses `$4` token on the frame.
- Typography uses `$body` font family token throughout.
- Error state uses `$red10` token for both border color and helper text.
- Focus-within applies `$borderColorFocus` border and `$outlineColor` outline.
- Theme tokens (`$background`, `$borderColor`, `$color`, `$colorSubtitle`) resolve from the active Tamagui theme.
- All sub-components accept Tamagui style props for override.
- Responsive styles can be applied via Tamagui media query props.

---

## 5. Breaking Change Criteria

- Removing any prop from `InputProps`.
- Removing any static sub-component (`Input.Frame`, `Input.Field`, `Input.Label`, `Input.Helper`).
- Changing the `onChangeText` callback signature (currently `(text: string) => void`).
- Changing the helper text precedence logic (errorMessage over helperText when error is true).
- Removing `aria-invalid` or `aria-label` from the field.
- Changing `Input.Field` from `tag: 'input'` to a different element type.
- Removing the `focusWithinStyle` focus indicator.
- Removing slot support (`leadingSlot`, `trailingSlot`).
- Changing the variant value sets or default values.
