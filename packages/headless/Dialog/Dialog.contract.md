# Component Contract -- Dialog (Headless)

## 1. Public API

### Context

`DialogContext` provides:
```ts
{
  open: boolean | undefined
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentId: string      // auto-generated via React.useId()
  titleId: string        // auto-generated via React.useId()
  descriptionId: string  // auto-generated via React.useId()
}
```

Calling `useDialogContext()` outside of `Dialog.Root` throws:
`"Dialog compound components must be used within Dialog.Root"`

### Dialog.Root

Renders no DOM element. Provides context to all compound children.

#### Props (`DialogRootProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Compound children (Trigger, Overlay, Content, etc.) |
| open | `boolean` | No | -- | Controlled open state. When provided, component is controlled |
| defaultOpen | `boolean` | No | `false` | Initial open state for uncontrolled usage |
| onOpenChange | `(open: boolean) => void` | No | -- | Called when open state changes (both controlled and uncontrolled) |

### Dialog.Trigger

Renders no wrapper element. Clones its single child element, injecting `ref`, `onClick`, and `aria-haspopup="dialog"`.

#### Props (`DialogTriggerProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactElement` | Yes | -- | Single React element to clone. Receives injected `ref`, `onClick`, and `aria-haspopup` |
| asChild | `boolean` | No | -- | Declared in the type but not currently used in the implementation |

### Dialog.Overlay

Renders a `<div>` with `position: fixed; inset: 0` when open. Returns `null` when closed.

#### Props (`DialogOverlayProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | No | -- | Optional content inside the overlay |
| className | `string` | No | -- | Passed through to the div element |
| style | `React.CSSProperties` | No | -- | Merged with the base fixed-position style |

Additional props are spread onto the `<div>` element via rest props.

### Dialog.Content

Renders a `<div>` with `role="dialog"` when open. Returns `null` when closed. Uses `useFocusTrap` to trap focus within the content.

#### Props (`DialogContentProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Dialog body content |
| className | `string` | No | -- | Passed through to the div element |
| style | `React.CSSProperties` | No | -- | Passed through to the div element |
| onEscapeKeyDown | `() => void` | No | -- | Called when Escape is pressed, before the dialog closes |

Additional props are spread onto the `<div>` element via rest props.

### Dialog.Title

Renders an `<h2>` element with `id` auto-linked to Content's `aria-labelledby`.

#### Props (`DialogTitleProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Title text content |
| className | `string` | No | -- | Passed through to the h2 element |

Additional props are spread onto the `<h2>` element via rest props.

### Dialog.Description

Renders a `<p>` element with `id` auto-linked to Content's `aria-describedby`.

#### Props (`DialogDescriptionProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Description text content |
| className | `string` | No | -- | Passed through to the p element |

Additional props are spread onto the `<p>` element via rest props.

### Dialog.Close

Renders no wrapper element. Clones its single child element, injecting `onClick` that closes the dialog.

#### Props (`DialogCloseProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactElement` | Yes | -- | Single React element to clone. Receives injected `onClick` |

---

## 2. Behavioral Guarantees

- Supports controlled mode (via `open` prop) and uncontrolled mode (via `defaultOpen` prop) using `useControllableState`.
- `Dialog.Trigger` opens the dialog by calling `onOpenChange(true)`. It also stores a `triggerRef` for focus restoration.
- `Dialog.Overlay` clicking anywhere on the overlay closes the dialog via `onOpenChange(false)`.
- `Dialog.Content` registers a document-level `keydown` listener for Escape that calls `onEscapeKeyDown` (if provided) then `onOpenChange(false)`.
- Focus is trapped inside `Dialog.Content` using `useFocusTrap`: Tab and Shift+Tab cycle between focusable elements within the content container.
- When the dialog opens, focus is automatically moved to the first focusable element inside Content.
- When the dialog closes, focus is restored to the trigger element via `triggerRef.current.focus()`.
- `Dialog.Content` and `Dialog.Overlay` return `null` when `open` is `false`; they are not rendered to the DOM when closed.
- IDs for `contentId`, `titleId`, and `descriptionId` are auto-generated via `React.useId()` and linked across Content, Title, and Description.
- `onOpenChange` is called for every state change regardless of controlled/uncontrolled mode.
- This component will never fetch data, manage global state, or contain business logic.

---

## 3. Accessibility Guarantees

### Keyboard support
- **Escape**: Closes the dialog (document-level listener active only when open).
- **Tab / Shift+Tab**: Focus is trapped within Content; cycles between first and last focusable elements.

### Screen reader support
- Content renders as `<div role="dialog" aria-modal>`.
- `aria-labelledby` on Content points to the auto-generated Title `id`.
- `aria-describedby` on Content points to the auto-generated Description `id`.
- Trigger injects `aria-haspopup="dialog"` onto its child element.
- Overlay has `aria-hidden` set.

### Focus management
- Auto-focuses first focusable element inside Content when dialog opens.
- Restores focus to the trigger element when dialog closes.

### Data attributes
- `data-state`: `'open'` | `'closed'` on Overlay (only rendered when open, so always `'open'`).
- `data-state`: `'open'` on Content (only rendered when open).

---

## 4. Styling Guarantees

- Headless component: renders plain HTML (`<div>`, `<h2>`, `<p>`). Trigger and Close render no wrapper -- they clone children.
- Overlay has minimal base style: `position: fixed; inset: 0`. Consumer's `style` prop is merged on top.
- No design tokens, no theme dependency.
- Consumers style via `className`, `style`, rest props, or `data-state` attribute selectors.
- No responsive behavior built in; layout and positioning are the consumer's responsibility.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing any prop from any sub-component's props interface.
- Changing `onOpenChange` callback signature.
- Changing the rendered element types (e.g., Content's `<div>`, Title's `<h2>`, Description's `<p>`).
- Changing `role="dialog"` or `aria-modal` on Content.
- Removing or changing the auto-linked `aria-labelledby` / `aria-describedby` behavior.
- Removing focus trap behavior from Content.
- Removing focus restoration to trigger on close.
- Removing Escape key close behavior.
- Removing overlay click-to-close behavior.
- Changing Trigger's clone-element pattern (injecting `ref`, `onClick`, `aria-haspopup`).
- Changing Close's clone-element pattern (injecting `onClick`).
- Changing `data-state` value semantics or attribute names.
- Changing the context error message or removing the context boundary check.
