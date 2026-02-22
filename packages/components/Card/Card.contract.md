# Component Contract -- Card

## 1. Public API

### Card (Root Frame)

`styled(YStack)` compound component created via `withStaticProperties`.

#### Props (CardProps = GetProps\<typeof CardFrame\>)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Controls padding. `sm` = `$2`, `md` = `$0`, `lg` = `$0`. |
| elevated | `boolean` | No | -- | When `true`, removes border (`borderWidth: 0`). Intended for shadow-elevated cards. |
| interactive | `boolean` | No | -- | When `true`, adds `cursor: pointer`, hover/press styles, and `animation: 'fast'`. |

Also accepts all Tamagui `YStack` style props.

Base styles: `backgroundColor: '$background'`, `borderWidth: 1`, `borderColor: '$borderColor'`, `borderRadius: '$4'`, `overflow: 'hidden'`.

### Card.Header

`styled(YStack)` sub-component.

No custom variants. Base styles: `paddingHorizontal: '$4'`, `paddingTop: '$4'`, `paddingBottom: '$2'`, `gap: '$1'`. Accepts all Tamagui `YStack` style props.

### Card.Content

`styled(YStack)` sub-component.

No custom variants. Base styles: `paddingHorizontal: '$4'`, `paddingVertical: '$2'`, `flex: 1`. Accepts all Tamagui `YStack` style props.

### Card.Footer

`styled(YStack)` sub-component.

No custom variants. Base styles: `paddingHorizontal: '$4'`, `paddingTop: '$2'`, `paddingBottom: '$4'`. Accepts all Tamagui `YStack` style props.

### Card.Title

`styled(Text)` sub-component.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Font size. `sm` = `$4`, `md` = `$5`, `lg` = `$6`. |

Base styles: `fontFamily: '$heading'`, `fontWeight: '$4'`. Accepts all Tamagui `Text` style props.

### Card.Description

`styled(Text)` sub-component.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Font size. `sm` = `$2`, `md` = `$3`, `lg` = `$4`. |

Base styles: `fontFamily: '$body'`, `color: '$colorSubtitle'`. Accepts all Tamagui `Text` style props.

---

## 2. Behavioral Guarantees

- Card is a purely presentational layout component. It manages no internal state.
- When `interactive` is `true`, hover triggers `backgroundColor: '$backgroundHover'` and press triggers `backgroundColor: '$backgroundPress'` with `scale: 0.99`.
- When `interactive` is `false` or unset, no hover/press styles are applied and there is no cursor change.
- `overflow: 'hidden'` is always set on the root frame, clipping children to the border radius.
- The component will never handle click events, navigation, or focus management on its own.
- Sub-components (Header, Content, Footer, Title, Description) are independent styled primitives with no behavioral logic.

---

## 3. Accessibility Guarantees

- No ARIA roles are set by default. Card is a generic layout container.
- When `interactive` is `true`, consumers are responsible for adding appropriate roles (e.g., `role="button"` or wrapping in a link) and keyboard handlers.
- No focus management or keyboard navigation is provided.

---

## 4. Styling Guarantees

- All spacing, border, and color values use Tamagui design tokens.
- `borderRadius` uses `$4` token on the root frame.
- Typography sub-components use `$heading` and `$body` font family tokens.
- All Tamagui style props can be passed through to any sub-component.
- Theming is supported: `$background`, `$borderColor`, `$backgroundHover`, `$backgroundPress`, `$colorSubtitle` resolve from the active Tamagui theme.
- Responsive styles can be applied via Tamagui media query props.

---

## 5. Breaking Change Criteria

- Removing any variant (`size`, `elevated`, `interactive`) from the root frame.
- Removing any sub-component (`Card.Header`, `Card.Content`, `Card.Footer`, `Card.Title`, `Card.Description`).
- Changing the variant value sets (e.g., removing `'lg'` from `size`).
- Changing default variant values (currently `size: 'md'`).
- Removing `overflow: 'hidden'` from the root frame.
- Changing the root from `YStack`-based to a different layout primitive.
- Changing the `CardProps` export type.
