# Component Contract -- Button

## 1. Public API

### Button (Root)

Compound component created via `withStaticProperties`. The root is a `React.forwardRef` wrapping a `styled(XStack)` frame.

#### Props (ButtonProps)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | No | -- | Content rendered inside the button. Replaced by a `Spinner` when `loading` is `true`. |
| variant | `'solid' \| 'outline' \| 'ghost'` | No | `'solid'` | Visual style variant. `solid` has filled background, `outline` has border only, `ghost` is transparent. |
| tone | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | No | `'neutral'` | Semantic color tone. Mapped via Tamagui variant (currently empty style objects -- expected to be themed). |
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Controls height, padding, and gap. `sm` = `$3.5` height, `md` = `$4`, `lg` = `$4.5`. |
| loading | `boolean` | No | -- | When `true`, replaces children with a `Spinner` and sets `aria-busy`. Also disables the button. |
| disabled | `boolean` | No | -- | When `true`, sets opacity to 0.5, `cursor: not-allowed`, `pointerEvents: none`, and `aria-disabled`. |
| onPress | `() => void` | No | -- | Press/click handler. |

The root also accepts all remaining props from `ButtonFrameProps` (i.e., all Tamagui `XStack` style props) via rest spreading.

Ref forwarding: Accepts a ref to the underlying `ButtonFrame` element (`React.ElementRef<typeof ButtonFrame>`).

### Button.Text

`styled(Text)` sub-component for button label text.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Font size. `sm` = `$2`, `md` = `$4`, `lg` = `$5`. |

Also accepts all Tamagui `Text` style props.

### Button.Icon

`styled(XStack)` sub-component for wrapping icon elements.

No custom variants. Renders with `alignItems: 'center'` and `justifyContent: 'center'`. Accepts all Tamagui `XStack` style props.

---

## 2. Behavioral Guarantees

- When `loading` is `true`, children are replaced with a `<Spinner size="small" />` and the button becomes disabled. Both `loading` and `disabled` contribute to the disabled state via `disabled ?? loading ?? false`.
- When `disabled` is `true` (or derived from `loading`), `pointerEvents` is set to `'none'`, preventing all interaction.
- The component sets `accessibilityRole="button"` on the frame.
- `aria-disabled` is set to `true` only when the button is disabled; otherwise it is `undefined` (omitted).
- `aria-busy` is set to `true` only when `loading` is `true`; otherwise it is `undefined` (omitted).
- Press style applies `opacity: 0.85` and `scale: 0.98` with `animation: 'fast'`.
- Focus style applies a 2px solid outline with `$outlineColor` and 2px offset.
- The component will never manage its own open/closed state or navigation -- it is a stateless presentational button.

---

## 3. Accessibility Guarantees

- Sets `accessibilityRole="button"` on the root frame.
- Sets `aria-disabled` when disabled.
- Sets `aria-busy` when loading.
- Focus style provides a visible outline ring for keyboard navigation.
- No keyboard event handlers are defined at this layer -- keyboard activation (Enter/Space) is expected from the underlying platform `XStack` behavior or consumer code.

---

## 4. Styling Guarantees

- All spacing, sizing, and color values use Tamagui design tokens (`$1`, `$2`, `$3`, etc.).
- `borderRadius` uses `$4` token.
- Font family uses `$body` token; font weight uses `$3` token.
- Variants (`variant`, `tone`, `size`, `disabled`) are defined via Tamagui `variants` and can be overridden by theme.
- All Tamagui style props (margins, padding, colors, etc.) can be passed through and will be applied to the frame.
- Responsive styles can be applied via Tamagui media query props on the root.

---

## 5. Breaking Change Criteria

- Removing any prop from `ButtonProps` (`children`, `variant`, `tone`, `size`, `loading`, `disabled`, `onPress`).
- Removing `Button.Text` or `Button.Icon` static sub-components.
- Changing the variant value sets (e.g., removing `'ghost'` from `variant`).
- Changing default variant values (currently `solid`, `neutral`, `md`).
- Removing `accessibilityRole="button"` or `aria-disabled`/`aria-busy` attributes.
- Changing the loading behavior from replacing children with Spinner to something else.
- Removing ref forwarding support.
- Changing the component from `XStack`-based to a different layout primitive.
