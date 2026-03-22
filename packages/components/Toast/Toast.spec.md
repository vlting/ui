<!-- spec-version: 2 -->

# Toast Specification

## Component Name
Toast + Toaster

---

## Purpose

Provides transient, non-blocking notifications. Two parts:
- **Toast** — compound component for a single notification (Root, Title, Description, Action, Close)
- **Toaster** — portal-rendered container that manages positioning and renders queued toasts
- **toast()** — imperative API for adding/dismissing toasts from anywhere

Constraints:
- Must align with the existing design system.
- Must use existing theme tokens.
- Must not introduce arbitrary spacing, colors, typography, or radii.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints

All values from design tokens. Theme accent colors use flavor names:
- success: `$grass9`
- error: `$tomato9`
- warning: `$amber9`
- info: `$iris9`

No required token additions.

---

## Component API

See TypeScript source for canonical types. Key exports:

```
Toast.Root    — container, accepts `theme` variant
Toast.Title   — heading
Toast.Description — body text
Toast.Action  — action button slot
Toast.Close   — dismiss button (default X icon)
Toaster       — portal viewport, accepts `position` prop
toast()       — imperative: toast('msg') or toast({ title, description, ... })
toast.success / .error / .warning / .info — variant shortcuts
toast.dismiss(id) — remove by ID
toast.promise(promise, { loading, success, error }) — async flow
```

Defaults:
```
theme: 'neutral'
duration: 5000
position: 'bottom-right'
```

---

## Composition Model

```tsx
{/* Declarative */}
<Toast.Root theme="success">
  <Toast.Title>Saved</Toast.Title>
  <Toast.Description>Changes saved.</Toast.Description>
  <Toast.Action onClick={undo}>Undo</Toast.Action>
  <Toast.Close />
</Toast.Root>

{/* Imperative — place Toaster once in app */}
<Toaster position="bottom-right" />
toast.success('Done!')
```

---

## Layout Rules

- Root: flex row, `gap: $12`, `p: $16`, `maxWidth: 420px`, `width: 100%`
- Surface: `bg: $surface1`, `radius: $4`, `boxShadow: $lg`, `border: $neutralMin`
- Theme accent: 4px solid left border with flavor color
- Toaster: fixed position, `zIndex: 100`, flex column, `gap: $8`
- Toast items stack vertically within the Toaster

---

## Variants

```
theme:
  - neutral (default, no accent border)
  - success (left border: $grass9)
  - error (left border: $tomato9)
  - warning (left border: $amber9)
  - info (left border: $iris9)
```

---

## Size Options

Single size. No size variants.

---

## States

```
states:
  - default (visible, auto-dismiss timer running)
  - hovered (auto-dismiss timer paused)
  - dismissed (removed from queue)
```

---

## Interaction Model

- Close button dismisses immediately
- Action button fires callback, does not auto-dismiss
- Hover pauses auto-dismiss timer; mouseleave resumes
- Auto-dismiss after `duration` ms (default 5000)

---

## Accessibility

- Toast.Root: `role="status"`
- Toaster viewport: `aria-live="polite"`, `aria-label="Notifications"`
- Close button: `aria-label="Dismiss"`
- Screen reader announcements via aria-live region

---

## Platform Implementation Notes

### React (Web)

- Toaster renders via Portal to document.body
- Auto-dismiss uses setTimeout with pause/resume on hover
- Store uses useSyncExternalStore for React 18+ concurrent safety

### React Native

Not yet implemented.

---

## Theming Behavior

- Consumes: `$surface1`, `$neutral9`, `$neutralMin`, `$grass9`, `$tomato9`, `$amber9`, `$iris9`
- Typography: `$body`, `$p`, `$small`, `$600`, `$500`
- Spacing: `$0`, `$2`, `$4`, `$8`, `$12`, `$16`
- Elevation: `$lg` box shadow
- Supports theme switching via StlProvider

---

## Edge Cases

- Multiple simultaneous toasts stack vertically
- Very long title/description: text wraps within maxWidth
- Rapid add/dismiss: store is synchronous, no race conditions
- Zero duration: toast persists until manually dismissed
- Component unmount: timers cleaned up

---

## Stories / Preview Cases

```
Toast / Themes (neutral, success, error, warning, info)
Toast / With action button
Toast / Imperative API triggers
Toast / Position variants
Toast / Auto-dismiss
```

---

## Test Requirements

- Renders title and description
- Theme variants render correctly
- Close button fires callback
- Action button fires callback
- role="status" on root
- toast() adds to queue
- toast.success/.error/.warning/.info set variant
- toast.dismiss removes
- Multiple toasts stack
- Toaster renders in portal
- Empty queue renders nothing
- Auto-dismiss after duration
- aria-live on viewport

---

## Implementation Constraints

- All styling via styled() — no inline styles
- STL shorthands only (bg, p, px, radius, etc.)
- Zero hardcoded colors — tokens only
- Flavor names (tomato/amber/grass/iris), never CSS color names
- forwardRef on sub-components

---

## Change Log

```
v1: Initial implementation — compound Toast + imperative Toaster
```
