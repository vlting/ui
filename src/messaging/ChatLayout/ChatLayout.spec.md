# Component Spec — ChatLayout

## 1. Purpose

Provides the top-level structural layout shell for a messaging interface, composing a sidebar panel (conversation list), a main thread area, and a message input zone into a responsive two- or three-column layout.

Use when: building a full messaging view that requires a persistent sidebar, a scrollable thread, and a composer input in a single cohesive layout.

Do NOT use when: embedding a single conversation thread without a sidebar (use `ChatThread` directly) or showing only a conversation list (use `ChatSidebar` directly).

---

## 2. UX Intent

- Primary interaction goal: provide a familiar, stable layout frame so users can navigate conversations, read messages, and compose replies without spatial disorientation.
- Expected user mental model: a two-panel messaging app layout — conversation list on the left, thread and input on the right — consistent with Slack, WhatsApp Web, and similar applications.
- UX laws applied:
  - **Jakob's Law** — two-panel chat layout matches the dominant convention for web messaging applications.
  - **Gestalt (Figure/Ground, Proximity)** — sidebar and thread areas are spatially separated; the input is anchored at the bottom of the thread area.
  - **Fitts's Law** — the message input is anchored to the bottom of the screen, minimizing travel from reading to composing.

---

## 3. Visual Behavior

- Layout: composed via `ChatLayout.Sidebar`, `ChatLayout.Thread`, and `ChatLayout.Input` slots within the `ChatLayout` root.
- Sidebar: fixed or scrollable width panel on the leading edge (left in LTR, right in RTL); contains the conversation list.
- Thread: fills remaining horizontal space; vertically scrollable; messages render top to bottom.
- Input: anchored to the bottom of the thread column; does not scroll.
- Spacing: sidebar width and gutter sizes reference size and space tokens; no hardcoded pixel widths.
- Token usage: sidebar background, thread background, divider border, and input area background reference theme tokens only.
- Responsive behavior: on narrow viewports the sidebar collapses to a drawer or bottom sheet; the thread takes full width; a back-navigation gesture or button returns to the sidebar.

---

## 4. Interaction Behavior

- States:
  - **sidebar visible**: two-panel layout; sidebar shows conversation list.
  - **sidebar collapsed** (mobile): full-width thread is shown; sidebar accessible via navigation gesture or button.
  - **loading**: skeleton placeholders fill sidebar and thread.
  - **empty thread**: empty state message shown in the thread area.
- The layout shell is not directly interactive; its children manage interactions.
- Controlled: sidebar open/closed state on mobile is controlled externally.
- Keyboard behavior: `Tab` moves through focusable elements across sidebar and thread in document order; sidebar and thread are navigated as separate landmark regions.
- Screen reader behavior: sidebar, thread, and input are each announced as distinct `<nav>`, `<main>`, and `<form>` (or equivalent ARIA) regions.
- Motion rules: sidebar collapse/expand transition respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: sidebar uses `role="navigation"` or `aria-label="Conversations"`; thread uses `role="main"` or `aria-label="Message thread"`; input uses `role="region"` or `aria-label="Compose message"`.
- Landmark regions allow screen reader users to jump between areas efficiently.
- Focus: when the sidebar collapses on mobile, focus moves to the thread; when it opens, focus moves to the sidebar.
- Contrast: divider borders and background token pairings meet WCAG 2.1 AA.
- Reduced motion: disable sidebar slide animation; use instant show/hide.

---

## 6. Theming Rules

- Required tokens: `background` (thread), `backgroundSecondary` (sidebar), `borderColor` (divider), `space` (gutter).
- Sidebar width is a size token, not a hardcoded pixel value.
- Prohibited hardcoded values: no literal color strings, pixel widths, or transition durations.
- Dark mode: sidebar and thread backgrounds must maintain visual separation in dark themes.

---

## 7. Composition Rules

- Composed using `ChatLayout`, `ChatLayout.Sidebar`, `ChatLayout.Thread`, and `ChatLayout.Input`.
- Children of each slot are `ChatSidebar`, `ChatThread`, and `MessageInput` respectively (or consumer-defined content).
- Anti-patterns:
  - Do not implement conversation routing or message fetching inside this component.
  - Do not hardcode sidebar widths or breakpoints as literal values.
  - Do not nest another `ChatLayout` inside this component.

---

## 8. Performance Constraints

- The layout shell must not re-render when only thread message content changes.
- Sidebar and thread areas should be independent render boundaries where possible.
- No internal data fetching or subscriptions.

---

## 9. Test Requirements

- Renders sidebar, thread, and input slots with provided children.
- Sidebar collapses to a hidden state on narrow viewports.
- Sidebar open/close state is controlled externally; toggling fires the appropriate callback.
- Focus moves to the thread when the sidebar closes, and to the sidebar when it opens (mobile).
- Landmark regions are correctly announced by screen readers.
- No hardcoded color, spacing, or pixel width values appear in rendered output.
- Passes axe accessibility audit in expanded and collapsed sidebar states.
