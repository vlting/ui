# Component Spec — ResizablePanel

## 1. Purpose

Provides a panel whose size (width or height) can be adjusted by the user via a draggable divider handle. Used in editor-style layouts, split views, and workspaces where users need to control the proportion of space given to two adjacent regions.

Use when: users benefit from persistent, manual control over how much screen space each panel receives.

Do NOT use when: fixed-ratio layouts are sufficient, or when the interface targets only small-screen mobile contexts where drag handles are not practical.

---

## 2. UX Intent

- Primary interaction goal: let users customize their workspace by resizing panel regions to match their workflow.
- Expected user mental model: a window splitter — drag the boundary between two panels to redistribute space.
- UX laws applied:
  - Fitts's Law: the drag handle must be wide/tall enough to be easily grabbed on both mouse and touch input.
  - Tesler's Law: the complexity of tracking drag position and clamping to min/max bounds is absorbed by the component.
  - Jakob's Law: resize handles follow the convention of a visible divider line or grab bar between panels.

---

## 3. Visual Behavior

- Renders as a resizable container with a visible divider/handle on the edge being resized (leading, trailing, top, or bottom).
- The handle is a narrow, visually distinct strip using a border or surface token; it may display a grip icon or dots.
- Minimum and maximum size constraints (min/max width or height) are defined via size tokens or explicit prop values.
- The panel respects its containing layout — it does not overflow its parent.
- On resize, the panel's size updates fluidly; adjacent panels or content reflow accordingly.
- The resize handle has a distinct hover/active visual state using a primary or interactive color token.
- Responsive: on viewports below a minimum breakpoint, the resize handle may be hidden and the panel set to a fixed size.

---

## 4. Interaction Behavior

- Controlled pattern: current size may be driven by a `size` prop with an `onSizeChange` callback. An uncontrolled `defaultSize` is also supported.
- Drag interaction: pointer-down on the handle begins a drag session; pointer-move updates the size; pointer-up ends the session.
- Touch drag is supported (touch events / pointer events).
- Keyboard behavior:
  - The drag handle is focusable (Tab-reachable) with `role="separator"` and `aria-orientation`.
  - Arrow keys (in the axis of the panel) resize the panel by a defined step increment.
  - Shift + Arrow keys resize by a larger step increment.
  - Home/End keys snap the panel to its minimum or maximum size.
- Screen reader behavior: the handle announces its current size as a value (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`) and its orientation.
- Motion: smooth resize during drag; no transition animation. When the panel snaps to min/max, an instant clip is used. Reduced motion has no additional requirement (drag is already synchronous).

---

## 5. Accessibility Requirements

- The drag handle carries `role="separator"` with `aria-orientation` ("horizontal" or "vertical").
- `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` reflect the current panel size in percentage or pixel units.
- `aria-label` or `aria-labelledby` identifies what is being resized (e.g., "Resize sidebar").
- Handle must be keyboard operable via arrow keys as described above.
- Focus indicator on the handle must meet WCAG AA contrast requirements.
- Do not remove the handle from the tab order when it is not at a boundary — allow keyboard users to continue adjusting.

---

## 6. Theming Rules

- Required tokens: surface/background token for the panel, border color token for the divider handle, primary/interactive color token for handle hover/active state, space token for handle thickness, size tokens for min/max constraints.
- Prohibited: no hardcoded pixel sizes for handle width, no hardcoded hex colors.
- Dark mode: all handle and panel tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- ResizablePanel is placed adjacent to another panel or content region within a SplitView or similar layout primitive.
- It accepts any child content; it does not dictate the internal layout of its children.
- Multiple ResizablePanel components may be composed in sequence to create multi-panel layouts.
- Anti-patterns:
  - Do not use ResizablePanel for layouts that should be responsive (use CSS grid/flex breakpoints instead).
  - Do not nest ResizablePanel inside itself without clear size constraints to prevent layout thrashing.
  - Do not place the resize handle outside the ResizablePanel's own boundary.

---

## 8. Performance Constraints

- Drag events must not trigger heavy re-renders of the panel's children. Size state should be tracked at the boundary level, not propagated down.
- Use pointer/touch event listeners with passive mode where possible to avoid blocking the main thread.
- Children of the panel should be stable and not remount on resize.
- No virtualization applicable to the panel shell itself; consumers with large lists inside must add their own.

---

## 9. Test Requirements

- Renders with the correct initial size (controlled and uncontrolled).
- Drag handle is present and focusable.
- Simulated drag increases/decreases panel size within min/max bounds.
- Panel size does not exceed `maxSize` or fall below `minSize` during drag.
- Arrow key on focused handle changes size by the step increment.
- Shift + Arrow key changes size by the large step increment.
- Home key snaps panel to minimum size; End key snaps to maximum size.
- `onSizeChange` fires with the updated size value.
- ARIA attributes (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`) are correct and updated on resize.
- Renders correctly in light and dark themes.
