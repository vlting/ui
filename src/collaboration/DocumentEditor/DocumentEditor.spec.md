# Component Spec — DocumentEditor

## 1. Purpose

Provides the visual shell and layout container for a collaborative document editing surface. It frames the editable content area, handles layout concerns such as gutters, margins, and scroll behavior, and serves as the host for collaborative overlays (cursors, selections, comment anchors).

Use when: A surface is needed to host rich text or structured document content that may be edited collaboratively.

Do NOT use when: The content is read-only without any editing intent (use a document viewer component), or when the editing surface is a simple single-line input field.

---

## 2. UX Intent

- Primary interaction goal: Provide a focused, distraction-free environment for reading and editing document content collaboratively.
- Expected user mental model: A familiar word-processor or rich-text editor canvas — a white (or themed) page with comfortable margins and a clear reading width, similar to Notion, Google Docs, or Confluence.
- UX laws applied:
  - Jakob's Law: The document editor surface should match the conventional word-processor layout users already know.
  - Tesler's Law: The complexity of document editing must not be added to the container component — the shell must remain as simple as possible, delegating editing behavior to its children.
  - Doherty Threshold: The layout frame must render immediately; do not block rendering on data loading.

---

## 3. Visual Behavior

- Layout: Centered column layout with a constrained maximum reading width. Vertical scroll enabled. Top and bottom padding provides breathing room above and below the content.
- Spacing: Content area has generous horizontal padding using spacing tokens to create comfortable document margins. Gutter areas on left and right may host annotation anchors or line numbers.
- Typography: The container does not set body typography directly; it provides a typographic context that child content inherits from theme tokens.
- Token usage: Background (page surface), outer background (canvas/mat behind page), border/shadow for page elevation effect — all from theme tokens.
- Responsive behavior: On narrow viewports, margins collapse to a minimal padding to maximize readable width. The page surface fills the viewport width on mobile.

---

## 4. Interaction Behavior

- States:
  - Idle / editing: Content area is interactive and accepts input from child editing components.
  - Read-only: Content is visible but the editing surface does not accept input. Visual cues distinguish the read-only state.
  - Loading: A skeleton or placeholder is shown in place of content while the document loads.
  - Collaborative: Peer cursors and selections are visible via the `SharedCursorOverlay` child component.
- Controlled vs uncontrolled: The editor shell is a controlled container. The parent manages document content state and passes it to child components.
- Keyboard behavior: The document surface itself does not intercept keyboard events — it delegates to its editable child content. The surrounding chrome (toolbar, sidebar toggles) must be keyboard navigable.
- Screen reader behavior: The editable content area should be announced as a document or text editing region. Non-content chrome elements (toolbars, overlays) must have appropriate ARIA roles.
- Motion rules: Cursor and selection overlays animate smoothly. Reduced motion: overlays appear instantly with no position interpolation.

---

## 5. Accessibility Requirements

- ARIA requirements: The editable content area must have an appropriate role (e.g., `role="textbox"` with `aria-multiline="true"`, or rely on native contenteditable semantics). The overall page region should be a `main` landmark or be contained within one.
- Focus rules: On mount, focus should be placed on the editable area if the document is in editing mode. Focus must not be trapped in the shell container itself.
- Contrast expectations: Document surface background and text must meet WCAG AA. Page-behind-canvas contrast must be visually distinguishable.
- Reduced motion behavior: All transition animations for overlays and layout shifts are suppressed.

---

## 6. Theming Rules

- Required tokens: document surface background, outer canvas background, page shadow/elevation, content max-width size token, horizontal padding spacing token, vertical padding spacing token, border radius token for page corners (if elevated style is used).
- Prohibited hardcoded values: No hardcoded pixel dimensions, colors, or shadows.
- Dark mode expectations: The outer canvas darkens to a deep neutral. The document surface uses a dark surface token. Text inherits the dark theme text token.

---

## 7. Composition Rules

- What can wrap it: Should be placed inside a page-level layout or split-panel container. May have a toolbar above and a comment sidebar to the side.
- What it may contain: The editable content region (rich text engine child), a `SharedCursorOverlay`, comment anchor markers in the gutter. Optionally a word count or status bar below.
- Anti-patterns:
  - Do not embed rich text engine logic (ProseMirror, Slate, etc.) directly in this component — it is a layout shell only.
  - Do not hardcode a fixed height; the editor should expand to fill available vertical space.
  - Do not place navigation or application-level controls inside the document surface area.

---

## 8. Performance Constraints

- Memoization rules: The shell frame should be stable and not re-render on every keystroke inside the child editor. Only layout-affecting prop changes should trigger re-renders.
- Virtualization: Long documents may require virtualized line rendering inside child components. The shell must not prevent virtualized children from functioning correctly.
- Render boundaries: The document shell must not own document content state. It is a presentation container only.

---

## 9. Test Requirements

- What must be tested:
  - Renders the document surface with correct layout structure.
  - Applies read-only visual state correctly.
  - Renders a loading state placeholder.
  - Maximum width constraint is applied to the content column.
- Interaction cases:
  - Keyboard navigation of chrome elements (toolbars, sidebar toggles) does not interfere with the editable area.
  - Tab order is logical: toolbar → editor area → sidebar.
- Accessibility checks:
  - Appropriate ARIA role on the editable region.
  - Focus is placed correctly on mount in editing mode.
  - Reduced motion: overlay animations suppressed.
  - Contrast between canvas background and document surface is sufficient.
