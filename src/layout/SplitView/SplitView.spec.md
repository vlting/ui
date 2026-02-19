# Component Spec — SplitView

## 1. Purpose

Provides a two-panel horizontal (or vertical) layout where both panels are visible simultaneously. Typically used to display a list or navigation on one side and detail content on the other, enabling master-detail workflows.

Use when: users benefit from seeing two related content areas side by side without toggling between them (e.g., email client, file explorer, document editor with preview).

Do NOT use when: screens are small and both panels cannot comfortably fit, or when the two areas are truly independent and do not share context.

---

## 2. UX Intent

- Primary interaction goal: allow users to interact with a primary list or navigation while viewing the detail of a selected item without losing context.
- Expected user mental model: a classic master-detail layout — left panel drives the right panel's content.
- UX laws applied:
  - Gestalt (proximity/common region): the two panels share a bounded container, communicating that they are related.
  - Jakob's Law: master-detail is a universal pattern found in email, file managers, and settings apps.
  - Fitts's Law: the divider handle between panels must be wide enough to grab precisely.

---

## 3. Visual Behavior

- Renders as a full-width (or full-height) container with two child panels arranged in a row (or column).
- A visible divider separates the two panels; its width/height uses a border or size token.
- Default panel size ratio is configurable (e.g., 30/70 or 50/50) via tokens or props.
- Panel sizes adapt proportionally when the container is resized.
- On small breakpoints, the split collapses to a single-panel view — only one panel is visible at a time, controlled by navigation state.
- Optional: divider is draggable — see ResizablePanel spec for drag handle behavior.
- Background of each panel uses a surface token; the divider uses a border color token.

---

## 4. Interaction Behavior

- Primarily presentational — the split ratio can be static or resizable.
- If resizable, the divider handle behavior follows the ResizablePanel spec.
- On small breakpoints in single-panel mode, a back button or navigation gesture reveals the primary panel; this state is controlled by a prop (`activePanel`) with an `onPanelChange` callback.
- Keyboard behavior: Tab traverses focusable elements across both panels in document order; no special key handling at the SplitView level beyond what the divider handle provides.
- Screen reader behavior: each panel is a distinct landmark region (main, complementary, or navigation) or carries `aria-label`.
- Motion: panel transition on mobile (sliding between panels) respects `prefers-reduced-motion`; animation is suppressed when preferred.

---

## 5. Accessibility Requirements

- Each panel should have a meaningful landmark role or `aria-label` so screen reader users understand the purpose of each region.
- If a draggable divider is present, it meets the ResizablePanel accessibility requirements.
- In single-panel mode, the hidden panel must be removed from the accessibility tree (`aria-hidden="true"` or not rendered) so screen readers do not traverse invisible content.
- Focus must not be trapped inside either panel.
- Color contrast of any panel borders or background differentiation must meet WCAG AA.

---

## 6. Theming Rules

- Required tokens: surface/background tokens for each panel (may differ), border color token for the divider, space tokens for optional panel padding, size tokens for minimum panel widths/heights.
- Prohibited: no hardcoded colors, pixel widths for panel defaults, or raw gap values.
- Dark mode: panel backgrounds, divider color, and any shadow tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- SplitView accepts exactly two primary child regions (primary panel and detail panel); each is a slot.
- Either panel may contain any layout content — lists, forms, maps, detail cards.
- SplitView may be composed inside a page layout alongside a TopNav and Sidebar.
- Anti-patterns:
  - Do not nest SplitView inside SplitView without clear size constraints.
  - Do not use SplitView for panels that are entirely independent — if they share no context, use separate pages.
  - Do not hide the panel divider if panels are resizable — the affordance must remain visible.

---

## 8. Performance Constraints

- Both panels render in the DOM simultaneously on large viewports — avoid placing heavy/lazy content in the detail panel that blocks the primary panel.
- In single-panel mode, the hidden panel should not render its children until it becomes active.
- Panel content should not re-render when only the divider position changes.
- No virtualization applicable to the SplitView shell; child lists must manage their own virtualization.

---

## 9. Test Requirements

- Renders both panels in a horizontal row by default.
- Applies the correct default size ratio to each panel.
- Divider is visible between panels.
- On small breakpoints, only one panel is visible at a time.
- `onPanelChange` fires when toggling between panels in single-panel mode.
- Hidden panel is not in the accessibility tree in single-panel mode.
- Each panel has an appropriate landmark role or `aria-label`.
- Resizable divider behavior (if enabled) follows the ResizablePanel test requirements.
- Renders correctly in light and dark themes.
