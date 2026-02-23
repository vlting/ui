# Component Contract -- Dialog

## 1. Public API

Compound component exported as a plain object `{ Root, Trigger, Overlay, Content, Title, Description, Close }`. Built on `@tamagui/dialog` which provides portal rendering, focus management, and ARIA semantics. Visual styling is applied via our custom wrapper functions and styled components.

### Dialog.Root

Wraps `@tamagui/dialog` `Dialog` component.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Child components (Trigger, Overlay, Content, etc.). |
| open | `boolean` | No | -- | Controlled open state. |
| defaultOpen | `boolean` | No | `false` | Uncontrolled initial open state. |
| onOpenChange | `(open: boolean) => void` | No | -- | Callback when open state changes. |

Supports both controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) patterns via Tamagui's `useControllableState`.

### Dialog.Trigger

Wraps `@tamagui/dialog` `Dialog.Trigger`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Content rendered inside the trigger. |

### Dialog.Overlay

Styled wrapper around `@tamagui/dialog` `Dialog.Overlay`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | No | -- | Content rendered inside the overlay (typically `Dialog.Content`). |

The overlay renders only when open. Styled with `rgba(0,0,0,0.5)` background, `animation: 'medium'`, and enter/exit opacity transitions. Clicking the overlay closes the dialog.

### Dialog.Content

Styled wrapper around `@tamagui/dialog` `Dialog.Content`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Dialog body content. |
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Controls `maxWidth` and `padding`. `sm` = 400/`$4`, `md` = 500/`$5`, `lg` = 640/`$6`. |

Base styles: `backgroundColor: '$background'`, `borderRadius: '$6'`, `width: '90%'`, `maxHeight: '85%'`, `gap: '$3'`, `animation: 'medium'`. Enter/exit transitions: `opacity: 0, scale: 0.95`.

### Dialog.Title

Styled wrapper around `@tamagui/dialog` `Dialog.Title`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Title text content. |

Styles: `fontFamily: '$heading'`, `fontWeight: '$4'`, `fontSize: '$6'`, `color: '$color'`.

### Dialog.Description

Styled wrapper around `@tamagui/dialog` `Dialog.Description`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Description text content. |

Styles: `fontFamily: '$body'`, `fontSize: '$4'`, `color: '$colorSubtitle'`.

### Dialog.Close

Wraps `@tamagui/dialog` `Dialog.Close`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Content rendered inside the close trigger. |

---

## 2. Behavioral Guarantees

- All state management and interaction logic is delegated to `@tamagui/dialog`.
- The styled layer adds only visual presentation (Tamagui styled components) and never manages open/close state itself.
- `Dialog.Root` supports both controlled and uncontrolled open state via `useControllableState`.
- Clicking the overlay closes the dialog.
- Pressing Escape closes the dialog.
- Focus is trapped inside the dialog content when open (via `@tamagui/focus-scope`).
- Focus is restored to the trigger element when the dialog closes.
- Overlay and Content render `null` when the dialog is closed.
- The component will never prevent closing or manage routing.

---

## 3. Accessibility Guarantees

- The content element renders with `role="dialog"` and `aria-modal` (provided by `@tamagui/dialog`).
- `aria-labelledby` links to the Title element's ID.
- `aria-describedby` links to the Description element's ID.
- Focus is trapped within the dialog content when open.
- Focus returns to the trigger element on close.
- Escape key closes the dialog.
- IDs for content, title, and description are auto-generated via `React.useId()`.

---

## 4. Styling Guarantees

- All color, spacing, and radius values use Tamagui design tokens.
- Content border radius uses `$6` token.
- Typography uses `$heading` and `$body` font family tokens.
- Enter/exit animations use Tamagui `animation: 'medium'` with opacity and scale transitions.
- Overlay uses a fixed `rgba(0,0,0,0.5)` background with opacity transition.
- Content is centered within the overlay via flexbox (`alignItems: 'center'`, `justifyContent: 'center'`).
- Content is constrained to `90%` width and `85%` max height.
- Theme tokens (`$background`, `$color`, `$colorSubtitle`) resolve from the active Tamagui theme.

---

## 5. Breaking Change Criteria

- Removing any sub-component (`Root`, `Trigger`, `Overlay`, `Content`, `Title`, `Description`, `Close`).
- Removing the `open`/`defaultOpen`/`onOpenChange` controlled/uncontrolled API on Root.
- Removing the `size` variant from Content.
- Removing focus trapping, focus restoration, or Escape-to-close behavior.
- Removing `role="dialog"`, `aria-modal`, `aria-labelledby`, or `aria-describedby` from the content element.
