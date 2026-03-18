> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Resizable

## 1. Purpose

- Provides resizable panel layouts with drag handles between panels.
- Use for split-pane interfaces (code editors, sidebars, comparison views).
- Do NOT use for single-dimension resize (use CSS `resize` property). Do NOT use for window resizing.

---

## 2. UX Intent

- **Primary interaction goal:** Adjust the relative size of adjacent panels by dragging a handle.
- **Expected user mental model:** A divider between panels that can be dragged to resize them.
- **UX laws applied:**
  - **Fitts's Law** — handle has a visible grip area; hover state increases perceived target.
  - **Tesler's Law** — panel registration, constraint enforcement, and percentage math handled internally.

---

## 3. Anatomy

- **Resizable.PanelGroup** — Container that manages panel registration and layout direction.
- **Resizable.Panel** — Individual resizable panel with size constraints.
- **Resizable.Handle** — Draggable separator between panels.

> **TypeScript is the source of truth for props.** See the exported types in `Resizable.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — Panels at their current sizes; handle shows subtle visual separator.
- **Hover** (handle) — Handle background changes to indicate draggability; cursor changes to `col-resize` or `row-resize`.
- **Dragging** — Handle actively being dragged; panels resize in real time. Document-level `mousemove`/`mouseup` listeners track drag.
- **Collapsed** — Panel at `minSize` (when `collapsible` is true).

### Keyboard Interaction

- Handle has `role="separator"` with `aria-orientation`.
- Currently mouse-drag only; keyboard resize (Arrow keys on focused handle) is not yet implemented.

### Motion

- No animations; resize is immediate during drag.

---

## 5. Accessibility

- **Semantic element:** Handle renders `role="separator"` with `aria-orientation`.
- **ARIA attributes:** `aria-orientation` on handle (horizontal or vertical based on group direction).
- **Focus management:** Handle is focusable (part of tab order).
- **Screen reader announcements:** Separator role communicated; orientation announced.
- **Known gap:** Keyboard-based resizing (Arrow keys on focused separator) is not yet implemented.

---

## 6. Styling

- **Design tokens used:** Handle uses `$borderColor` background; hover state uses `$color` with opacity. `withHandle` option adds a centered grip dot indicator. Panel uses flex-basis for percentage sizing.
- **Responsive behavior:** `direction` prop controls horizontal vs vertical split.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Any layout requiring split panels.
- **What this component can contain:** PanelGroup contains alternating Panel and Handle children. Panels accept arbitrary content.
- **Anti-patterns:** Do not nest PanelGroups deeply (max 2 levels recommended). Panels must always be separated by Handles.

---

## 8. Breaking Change Criteria

- Removing any sub-component (PanelGroup, Panel, Handle).
- Removing `direction`, `defaultSize`, `minSize`, `maxSize`, or `collapsible` props.
- Changing the `role="separator"` on Handle.
- Changing the percentage-based sizing model.
- Removing the `onLayout` callback.

---

## 9. Test Requirements

- **Behavioral tests:** Panels resize proportionally on handle drag; `minSize`/`maxSize` constraints enforced; `onLayout` fires with updated sizes; `collapsible` collapses panel at minimum.
- **Accessibility tests:** `role="separator"` on handle; `aria-orientation` matches direction; handle is focusable.
- **Visual regression:** Horizontal split, vertical split, with handle grip, collapsed panel.
