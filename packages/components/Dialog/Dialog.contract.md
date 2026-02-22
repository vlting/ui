# Component Contract -- Dialog

## 1. Public API

Compound component exported as a plain object `{ Root, Trigger, Overlay, Content, Title, Description, Close }`. Each sub-component wraps its corresponding headless primitive from `packages/headless/Dialog` with Tamagui styled visuals.

### Dialog.Root

Delegates entirely to `HeadlessDialog.Root`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Child components (Trigger, Overlay, Content, etc.). |
| open | `boolean` | No | -- | Controlled open state. |
| defaultOpen | `boolean` | No | `false` | Uncontrolled initial open state. |
| onOpenChange | `(open: boolean) => void` | No | -- | Callback when open state changes. |

Supports both controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) patterns via `useControllableState` in the headless layer.

### Dialog.Trigger

Delegates to `HeadlessDialog.Trigger`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactElement` | Yes | -- | A single React element. Gets cloned with `onClick` and `aria-haspopup="dialog"` injected. |
| asChild | `boolean` | No | -- | Declared in type but not currently used in implementation. |

### Dialog.Overlay

Styled wrapper around `HeadlessDialog.Overlay`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | No | -- | Content rendered inside the overlay (typically `Dialog.Content`). |

The headless overlay renders only when open. The styled layer adds a `StyledOverlay` with `rgba(0,0,0,0.5)` background, `animation: 'medium'`, and enter/exit opacity transitions. Clicking the overlay closes the dialog (handled in headless layer).

### Dialog.Content

Styled wrapper around `HeadlessDialog.Content`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Dialog body content. |
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Controls `maxWidth` and `padding`. `sm` = 400/`$4`, `md` = 500/`$5`, `lg` = 640/`$6`. |
| onEscapeKeyDown | `() => void` | No | -- | Callback fired when Escape is pressed, before the dialog closes. |

Base styles: `backgroundColor: '$background'`, `borderRadius: '$6'`, `width: '90%'`, `maxHeight: '85%'`, `gap: '$3'`, `animation: 'medium'`. Enter/exit transitions: `opacity: 0, scale: 0.95`.

### Dialog.Title

Styled wrapper around `HeadlessDialog.Title`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Title text content. |

Styles: `fontFamily: '$heading'`, `fontWeight: '$4'`, `fontSize: '$6'`, `color: '$color'`.

### Dialog.Description

Styled wrapper around `HeadlessDialog.Description`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Description text content. |

Styles: `fontFamily: '$body'`, `fontSize: '$4'`, `color: '$colorSubtitle'`.

### Dialog.Close

Delegates entirely to `HeadlessDialog.Close`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactElement` | Yes | -- | A single React element. Gets cloned with `onClick` handler to close the dialog. |

---

## 2. Behavioral Guarantees

- All state management and interaction logic is delegated to the headless layer (`packages/headless/Dialog`).
- The styled layer adds only visual presentation (Tamagui styled components) and never manages open/close state itself.
- `Dialog.Root` supports both controlled and uncontrolled open state via `useControllableState`.
- `Dialog.Trigger` clones its child element, injecting `onClick` (to open) and `aria-haspopup="dialog"`.
- `Dialog.Close` clones its child element, injecting `onClick` (to close).
- Clicking the overlay closes the dialog (via headless `Overlay` `onClick`).
- Pressing Escape closes the dialog (via headless `Content` keydown listener). The `onEscapeKeyDown` callback fires first.
- Focus is trapped inside the dialog content when open (via `useFocusTrap` in the headless layer).
- Focus is restored to the trigger element when the dialog closes.
- Overlay and Content render `null` when the dialog is closed.
- The component will never prevent closing or manage routing.

---

## 3. Accessibility Guarantees

- The headless content element renders with `role="dialog"` and `aria-modal`.
- `aria-labelledby` links to the Title element's ID.
- `aria-describedby` links to the Description element's ID.
- Trigger receives `aria-haspopup="dialog"`.
- Focus is trapped within the dialog content when open.
- Focus returns to the trigger element on close.
- Escape key closes the dialog.
- Overlay is marked `aria-hidden`.
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
- Removing the `onEscapeKeyDown` prop from Content.
- Changing Trigger or Close from clone-element pattern to a different composition model.
- Removing focus trapping, focus restoration, or Escape-to-close behavior.
- Removing `role="dialog"`, `aria-modal`, `aria-labelledby`, or `aria-describedby` from the content element.
- Changing the headless layer delegation (e.g., inlining state management into the styled layer).
