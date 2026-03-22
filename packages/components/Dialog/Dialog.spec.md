<!-- spec-version: 2 -->

# Dialog Specification

## Component Name
Dialog

---

## Purpose
A modal overlay that captures user attention for a focused task, confirmation, or information display. Blocks interaction with the rest of the UI until dismissed.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints
- All styling via `styled()` — no inline styles
- Zero hardcoded colors; tokens only
- Uses `useDisclosure` from `@vlting/headless` for open/close state
- Uses `useFocusScope` from `@vlting/headless` for focus trapping
- Portal rendering via `Portal` primitive

---

## Component API

### Dialog.Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Callback on state change |

### Dialog.Trigger
Renders as `<button>`. Toggles dialog open on click.

### Dialog.Content
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Max-width variant |

### Dialog.Header
Layout container for Title and Description.

### Dialog.Title
Renders as `<h2>`. Provides `aria-labelledby` target.

### Dialog.Description
Renders as `<p>`. Provides `aria-describedby` target.

### Dialog.Footer
Layout container for action buttons.

### Dialog.Close
Renders as `<button>`. Closes dialog on click. Has `aria-label="Close dialog"`.

### Dialog.Overlay
Standalone overlay (also auto-rendered by Content).

---

## Composition Model
`Dialog.Root` > (`Dialog.Trigger` + `Dialog.Content`)

Content contains: `Dialog.Header`, `Dialog.Title`, `Dialog.Description`, `Dialog.Footer`, `Dialog.Close`, and arbitrary content.

Two-layer architecture:
- `DialogContent` (outer): conditional render gate based on `isOpen`
- `DialogContentInner` (inner): mounts only when open, owns focus scope and keyboard listeners

---

## Layout Rules
- Overlay: fixed inset, `bg: '$overlayBackground'`, `zIndex: '50'`
- Content wrapper: fixed inset, flex center, `p: '$16'`
- Content panel: `bg: '$surface1'`, `radius: '$6'`, `boxShadow: '$lg'`, `p: '$24'`, `maxHeight: '85vh'`, overflow auto
- Header: flex column, `gap: '$4'`, `pb: '$16'`
- Title: `fontSize: '$heading4'`, `fontWeight: '$600'`, `fontFamily: '$heading'`
- Description: `fontSize: '$p'`, `color: '$neutral9'`
- Footer: flex row, `gap: '$8'`, `pt: '$16'`, `justifyContent: 'flex-end'`
- Close: positioned absolute top-right of Content (`top: '$12'`, `right: '$12'`)

---

## Variants
| Variant | Values | Description |
|---------|--------|-------------|
| `size` | `sm` (400px), `md` (500px), `lg` (640px) | Max-width of content panel |

---

## Size Options
- `sm`: maxWidth 400px
- `md`: maxWidth 500px (default)
- `lg`: maxWidth 640px

---

## States
| State | Attribute | Values |
|-------|-----------|--------|
| Open/Closed | `data-state` | `"open"` (on Overlay, Content) |

---

## Interaction Model
- Click Trigger opens dialog
- Click Overlay closes dialog
- Click Close button closes dialog
- Escape key closes dialog (document-level listener)
- Tab/Shift+Tab cycles focus within dialog (focus trap)

---

## Accessibility
- Content: `role="dialog"`, `aria-modal="true"`
- `aria-labelledby` links Content to Title via auto-generated ID
- `aria-describedby` links Content to Description via auto-generated ID
- Close button: `aria-label="Close dialog"`
- Focus trapped within dialog when open
- Focus restored to previously focused element on close
- First focusable element auto-focused on open

---

## Platform Implementation Notes

### React (Web)
- `useDisclosure` hook manages controlled/uncontrolled open state
- `useFocusScope` hook provides focus trapping, auto-focus, and focus restoration
- Content renders via Portal to `document.body`
- Inner component pattern ensures hooks mount/unmount with dialog visibility
- Document-level keydown listener handles Escape and Tab focus trapping
- `mergeRefs` utility merges consumer ref with focus scope ref

### React Native
Stub only. Not yet implemented.

---

## Theming Behavior
- Overlay: `$overlayBackground` token
- Content: `$surface1` background, `$lg` shadow
- Title: `$heading` font family
- Description: `$neutral9` text color
- Close hover: `$neutralAlpha2` background
- All values resolve per theme (light/dark)

---

## Edge Cases
- Content not in DOM when closed (conditional render, not hidden)
- Compound components throw if used outside `Dialog.Root`
- Multiple dialogs: last opened gets document-level Escape listener
- Close button renders default X icon SVG if no children provided

---

## Stories / Preview Cases
- Default (md size)
- Small dialog
- Large dialog
- With Header, Title, Description, Footer
- Controlled open state
- With Close button

---

## Test Requirements
- Renders without crashing
- Size variants render correctly
- Content hidden when closed
- Content visible when open
- Click trigger opens dialog
- `onOpenChange` callback fires
- `role="dialog"` on content
- `aria-modal="true"` on content
- `aria-labelledby` links to title
- `aria-describedby` links to description
- Close button has `aria-label`
- Escape closes dialog
- Focus moves into dialog on open
- Tab focus trap (last to first)
- Shift+Tab focus trap (first to last)

---

## Implementation Constraints
- All logic via `useDisclosure` + `useFocusScope` hooks
- `forwardRef` on all sub-components
- Transition properties gated by `lowMotion: { transitionDuration: '0.01s' }`
- Ref merging via `mergeRefs` utility

---

## Open Questions
None.

---

## Change Log
- v1: Initial implementation with useDisclosure, useFocusScope, compound pattern, size variants, Portal rendering
