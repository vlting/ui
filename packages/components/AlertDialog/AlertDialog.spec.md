<!-- spec-version: 2 -->

# AlertDialog Specification

## Component Name
AlertDialog

---

## Purpose
Modal dialog for confirming destructive or irreversible actions. Requires explicit user acknowledgment via Cancel or Action buttons — no click-outside dismissal.

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

### AlertDialog.Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Callback on state change |

### AlertDialog.Trigger
Renders as `<button>`. Opens dialog on click.

### AlertDialog.Content
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Max-width variant |

### AlertDialog.Title
Renders as `<h2>`. Required for screen readers. Provides `aria-labelledby` target.

### AlertDialog.Description
Renders as `<p>`. Required for screen readers. Provides `aria-describedby` target.

### AlertDialog.Footer
Layout container for Cancel and Action buttons.

### AlertDialog.Cancel
Wrapper (`display: contents`) that closes dialog on click. Wraps a child button.

### AlertDialog.Action
Wrapper (`display: contents`) that closes dialog on click. Wraps a child button for destructive action.

### AlertDialog.Overlay
Standalone overlay (also auto-rendered by Content). No click-to-close.

---

## Composition Model
`AlertDialog.Root` > (`AlertDialog.Trigger` + `AlertDialog.Content`)

Content contains: `AlertDialog.Title`, `AlertDialog.Description`, `AlertDialog.Footer` > (`AlertDialog.Cancel` + `AlertDialog.Action`)

Two-layer architecture:
- `AlertDialogContent` (outer): conditional render gate based on `isOpen`
- `AlertDialogContentInner` (inner): mounts only when open, owns focus scope and keyboard listeners

---

## Layout Rules
- Overlay: fixed inset, `bg: '$overlayBackground'`, `zIndex: '50'`
- Content wrapper: fixed inset, flex center, `p: '$16'`
- Content panel: `bg: '$surface1'`, `radius: '$6'`, `boxShadow: '$lg'`, `p: '$24'`, `maxHeight: '85vh'`, overflow auto
- Title: `fontSize: '$heading4'`, `fontWeight: '$600'`, `fontFamily: '$heading'`
- Description: `fontSize: '$p'`, `color: '$neutral9'`
- Footer: flex row, `gap: '$8'`, `pt: '$16'`, `justifyContent: 'flex-end'`
- Cancel/Action: `display: contents` (invisible wrapper, non-focusable)

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
- Click Cancel closes dialog
- Click Action closes dialog
- Escape key closes dialog (document-level listener)
- Tab/Shift+Tab cycles focus within dialog (focus trap)
- **No click-outside-to-close** (must use Cancel or Action)

---

## Accessibility
- Content: `role="alertdialog"`, `aria-modal="true"`
- `aria-labelledby` links Content to Title via auto-generated ID
- `aria-describedby` links Content to Description via auto-generated ID
- Title and Description required for screen readers
- Focus trapped within dialog when open
- Focus restored to previously focused element on close
- First focusable element auto-focused on open
- No Close button — user must choose Cancel or Action

---

## Platform Implementation Notes

### React (Web)
- `useDisclosure` hook manages controlled/uncontrolled open state
- `useFocusScope` hook provides focus trapping, auto-focus, and focus restoration
- Content renders via Portal to `document.body`
- Inner component pattern ensures hooks mount/unmount with dialog visibility
- Document-level keydown listener handles Escape and Tab focus trapping
- Cancel/Action use `display: contents` to be layout-transparent and non-focusable wrappers
- `mergeRefs` utility merges consumer ref with focus scope ref

### React Native
Not yet implemented.

---

## Theming Behavior
- Overlay: `$overlayBackground` token
- Content: `$surface1` background, `$lg` shadow
- Title: `$heading` font family
- Description: `$neutral9` text color
- All values resolve per theme (light/dark)

---

## Edge Cases
- Content not in DOM when closed (conditional render, not hidden)
- Compound components throw if used outside `AlertDialog.Root`
- Cancel/Action are `display: contents` wrappers — child buttons own focus and styling
- Overlay does not close on click (unlike Dialog)

---

## Stories / Preview Cases
- Delete confirmation
- Unsaved changes warning
- Controlled open state
- With custom Cancel and Action buttons

---

## Test Requirements
- Renders without crashing
- Content hidden when closed
- Content visible when open
- Click trigger opens dialog
- Click Cancel closes dialog
- Click Action closes dialog
- `role="alertdialog"` on content
- `aria-modal="true"` on content
- `aria-labelledby` links to title
- `aria-describedby` links to description
- Escape closes dialog
- Tab focus trap works

---

## Implementation Constraints
- All logic via `useDisclosure` + `useFocusScope` hooks
- `forwardRef` on all sub-components
- Transition properties gated by `lowMotion: { transitionDuration: '0.01s' }`
- Ref merging via `mergeRefs` utility
- Extends Dialog pattern but with `role="alertdialog"` and no overlay click-to-close

---

## Open Questions
None.

---

## Change Log
- v1: Initial implementation with useDisclosure, useFocusScope, compound pattern, Cancel/Action wrappers
